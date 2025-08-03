import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLocale } from '../../contexts/LocaleContext'

interface BoardPost {
  title: string
  date: string
  author?: string
  body: string
  slug: string
}

const CommunityBoard = () => {
  const { t } = useLocale()
  const [posts, setPosts] = useState<BoardPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 실제 구현에서는 API나 파일 시스템에서 포스트를 로드합니다
    // 여기서는 샘플 데이터를 사용합니다
    const samplePosts: BoardPost[] = [
      {
        title: '영화학과 웹사이트에 오신 것을 환영합니다',
        date: '2025-08-02',
        author: '영화학과 관리자',
        body: '안녕하세요! 중앙대학교 영화학과 웹사이트에 오신 것을 환영합니다...',
        slug: '20250802-welcome',
      },
    ]

    setPosts(samplePosts)
    setLoading(false)
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
        <title>게시판 - 중앙대학교 영화학과</title>
        <meta name="description" content="중앙대학교 영화학과 게시판입니다." />
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
              게시판
            </h1>

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

                  <div className="prose prose-lg max-w-none">
                    <p>{post.body}</p>
                  </div>

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
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default CommunityBoard
