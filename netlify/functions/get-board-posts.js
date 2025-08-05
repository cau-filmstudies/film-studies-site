const matter = require('gray-matter')

// Rate Limiting 설정
const RATE_LIMIT = {
  maxRequests: 100, // 1분당 최대 요청 수
  windowMs: 60 * 1000, // 1분
  blockDuration: 15 * 60 * 1000, // 15분 차단
}

// 메모리 기반 Rate Limiting (실제 운영에서는 Redis 등 사용 권장)
const rateLimitStore = new Map()

// IP 주소 추출
const getClientIP = event => {
  return (
    event.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    event.headers['x-real-ip'] ||
    event.headers['x-client-ip'] ||
    event.headers['cf-connecting-ip'] ||
    event.headers['x-forwarded'] ||
    event.headers['forwarded-for'] ||
    event.headers['forwarded'] ||
    'unknown'
  )
}

// Rate Limiting 검증
const checkRateLimit = clientIP => {
  const now = Date.now()
  const windowStart = now - RATE_LIMIT.windowMs

  // 기존 요청 기록 가져오기
  const requests = rateLimitStore.get(clientIP) || []

  // 윈도우 시간 밖의 요청 제거
  const validRequests = requests.filter(timestamp => timestamp > windowStart)

  // 차단 상태 확인
  const blockedUntil = rateLimitStore.get(`${clientIP}_blocked`)
  if (blockedUntil && now < blockedUntil) {
    return { allowed: false, remaining: 0, resetTime: blockedUntil }
  }

  // 요청 수 확인
  if (validRequests.length >= RATE_LIMIT.maxRequests) {
    // 차단 설정
    const blockUntil = now + RATE_LIMIT.blockDuration
    rateLimitStore.set(`${clientIP}_blocked`, blockUntil)

    return { allowed: false, remaining: 0, resetTime: blockUntil }
  }

  // 새 요청 추가
  validRequests.push(now)
  rateLimitStore.set(clientIP, validRequests)

  return {
    allowed: true,
    remaining: RATE_LIMIT.maxRequests - validRequests.length,
    resetTime: now + RATE_LIMIT.windowMs,
  }
}

// 보안 헤더 설정
const setSecurityHeaders = headers => {
  return {
    ...headers,
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  }
}

exports.handler = async (event, context) => {
  const clientIP = getClientIP(event)

  // Rate Limiting 검증
  const rateLimit = checkRateLimit(clientIP)

  if (!rateLimit.allowed) {
    return {
      statusCode: 429, // Too Many Requests
      headers: setSecurityHeaders({
        'Content-Type': 'application/json',
        'X-RateLimit-Limit': RATE_LIMIT.maxRequests.toString(),
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        'X-RateLimit-Reset': rateLimit.resetTime.toString(),
        'Retry-After': Math.ceil(RATE_LIMIT.blockDuration / 1000).toString(),
      }),
      body: JSON.stringify({
        error: 'Too many requests',
        message: 'Rate limit exceeded. Please try again later.',
        retryAfter: Math.ceil(RATE_LIMIT.blockDuration / 1000),
      }),
    }
  }

  // CORS 헤더 설정
  const headers = setSecurityHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'X-RateLimit-Limit': RATE_LIMIT.maxRequests.toString(),
    'X-RateLimit-Remaining': rateLimit.remaining.toString(),
    'X-RateLimit-Reset': rateLimit.resetTime.toString(),
  })

  try {
    // GitHub API를 통해 파일 목록을 가져옴
    const response = await fetch(
      'https://api.github.com/repos/cau-filmstudies/film-studies-site/contents/content/board'
    )

    if (!response.ok) {
      throw new Error('Failed to fetch file list')
    }

    const files = await response.json()

    // .md와 .mdx 파일만 필터링
    const markdownFiles = files.filter(
      file => file.name.endsWith('.md') || file.name.endsWith('.mdx')
    )

    // 각 파일의 내용을 가져와서 파싱
    const posts = await Promise.all(
      markdownFiles.map(async file => {
        try {
          const contentResponse = await fetch(file.download_url)
          if (!contentResponse.ok) {
            throw new Error(`Failed to fetch ${file.name}`)
          }

          const content = await contentResponse.text()
          const { data, content: bodyContent } = matter(content)

          const slug = file.name.replace(/\.(md|mdx)$/, '')

          return {
            title: data.title || '',
            date: data.date || '',
            author: data.author || '',
            thumbnail: data.thumbnail || '',
            images: data.images || [],
            body: bodyContent,
            slug,
          }
        } catch (error) {
          console.error(`Error loading ${file.name}:`, error)
          return null
        }
      })
    )

    // null 값 제거하고 날짜순으로 정렬
    const validPosts = posts.filter(post => post !== null)
    const sortedPosts = validPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(sortedPosts),
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      statusCode: 500,
      headers: setSecurityHeaders({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ error: 'Failed to load posts' }),
    }
  }
}
