import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLocale } from '../../contexts/LocaleContext'
import { loadFaculty } from '../../utils/content'
import type { Faculty } from '../../types'

const AboutFaculty = () => {
  const { t } = useLocale()
  const [faculty, setFaculty] = useState<Faculty[]>([])

  useEffect(() => {
    const loadFacultyData = async () => {
      try {
        console.log('Loading faculty data...')
        const facultyData = await loadFaculty()
        console.log('Faculty data loaded:', facultyData)
        setFaculty(facultyData)
      } catch (error) {
        console.error('Error loading faculty:', error)
      }
    }

    loadFacultyData()
  }, [])

  return (
    <>
      <Helmet>
        <title>교수진 - 중앙대학교 공연영상창작학부 영화전공</title>
        <meta
          name="description"
          content="중앙대학교 공연영상창작학부 영화전공 교수진을 소개합니다."
        />
      </Helmet>

      <div className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
              교수진
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              영화계의 전문가들이 직접 전하는 실무 중심의 교육
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {faculty.map((member, index) => (
              <motion.div
                key={member.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => window.location.href = `/about/faculty/${member.slug}`}
              >
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <img
                    src={member.photo}
                    alt={member.title}
                    className="w-32 h-32 rounded-full object-cover mx-auto group-hover:opacity-80 transition-opacity duration-200"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="bg-white/90 rounded-lg px-3 py-1 text-sm font-medium text-gray-800">
                      자세히 보기
                    </div>
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-bold text-primary text-center mb-2">
                  {member.title}
                </h3>
                <p className="text-muted text-center mb-4">{member.role}</p>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {member.focus.map(focus => (
                    <span
                      key={focus}
                      className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full"
                    >
                      {focus}
                    </span>
                  ))}
                </div>
                <div className="text-center">
                  <a
                    href={`mailto:${member.email}`}
                    className="text-accent hover:text-accent/80 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {member.email}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutFaculty
