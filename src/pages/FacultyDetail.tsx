import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLocale } from '../contexts/LocaleContext'

const FacultyDetail = () => {
  const { slug } = useParams()
  const { t } = useLocale()

  // 실제로는 slug를 사용해서 해당 교수진 정보를 로드해야 합니다
  const faculty = {
    title: '김영화',
    role: '교수 / 영화감독',
    focus: ['감독', '시나리오', '영화사'],
    email: 'kim@cau.ac.kr',
    photo: '/images/faculty/kim.jpg',
    content:
      '김영화 교수는 20년간의 영화 제작 경험을 바탕으로 학생들에게 실무 중심의 교육을 제공합니다.',
  }

  return (
    <>
      <Helmet>
        <title>{faculty.title} - 중앙대학교 영화학과</title>
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
              to="/faculty"
              className="text-accent hover:text-accent/80 mb-8 inline-block"
            >
              ← {t('common.back')}
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="w-64 h-64 bg-accent rounded-2xl mx-auto mb-6"></div>
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
                  <h2 className="font-serif text-2xl font-bold text-primary mb-6">
                    소개
                  </h2>
                  <p className="text-muted leading-relaxed">
                    {faculty.content}
                  </p>
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
