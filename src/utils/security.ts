// 관리자 페이지 보안 유틸리티
import { config } from './config'

// IP 화이트리스트 (실제 운영에서는 서버 사이드에서 처리)
const ALLOWED_IPS = [
  '127.0.0.1',
  '::1',
  // 실제 운영 환경의 허용 IP 추가
]

// 관리자 페이지 접근 로그
export const logAdminAccess = (action: string, details?: any) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    action,
    userAgent: navigator.userAgent,
    url: window.location.href,
    details,
  }

  console.warn('Admin Access Log:', logEntry)
  // 실제 운영에서는 보안 로깅 서비스로 전송
}

// 관리자 페이지 URL 생성 (매번 다른 URL 생성)
export const generateAdminURL = (): string => {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2)
  return `${config.adminPath}-${timestamp}-${random}`
}

// 세션 관리
export const createAdminSession = (token: string) => {
  const expiry = Date.now() + config.sessionTimeout
  localStorage.setItem('github_token', token)
  localStorage.setItem('token_expiry', expiry.toString())
  localStorage.setItem('session_created', Date.now().toString())

  logAdminAccess('session_created')
}

export const clearAdminSession = () => {
  localStorage.removeItem('github_token')
  localStorage.removeItem('token_expiry')
  localStorage.removeItem('session_created')

  logAdminAccess('session_cleared')
}

// 관리자 페이지 접근 시도 감지
export const detectAdminAccessAttempt = (url: string) => {
  const adminPatterns = [
    '/admin',
    '/cms',
    '/manage',
    '/dashboard',
    '/panel',
    '/control',
  ]

  const isAdminAttempt = adminPatterns.some(pattern =>
    url.toLowerCase().includes(pattern)
  )

  if (isAdminAttempt) {
    logAdminAccess('unauthorized_access_attempt', { url })
  }

  return isAdminAttempt
}

// 관리자 페이지 접근 제한 시간 설정
export const setAccessRestriction = (minutes: number = 15) => {
  const restrictionUntil = Date.now() + minutes * 60 * 1000
  localStorage.setItem('access_restriction', restrictionUntil.toString())
}

export const isAccessRestricted = (): boolean => {
  const restrictionUntil = localStorage.getItem('access_restriction')
  if (!restrictionUntil) return false

  const isRestricted = Date.now() < parseInt(restrictionUntil)

  if (!isRestricted) {
    localStorage.removeItem('access_restriction')
  }

  return isRestricted
}

// 관리자 페이지 접근 권한 검증 강화
export const validateAdminAccess = (): boolean => {
  // 기본 접근 권한 확인
  const hasValidToken = localStorage.getItem('github_token') !== null
  const hasValidExpiry = localStorage.getItem('token_expiry') !== null

  if (!hasValidToken || !hasValidExpiry) {
    return false
  }

  // 토큰 만료 확인
  const expiry = parseInt(localStorage.getItem('token_expiry') || '0')
  if (Date.now() > expiry) {
    clearAdminSession()
    return false
  }

  // 접근 제한 확인
  if (isAccessRestricted()) {
    return false
  }

  // 세션 시간 확인 (최대 1시간)
  const sessionCreated = parseInt(
    localStorage.getItem('session_created') || '0'
  )
  if (Date.now() - sessionCreated > config.sessionTimeout) {
    clearAdminSession()
    return false
  }

  return true
}
