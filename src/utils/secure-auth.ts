// 안전한 인증 시스템
import { config } from './config'

// 쿠키 설정
const COOKIE_CONFIG = {
  httpOnly: true, // XSS 방지
  secure: true, // HTTPS에서만 전송
  sameSite: 'strict' as const, // CSRF 방지
  maxAge: 3600000, // 1시간
  path: '/',
}

// 쿠키 이름 (예측하기 어려운 이름)
const COOKIE_NAMES = {
  sessionId: 'sess_' + Math.random().toString(36).substring(2),
  csrfToken: 'csrf_' + Math.random().toString(36).substring(2),
  userHash: 'user_' + Math.random().toString(36).substring(2),
}

// 안전한 쿠키 설정
export const setSecureCookie = (
  name: string,
  value: string,
  options: any = {}
) => {
  const cookieOptions = {
    ...COOKIE_CONFIG,
    ...options,
  }

  let cookieString = `${name}=${encodeURIComponent(value)}`

  if (cookieOptions.httpOnly) {
    cookieString += '; HttpOnly'
  }

  if (cookieOptions.secure) {
    cookieString += '; Secure'
  }

  if (cookieOptions.sameSite) {
    cookieString += `; SameSite=${cookieOptions.sameSite}`
  }

  if (cookieOptions.maxAge) {
    cookieString += `; Max-Age=${cookieOptions.maxAge}`
  }

  if (cookieOptions.path) {
    cookieString += `; Path=${cookieOptions.path}`
  }

  document.cookie = cookieString
}

// 쿠키 읽기
export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=')
    if (cookieName === name) {
      return decodeURIComponent(cookieValue)
    }
  }
  return null
}

// 쿠키 삭제
export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
}

// CSRF 토큰 생성
export const generateCSRFToken = (): string => {
  const token =
    Math.random().toString(36).substring(2) +
    Date.now().toString(36) +
    Math.random().toString(36).substring(2)
  return token
}

// 사용자 세션 생성
export const createSecureSession = (userData: any) => {
  const sessionId = generateCSRFToken()
  const csrfToken = generateCSRFToken()
  const userHash = btoa(JSON.stringify(userData)) // Base64 인코딩

  // 세션 데이터를 서버에 저장 (실제 구현에서는 서버 사이드에서 처리)
  const sessionData = {
    sessionId,
    csrfToken,
    userHash,
    createdAt: Date.now(),
    expiresAt: Date.now() + config.sessionTimeout,
  }

  // 안전한 쿠키 설정
  setSecureCookie(COOKIE_NAMES.sessionId, sessionId)
  setSecureCookie(COOKIE_NAMES.csrfToken, csrfToken)
  setSecureCookie(COOKIE_NAMES.userHash, userHash)

  // 세션 데이터를 서버에 전송 (실제 구현에서는 API 호출)
  console.log('Session created:', sessionData)

  return sessionData
}

// 세션 검증
export const validateSecureSession = (): boolean => {
  const sessionId = getCookie(COOKIE_NAMES.sessionId)
  const csrfToken = getCookie(COOKIE_NAMES.csrfToken)
  const userHash = getCookie(COOKIE_NAMES.userHash)

  if (!sessionId || !csrfToken || !userHash) {
    return false
  }

  try {
    // 사용자 데이터 복호화
    const userData = JSON.parse(atob(userHash))

    // 세션 만료 확인
    if (userData.expiresAt && Date.now() > userData.expiresAt) {
      clearSecureSession()
      return false
    }

    // 서버 사이드 세션 검증 (실제 구현에서는 API 호출)
    return true
  } catch (error) {
    console.error('Session validation failed:', error)
    clearSecureSession()
    return false
  }
}

// 세션 삭제
export const clearSecureSession = () => {
  deleteCookie(COOKIE_NAMES.sessionId)
  deleteCookie(COOKIE_NAMES.csrfToken)
  deleteCookie(COOKIE_NAMES.userHash)
}

// CSRF 토큰 검증
export const validateCSRFToken = (token: string): boolean => {
  const storedToken = getCookie(COOKIE_NAMES.csrfToken)
  return storedToken === token
}

// 안전한 API 호출 (CSRF 토큰 포함)
export const secureApiCall = async (url: string, options: RequestInit = {}) => {
  const csrfToken = getCookie(COOKIE_NAMES.csrfToken)

  if (!csrfToken) {
    throw new Error('CSRF token not found')
  }

  const secureOptions = {
    ...options,
    headers: {
      ...options.headers,
      'X-CSRF-Token': csrfToken,
      'Content-Type': 'application/json',
    },
  }

  return fetch(url, secureOptions)
}

// 세션 정보 가져오기
export const getSessionInfo = () => {
  const sessionId = getCookie(COOKIE_NAMES.sessionId)
  const userHash = getCookie(COOKIE_NAMES.userHash)

  if (!sessionId || !userHash) {
    return null
  }

  try {
    const userData = JSON.parse(atob(userHash))
    return {
      sessionId,
      userData,
      isValid: validateSecureSession(),
    }
  } catch (error) {
    return null
  }
}
