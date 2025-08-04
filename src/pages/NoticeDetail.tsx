import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import ReactMarkdown from 'react-markdown'
import { Notice } from '../types/notice'

const NoticeDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const [notice, setNotice] = useState<Notice | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadNotice = async () => {
      try {
        // GitHub Gateway API를 통해 특정 게시글 가져오기
        const response = await fetch('/.netlify/functions/get-board-posts')
        if (!response.ok) {
          throw new Error('Failed to fetch notices')
        }
        const data = await response.json()
        
        // slug로 게시글 찾기
        const foundNotice = data.find((post: any) => post.slug === slug)
        
        if (foundNotice) {
          setNotice({
            id: '1',
            title: foundNotice.title || '',
            date: foundNotice.date || '',
            author: foundNotice.author || '',
            pinned: false,
            body: foundNotice.body || '',
            slug: foundNotice.slug || '',
            views: 0,
            images: foundNotice.images || []
          })
        }
      } catch (error) {
        console.error('Error loading notice:', error)
        // API 실패 시 기본 데이터 사용
        const defaultNotices = [
          {
            id: '1',
            title: '영화학과 웹사이트에 오신 것을 환영합니다',
            date: '2025-01-15T09:00:00.000Z',
            author: '영화학과 관리자',
            views: 0,
            pinned: true,
            body: '안녕하세요! 중앙대학교 공연영상창작학부 영화전공 웹사이트에 오신 것을 환영합니다...',
            slug: '20250115-welcome-notice'
          },
          {
            id: '2',
            title: '2025학년도 1학기 커리큘럼 업데이트 안내',
            date: '2025-01-10T14:30:00.000Z',
            author: '학과장',
            views: 0,
            pinned: false,
            body: '2025학년도 1학기 커리큘럼이 업데이트되었습니다...',
            slug: '20250110-curriculum-update'
          },
          {
            id: '3',
            title: '졸업작품 제출 일정 안내',
            date: '2025-01-08T11:00:00.000Z',
            author: '학과장',
            views: 0,
            pinned: true,
            body: '졸업작품 제출 일정이 확정되었습니다...',
            slug: '20250108-graduation-works'
          }
        ]
        
        const foundNotice = defaultNotices.find(n => n.slug === slug)
        setNotice(foundNotice || null)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      loadNotice()
    }
  }, [slug])

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

  if (!notice) {
    return (
      <div className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">게시글을 찾을 수 없습니다</h1>
            <p className="text-muted mb-8">요청하신 게시글이 존재하지 않거나 삭제되었습니다.</p>
            <Link
              to="/community/board"
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200"
            >
              목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{notice.title} - 중앙대학교 공연영상창작학부 영화전공</title>
        <meta
          name="description"
          content={notice.body.substring(0, 160)}
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
            {/* Back to List */}
            <div className="mb-8">
              <Link
                to="/community/board"
                className="inline-flex items-center text-primary hover:text-primary-dark transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                목록으로 돌아가기
              </Link>
            </div>

            {/* Notice Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                {notice.pinned && (
                  <span className="inline-block w-16 h-6 bg-gray-500 text-white text-xs rounded-sm flex items-center justify-center">
                    NOTICE
                  </span>
                )}
                <h1 className="text-3xl md:text-4xl font-bold text-primary">
                  {notice.title}
                </h1>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-muted border-b border-gray-200 pb-4">
                <span>작성자: {notice.author}</span>
                <span>작성일: {new Date(notice.date).toLocaleDateString('ko-KR')}</span>
              </div>
            </div>

            {/* Notice Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-800 leading-relaxed">
                <ReactMarkdown 
                  components={{
                    h1: ({ children }) => <h1 className="text-3xl font-bold text-primary mb-4">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-2xl font-bold text-primary mb-3">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-xl font-bold text-primary mb-2">{children}</h3>,
                    p: ({ children }) => <p className="mb-4">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc list-inside mb-4">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside mb-4">{children}</ol>,
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                    em: ({ children }) => <em className="italic">{children}</em>,
                    blockquote: ({ children }) => <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600 mb-4">{children}</blockquote>,
                    code: ({ children }) => <code className="bg-gray-100 px-2 py-1 rounded text-sm">{children}</code>,
                    pre: ({ children }) => <pre className="bg-gray-100 p-4 rounded mb-4 overflow-x-auto">{children}</pre>,
                    img: ({ src, alt }) => {
                      // src가 undefined인 경우 처리
                      if (!src) {
                        return null;
                      }
                      
                      // 이미지 파일명에서 위치 정보 추출 (예: image-left.png, image-center.png)
                      const isLeft = src.includes('-left');
                      const isRight = src.includes('-right');
                      const isCenter = src.includes('-center') || !isLeft && !isRight;
                      
                      const positionClass = isLeft ? 'float-left mr-4 mb-4' : 
                                          isRight ? 'float-right ml-4 mb-4' : 
                                          'mx-auto block';
                      
                      const maxWidth = isLeft || isRight ? 'max-w-xs' : 'max-w-full';
                      
                      return (
                        <img 
                          src={src} 
                          alt={alt || ''} 
                          className={`${maxWidth} h-auto rounded-lg shadow-md my-6 ${positionClass}`}
                          style={{
                            maxWidth: isLeft || isRight ? '300px' : '100%',
                            height: 'auto',
                            display: isLeft || isRight ? 'block' : 'block',
                            margin: isLeft || isRight ? '0 1rem 1rem 0' : '2rem auto',
                            clear: isLeft || isRight ? 'both' : 'none',
                          }}
                          onError={(e) => {
                            console.error('Image failed to load:', src);
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      );
                    },
                  }}
                >
                  {notice.body}
                </ReactMarkdown>
                
                {/* Additional Images from frontmatter */}
                {notice.images && notice.images.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-primary mb-4">첨부 이미지</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {notice.images.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={img.image}
                            alt={`첨부 이미지 ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                            onError={(e) => {
                              console.error('Image failed to load:', img.image);
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Back to List Button */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link
                to="/community/board"
                className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200"
              >
                목록으로 돌아가기
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default NoticeDetail 