import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useSearchParams, Link } from 'react-router-dom'
import { Notice, NoticeFilters } from '../types/notice'
import { getBoardPosts, getRateLimitStatus } from '../utils/api'
import SearchBar from './SearchBar'
import Pagination from './Pagination'

const NoticeBoard = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [rateLimitInfo, setRateLimitInfo] = useState<{
    remaining: number
    resetTime: number
    isBlocked: boolean
  } | null>(null)
  const [filters, setFilters] = useState<NoticeFilters>({
    searchTerm: '',
    searchBy: 'title',
  })

  const currentPage = parseInt(searchParams.get('page') || '1')
  const itemsPerPage = 10

  useEffect(() => {
    const loadNotices = async () => {
      try {
        setLoading(true)
        setError(null)

        // Rate Limit 상태 확인
        const rateLimit = getRateLimitStatus(
          '/.netlify/functions/get-board-posts'
        )
        setRateLimitInfo(rateLimit)

        if (rateLimit.isBlocked) {
          const waitTime = Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
          setError(
            `요청이 너무 많습니다. ${waitTime}초 후에 다시 시도해주세요.`
          )
          return
        }

        // 안전한 API 호출
        const data = await getBoardPosts()

        // API 응답을 Notice 형식으로 변환
        const transformedNotices: Notice[] = data.map(
          (post: any, index: number) => ({
            id: (index + 1).toString(),
            title: post.title || '',
            date: post.date || '',
            author: post.author || '',
            pinned: false, // 필요시 frontmatter에서 pinned 필드 추가 가능
            body: post.body || '',
            slug: post.slug || '',
            views: 0, // Views는 제거하므로 0으로 설정
          })
        )

        setNotices(transformedNotices)
      } catch (error) {
        console.error('Error loading notices:', error)

        // Rate Limit 오류 처리
        if (error instanceof Error && error.message.includes('Rate limit')) {
          setError(error.message)
        } else {
          setError('게시글을 불러오는 중 오류가 발생했습니다.')
        }

        // API 실패 시 기본 데이터 사용
        setNotices([
          {
            id: '1',
            title: '영화학과 웹사이트에 오신 것을 환영합니다',
            date: '2025-01-15T09:00:00.000Z',
            author: '영화학과 관리자',
            views: 0,
            pinned: true,
            body: '안녕하세요! 중앙대학교 공연영상창작학부 영화전공 웹사이트에 오신 것을 환영합니다...',
            slug: '20250115-welcome-notice',
          },
          {
            id: '2',
            title: '2025학년도 1학기 커리큘럼 업데이트 안내',
            date: '2025-01-10T14:30:00.000Z',
            author: '학과장',
            views: 0,
            pinned: false,
            body: '2025학년도 1학기 커리큘럼이 업데이트되었습니다...',
            slug: '20250110-curriculum-update',
          },
          {
            id: '3',
            title: '졸업작품 제출 일정 안내',
            date: '2025-01-08T11:00:00.000Z',
            author: '학과장',
            views: 0,
            pinned: true,
            body: '졸업작품 제출 일정이 확정되었습니다...',
            slug: '20250108-graduation-works',
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    loadNotices()
  }, [])

  const filteredNotices = useMemo(() => {
    if (!filters.searchTerm) return notices

    return notices.filter(notice => {
      const searchTerm = filters.searchTerm.toLowerCase()
      const searchField = notice[filters.searchBy].toLowerCase()
      return searchField.includes(searchTerm)
    })
  }, [notices, filters])

  const paginatedNotices = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredNotices.slice(startIndex, endIndex)
  }, [filteredNotices, currentPage])

  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage)

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSearch = (newFilters: NoticeFilters) => {
    setFilters(newFilters)
    setSearchParams({ page: '1' })
  }

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

  if (error) {
    return (
      <div className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              오류가 발생했습니다
            </h2>
            <p className="text-muted mb-4">{error}</p>
            {rateLimitInfo && rateLimitInfo.isBlocked && (
              <p className="text-sm text-muted">
                남은 요청: {rateLimitInfo.remaining}회 | 재설정 시간:{' '}
                {new Date(rateLimitInfo.resetTime).toLocaleTimeString()}
              </p>
            )}
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>학과공지 - 중앙대학교 공연영상창작학부 영화전공</title>
        <meta
          name="description"
          content="중앙대학교 공연영상창작학부 영화전공 학과공지입니다."
        />
      </Helmet>

      <div className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            {/* Page Title */}
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
                학과공지
              </h1>
              <div className="w-24 h-0.5 bg-red-500 mx-auto"></div>
            </div>

            {/* Notice Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="px-4 py-3 text-left font-semibold text-primary">
                      No.
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-primary">
                      NOTICE
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-primary">
                      Title
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-primary">
                      Author
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-primary">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedNotices.map((notice, index) => (
                    <motion.tr
                      key={notice.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-4 py-4 text-sm text-muted">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-4 py-4">
                        {notice.pinned && (
                          <span className="inline-block w-12 h-5 bg-gray-500 text-white text-xs rounded-sm flex items-center justify-center">
                            NOTICE
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <Link
                          to={`/notices/${notice.slug}`}
                          className="text-primary hover:text-primary-dark font-medium transition-colors duration-200"
                        >
                          {notice.title}
                        </Link>
                      </td>
                      <td className="px-4 py-4 text-sm text-muted">
                        {notice.author}
                      </td>
                      <td className="px-4 py-4 text-sm text-muted">
                        {new Date(notice.date).toLocaleDateString('ko-KR')}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredNotices.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted">검색 결과가 없습니다.</p>
              </div>
            )}

            {/* Search Bar - 아래로 이동 */}
            <div className="mt-8">
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default NoticeBoard
