import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLocale } from '../contexts/LocaleContext'
import { loadAdmissions } from '../utils/content'
import type { Admissions as AdmissionsType } from '../types'

const Admissions = () => {
  const { t } = useLocale()
  const [admissions, setAdmissions] = useState<AdmissionsType | null>(null)

  useEffect(() => {
    const loadAdmissionsData = async () => {
      try {
        const admissionsData = await loadAdmissions()
        setAdmissions(admissionsData)
      } catch (error) {
        console.error('Error loading admissions:', error)
      }
    }

    loadAdmissionsData()
  }, [])

  if (!admissions) {
    return (
      <div className="py-20 bg-white">
        <div className="container-custom text-center">
          <p className="text-muted">로딩 중...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>입학 안내 - 중앙대학교 공연영상창작학부 영화전공</title>
        <meta
          name="description"
          content="중앙대학교 공연영상창작학부 영화전공 입학 안내 및 지원 방법을 확인해보세요."
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
              {t('section.admissions')}
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              미래의 영화인이 되기 위한 첫 걸음을 시작하세요
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Application Steps */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-16"
            >
              <h2 className="font-serif text-3xl font-bold text-primary mb-8">
                지원 절차
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {admissions.steps.map((step, index) => (
                  <div key={index} className="bg-gray-50 rounded-2xl p-6">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">
                      {index + 1}
                    </div>
                    <h3 className="font-semibold text-primary mb-2">{step}</h3>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              <h2 className="font-serif text-3xl font-bold text-primary mb-8">
                지원 요건
              </h2>
              <div className="bg-gray-50 rounded-2xl p-8">
                <ul className="space-y-4">
                  {admissions.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Deadlines */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-16"
            >
              <h2 className="font-serif text-3xl font-bold text-primary mb-8">
                지원 마감일
              </h2>
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-primary">
                        구분
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-primary">
                        마감일
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {admissions.deadlines.map((deadline, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="px-6 py-4 text-muted">
                          {deadline.name}
                        </td>
                        <td className="px-6 py-4 text-muted">
                          {deadline.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Apply Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <a
                href={admissions.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-lg px-12 py-4 inline-block"
              >
                {t('common.apply')}
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Admissions
