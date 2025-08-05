// 관리자 페이지 및 보안 설정
import { validateSecureSession, getSessionInfo } from './secure-auth'

export const config = {
  // 관리자 페이지 경로 (환경 변수에서 가져오거나 기본값 사용)
  adminPath:
    import.meta.env.VITE_ADMIN_PATH ||
    'cms/8f7d9e2a1b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',

  // GitHub OAuth 설정
  githubClientId: import.meta.env.VITE_GITHUB_CLIENT_ID,
  githubClientSecret: import.meta.env.VITE_GITHUB_CLIENT_SECRET,

  // API 설정
  apiUrl: import.meta.env.VITE_API_URL || '/.netlify/functions',

  // 보안 설정
  maxLoginAttempts: parseInt(import.meta.env.VITE_MAX_LOGIN_ATTEMPTS || '5'),
  sessionTimeout: parseInt(import.meta.env.VITE_SESSION_TIMEOUT || '3600000'), // 1시간

  // 허용된 도메인
  allowedOrigins: import.meta.env.VITE_ALLOWED_ORIGINS?.split(',') || [
    'localhost:5173',
    'your-domain.com',
  ],
}

// 관리자 페이지 접근 권한 확인 (안전한 쿠키 기반)
export const checkAdminAccess = (): boolean => {
  // 안전한 세션 검증
  return validateSecureSession()
}

// 로그인 시도 횟수 관리 (localStorage 대신 쿠키 사용)
export const getLoginAttempts = (): number => {
  const attempts = localStorage.getItem('login_attempts')
  return attempts ? parseInt(attempts) : 0
}

export const incrementLoginAttempts = (): void => {
  const attempts = getLoginAttempts() + 1
  localStorage.setItem('login_attempts', attempts.toString())

  // 최대 시도 횟수 초과 시 일정 시간 동안 차단
  if (attempts >= config.maxLoginAttempts) {
    const blockUntil = Date.now() + 15 * 60 * 1000 // 15분
    localStorage.setItem('block_until', blockUntil.toString())
  }
}

export const resetLoginAttempts = (): void => {
  localStorage.removeItem('login_attempts')
  localStorage.removeItem('block_until')
}

export const isLoginBlocked = (): boolean => {
  const blockUntil = localStorage.getItem('block_until')
  if (!blockUntil) return false

  return Date.now() < parseInt(blockUntil)
}

// 세션 정보 가져오기
export const getCurrentSession = () => {
  return getSessionInfo()
}

// 관리자 권한 확인
export const isAdmin = (): boolean => {
  const session = getCurrentSession()
  if (!session || !session.isValid) {
    return false
  }

  // 사용자 데이터에서 관리자 권한 확인
  const userData = session.userData
  return userData && userData.role === 'admin'
}
