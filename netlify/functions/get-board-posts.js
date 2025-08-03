const matter = require('gray-matter')

exports.handler = async (event, context) => {
  // CORS 헤더 설정
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  }

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
      headers,
      body: JSON.stringify({ error: 'Failed to load posts' }),
    }
  }
}
