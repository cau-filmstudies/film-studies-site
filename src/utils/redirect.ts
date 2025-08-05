// 안전한 리다이렉트 유틸리티
import { config } from './config'

// 허용된 내부 경로 목록
const ALLOWED_INTERNAL_PATHS = [
  '/',
  '/about/major',
  '/about/history',
  '/about/international',
  '/about/faculty',
  '/about/campus',
  '/about/alumni',
  '/education/goals',
  '/education/curriculum',
  '/education/schedule',
  '/admissions/guide',
  '/community/faq',
  '/community/board',
  '/faculty',
]

// 허용된 외부 도메인 목록
const ALLOWED_EXTERNAL_DOMAINS = [
  'www.cau.ac.kr',
  'admission.cau.ac.kr',
  'portal.cau.ac.kr',
  'www.youtube.com',
]

// 내부 경로 검증
export const validateInternalPath = (path: string): boolean => {
  try {
    // 절대 경로인지 확인
    if (!path.startsWith('/')) {
      return false
    }

    // 허용된 경로인지 확인
    return ALLOWED_INTERNAL_PATHS.some(
      allowedPath => path === allowedPath || path.startsWith(allowedPath + '/')
    )
  } catch {
    return false
  }
}

// 외부 URL 검증
export const validateExternalURL = (url: string): boolean => {
  try {
    const urlObj = new URL(url)

    // HTTPS 프로토콜 확인
    if (urlObj.protocol !== 'https:') {
      return false
    }

    // 허용된 도메인인지 확인
    return ALLOWED_EXTERNAL_DOMAINS.includes(urlObj.hostname)
  } catch {
    return false
  }
}

// 안전한 내부 리다이렉트
export const safeInternalRedirect = (path: string): string | null => {
  if (validateInternalPath(path)) {
    return path
  }

  console.warn('Invalid internal redirect path:', path)
  return null
}

// 안전한 외부 리다이렉트
export const safeExternalRedirect = (url: string): string | null => {
  if (validateExternalURL(url)) {
    return url
  }

  console.warn('Invalid external redirect URL:', url)
  return null
}

// URL 파라미터에서 안전한 리다이렉트 추출
export const extractSafeRedirect = (
  searchParams: URLSearchParams,
  paramName: string = 'redirect'
): string | null => {
  const redirectUrl = searchParams.get(paramName)

  if (!redirectUrl) {
    return null
  }

  // 내부 경로인지 확인
  if (redirectUrl.startsWith('/')) {
    return safeInternalRedirect(redirectUrl)
  }

  // 외부 URL인지 확인
  return safeExternalRedirect(redirectUrl)
}

// 리다이렉트 로깅
export const logRedirect = (
  from: string,
  to: string,
  type: 'internal' | 'external'
) => {
  console.warn('Redirect Log:', {
    timestamp: new Date().toISOString(),
    from,
    to,
    type,
    userAgent: navigator.userAgent,
  })
}
