import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLocale } from '../contexts/LocaleContext'
import { loadFaculty } from '../utils/content'
import type { Faculty } from '../types'

const FacultyDetail = () => {
  const { slug } = useParams()
  const { t } = useLocale()
  const [faculty, setFaculty] = useState<Faculty | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFacultyData = async () => {
      try {
        const facultyData = await loadFaculty()
        const currentFaculty = facultyData.find(f => f.slug === slug)
        setFaculty(currentFaculty || null)
      } catch (error) {
        console.error('Error loading faculty:', error)
      } finally {
        setLoading(false)
      }
    }

    loadFacultyData()
  }, [slug])

  if (loading) {
    return (
      <div className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent mx-auto"></div>
            <p className="mt-4 text-muted">로딩 중...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!faculty) {
    return (
      <div className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="font-serif text-3xl font-bold text-primary mb-4">
              교수진을 찾을 수 없습니다
            </h1>
            <Link
              to="/about/faculty"
              className="text-accent hover:text-accent/80"
            >
              ← 교수진 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{faculty.title} - 중앙대학교 공연영상창작학부 영화전공</title>
        <meta
          name="description"
          content={`${faculty.title} 교수님의 프로필을 확인해보세요.`}
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
            <Link
              to="/about/faculty"
              className="text-accent hover:text-accent/80 mb-8 inline-block"
            >
              ← {t('common.back')}
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <img
                  src={faculty.photo}
                  alt={faculty.title}
                  className="w-64 h-64 rounded-2xl object-cover mx-auto mb-6"
                />
                <div className="text-center">
                  <h1 className="font-serif text-3xl font-bold text-primary mb-2">
                    {faculty.title}
                  </h1>
                  <p className="text-muted mb-4">{faculty.role}</p>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {faculty.focus.map(focus => (
                      <span
                        key={focus}
                        className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full"
                      >
                        {focus}
                      </span>
                    ))}
                  </div>
                  <a
                    href={`mailto:${faculty.email}`}
                    className="text-accent hover:text-accent/80 transition-colors"
                  >
                    {faculty.email}
                  </a>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="prose prose-lg max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: faculty.content }} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default FacultyDetail
