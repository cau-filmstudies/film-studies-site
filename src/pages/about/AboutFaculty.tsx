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
        const facultyData = await loadFaculty()
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
        <title>교수진 - 중앙대학교 영화학과</title>
        <meta
          name="description"
          content="중앙대학교 영화학과 교수진을 소개합니다."
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
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-32 h-32 bg-accent rounded-full mx-auto mb-6"></div>
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
