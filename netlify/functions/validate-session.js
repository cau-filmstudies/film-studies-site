// 서버 사이드 세션 검증
const cryptoModule = require('crypto')

// 세션 저장소 (실제 운영에서는 Redis 등 사용)
const sessionStore = new Map()

// 보안 설정
const SECURITY_CONFIG = {
  sessionSecret: process.env.SESSION_SECRET || 'your-secret-key-change-this',
  sessionTimeout: 3600000, // 1시간
  maxSessionsPerUser: 3,
}

// 세션 생성
const createSession = (userId, userData) => {
  const sessionId = cryptoModule.randomBytes(32).toString('hex')
  const csrfToken = cryptoModule.randomBytes(32).toString('hex')

  const session = {
    sessionId,
    csrfToken,
    userId,
    userData,
    createdAt: Date.now(),
    expiresAt: Date.now() + SECURITY_CONFIG.sessionTimeout,
    lastActivity: Date.now(),
  }

  // 세션 저장
  sessionStore.set(sessionId, session)

  // 사용자별 세션 수 제한
  const userSessions = Array.from(sessionStore.values()).filter(
    s => s.userId === userId
  )

  if (userSessions.length > SECURITY_CONFIG.maxSessionsPerUser) {
    // 가장 오래된 세션 삭제
    const oldestSession = userSessions.sort(
      (a, b) => a.createdAt - b.createdAt
    )[0]
    sessionStore.delete(oldestSession.sessionId)
  }

  return session
}

// 세션 검증
const validateSession = (sessionId, csrfToken) => {
  const session = sessionStore.get(sessionId)

  if (!session) {
    return { valid: false, reason: 'Session not found' }
  }

  // 세션 만료 확인
  if (Date.now() > session.expiresAt) {
    sessionStore.delete(sessionId)
    return { valid: false, reason: 'Session expired' }
  }

  // CSRF 토큰 확인
  if (session.csrfToken !== csrfToken) {
    return { valid: false, reason: 'Invalid CSRF token' }
  }

  // 마지막 활동 시간 업데이트
  session.lastActivity = Date.now()

  return { valid: true, session }
}

// 세션 삭제
const deleteSession = sessionId => {
  sessionStore.delete(sessionId)
}

// 정기적인 만료 세션 정리
const cleanupExpiredSessions = () => {
  const now = Date.now()
  for (const [sessionId, session] of sessionStore.entries()) {
    if (now > session.expiresAt) {
      sessionStore.delete(sessionId)
    }
  }
}

// 5분마다 만료 세션 정리
setInterval(cleanupExpiredSessions, 5 * 60 * 1000)

exports.handler = async (event, context) => {
  // CORS 헤더 설정
  const headers = {
    'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-Token',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE',
    'Access-Control-Allow-Credentials': 'true',
  }

  // OPTIONS 요청 처리 (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    }
  }

  try {
    const { action, sessionId, csrfToken, userData } = JSON.parse(
      event.body || '{}'
    )

    switch (action) {
      case 'create': {
        if (!userData || !userData.userId) {
          return {
            statusCode: 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'User data required' }),
          }
        }

        const session = createSession(userData.userId, userData)

        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: session.sessionId,
            csrfToken: session.csrfToken,
            expiresAt: session.expiresAt,
          }),
        }
      }

      case 'validate': {
        if (!sessionId || !csrfToken) {
          return {
            statusCode: 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              error: 'Session ID and CSRF token required',
            }),
          }
        }

        const validation = validateSession(sessionId, csrfToken)

        if (validation.valid) {
          return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              valid: true,
              userData: validation.session.userData,
              expiresAt: validation.session.expiresAt,
            }),
          }
        } else {
          return {
            statusCode: 401,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              valid: false,
              reason: validation.reason,
            }),
          }
        }
      }

      case 'delete': {
        if (!sessionId) {
          return {
            statusCode: 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Session ID required' }),
          }
        }

        deleteSession(sessionId)

        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ success: true }),
        }
      }

      default:
        return {
          statusCode: 400,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Invalid action' }),
        }
    }
  } catch (error) {
    console.error('Session validation error:', error)

    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal server error' }),
    }
  }
}
