import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLocale } from '../../contexts/LocaleContext'
import matter from 'gray-matter'

interface BoardPost {
  title: string
  date: string
  author?: string
  thumbnail?: string
  images?: Array<{ image: string }>
  body: string
  slug: string
}

const CommunityBoard = () => {
  const { t } = useLocale()
  const [posts, setPosts] = useState<BoardPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        // GitHub Raw URL을 통해 직접 파일들을 로드
        const boardFiles = [
          {
            name: '20250802-welcome.mdx',
            url: 'https://raw.githubusercontent.com/cau-filmstudies/film-studies-site/main/content/board/20250802-welcome.mdx',
            slug: '20250802-welcome',
          },
          {
            name: '20250803-test.md',
            url: 'https://raw.githubusercontent.com/cau-filmstudies/film-studies-site/main/content/board/20250803-test.md',
            slug: '20250803-test',
          },
        ]

        // 각 파일의 내용을 가져와서 파싱
        const loadedPosts = await Promise.all(
          boardFiles.map(async file => {
            try {
              const response = await fetch(file.url)
              if (!response.ok) {
                throw new Error(`Failed to fetch ${file.name}`)
              }
              const content = await response.text()
              const { data, content: bodyContent } = matter(content)

              return {
                title: data.title || '',
                date: data.date || '',
                author: data.author || '',
                thumbnail: data.thumbnail || '',
                images: data.images || [],
                body: bodyContent,
                slug: file.slug,
              }
            } catch (error) {
              console.error(`Error loading ${file.name}:`, error)
              return null
            }
          })
        )

        // null 값 제거하고 날짜순으로 정렬
        const validPosts = loadedPosts.filter(
          post => post !== null
        ) as BoardPost[]
        const sortedPosts = validPosts.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )

        setPosts(sortedPosts)
      } catch (error) {
        console.error('Error loading board posts:', error)
        // API 실패 시 기본 데이터 사용
        setPosts([
          {
            title: '영화학과 웹사이트에 오신 것을 환영합니다',
            date: '2025-08-02',
            author: '영화학과 관리자',
            body: '안녕하세요! 중앙대학교 영화학과 웹사이트에 오신 것을 환영합니다...',
            slug: '20250802-welcome',
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  if (loading) {
    return (
      <div className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted">로딩 중...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>공지사항 & 게시판 - 중앙대학교 영화학과</title>
        <meta
          name="description"
          content="중앙대학교 영화학과 공지사항과 게시판입니다."
        />
      </Helmet>

      <div className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-8 text-center">
              공지사항 & 게시판
            </h1>

            <div className="mb-8 text-center">
              <p className="text-lg text-muted">
                학과의 주요 소식과 공지사항을 확인하세요.
              </p>
            </div>

            <div className="space-y-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow"
                >
                  <header className="mb-6">
                    <h2 className="font-serif text-2xl font-bold text-primary mb-2">
                      {post.title}
                    </h2>
                    <div className="flex items-center text-sm text-muted space-x-4">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('ko-KR')}
                      </time>
                      {post.author && <span>작성자: {post.author}</span>}
                    </div>
                  </header>

                  {/* 썸네일 이미지 */}
                  {post.thumbnail && (
                    <div className="mb-6">
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <div className="prose prose-lg max-w-none">
                    <div className="line-clamp-3">
                      {post.body.length > 200
                        ? `${post.body.substring(0, 200)}...`
                        : post.body}
                    </div>
                  </div>

                  {/* 첨부 이미지들 */}
                  {post.images && post.images.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-muted mb-3">
                        첨부 이미지
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {post.images.map((img, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={img.image}
                            alt={`첨부 이미지 ${imgIndex + 1}`}
                            className="w-full h-24 object-cover rounded"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <footer className="mt-6 pt-6 border-t border-gray-200">
                    <a
                      href={`/board/${post.slug}`}
                      className="text-primary hover:text-primary-dark font-medium"
                    >
                      자세히 보기 →
                    </a>
                  </footer>
                </motion.article>
              ))}
            </div>

            {posts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted">아직 게시된 글이 없습니다.</p>
                <p className="text-sm text-muted mt-2">
                  관리자가 새 글을 작성하면 여기에 표시됩니다.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default CommunityBoard
