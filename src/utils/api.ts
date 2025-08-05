// API 호출 관리 및 Rate Limiting
import { config } from './config'

// 캐시 설정
const CACHE_DURATION = 5 * 60 * 1000 // 5분
const cache = new Map<string, { data: any; timestamp: number }>()

// Rate Limiting 설정
const CLIENT_RATE_LIMIT = {
  maxRequests: 30, // 1분당 최대 요청 수
  windowMs: 60 * 1000, // 1분
  cooldownMs: 30 * 1000, // 30초 쿨다운
}

// 요청 기록
const requestHistory = new Map<string, number[]>()

// Rate Limiting 검증
const checkClientRateLimit = (endpoint: string): boolean => {
  const now = Date.now()
  const windowStart = now - CLIENT_RATE_LIMIT.windowMs

  // 요청 기록 가져오기
  const requests = requestHistory.get(endpoint) || []

  // 윈도우 시간 밖의 요청 제거
  const validRequests = requests.filter(timestamp => timestamp > windowStart)

  // 요청 수 확인
  if (validRequests.length >= CLIENT_RATE_LIMIT.maxRequests) {
    return false
  }

  // 새 요청 추가
  validRequests.push(now)
  requestHistory.set(endpoint, validRequests)

  return true
}

// 캐시 검증
const getCachedData = (key: string): any | null => {
  const cached = cache.get(key)
  if (!cached) return null

  const now = Date.now()
  if (now - cached.timestamp > CACHE_DURATION) {
    cache.delete(key)
    return null
  }

  return cached.data
}

// 캐시 저장
const setCachedData = (key: string, data: any): void => {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  })
}

// 안전한 API 호출
export const safeApiCall = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  // Rate Limiting 검증
  if (!checkClientRateLimit(endpoint)) {
    throw new Error(
      'Rate limit exceeded. Please wait before making another request.'
    )
  }

  // 캐시 확인
  const cachedData = getCachedData(endpoint)
  if (cachedData) {
    return cachedData
  }

  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    // Rate Limit 헤더 확인
    const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining')
    const rateLimitReset = response.headers.get('X-RateLimit-Reset')

    if (rateLimitRemaining === '0') {
      const resetTime = parseInt(rateLimitReset || '0')
      const waitTime = Math.max(0, resetTime - Date.now())

      if (waitTime > 0) {
        throw new Error(
          `Rate limit exceeded. Please wait ${Math.ceil(waitTime / 1000)} seconds.`
        )
      }
    }

    if (!response.ok) {
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After')
        throw new Error(
          `Rate limit exceeded. Please try again in ${retryAfter || 60} seconds.`
        )
      }

      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()

    // 성공적인 응답만 캐시
    setCachedData(endpoint, data)

    return data
  } catch (error) {
    console.error('API call failed:', error)
    throw error
  }
}

// 게시글 목록 가져오기 (캐싱 적용)
export const getBoardPosts = async (): Promise<any[]> => {
  return safeApiCall('/.netlify/functions/get-board-posts')
}

// 특정 게시글 가져오기
export const getBoardPost = async (slug: string): Promise<any> => {
  const posts = await getBoardPosts()
  return posts.find((post: any) => post.slug === slug) || null
}

// 검색 기능 (클라이언트 사이드)
export const searchPosts = async (
  query: string,
  searchBy: string = 'title'
): Promise<any[]> => {
  const posts = await getBoardPosts()

  if (!query.trim()) return posts

  const searchTerm = query.toLowerCase()
  return posts.filter((post: any) => {
    const field = post[searchBy] || ''
    return field.toLowerCase().includes(searchTerm)
  })
}

// 캐시 무효화
export const invalidateCache = (pattern?: string): void => {
  if (pattern) {
    // 패턴에 맞는 캐시만 삭제
    for (const key of cache.keys()) {
      if (key.includes(pattern)) {
        cache.delete(key)
      }
    }
  } else {
    // 모든 캐시 삭제
    cache.clear()
  }
}

// Rate Limiting 상태 확인
export const getRateLimitStatus = (
  endpoint: string
): {
  remaining: number
  resetTime: number
  isBlocked: boolean
} => {
  const requests = requestHistory.get(endpoint) || []
  const now = Date.now()
  const windowStart = now - CLIENT_RATE_LIMIT.windowMs

  const validRequests = requests.filter(timestamp => timestamp > windowStart)
  const remaining = Math.max(
    0,
    CLIENT_RATE_LIMIT.maxRequests - validRequests.length
  )
  const resetTime = now + CLIENT_RATE_LIMIT.windowMs

  return {
    remaining,
    resetTime,
    isBlocked: remaining === 0,
  }
}
