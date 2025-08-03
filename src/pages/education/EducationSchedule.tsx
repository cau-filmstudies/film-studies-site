import React from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLocale } from '../../contexts/LocaleContext'

const EducationSchedule = () => {
  const { t } = useLocale()
  return (
    <>
      <Helmet>
        <title>학사일정 - 중앙대학교 영화학과</title>
        <meta
          name="description"
          content="중앙대학교 영화학과의 학사일정을 안내합니다."
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
              학사일정
            </h1>
            <div className="prose prose-lg mx-auto">
              <ul>
                <li>1학기 개강: 3월 초</li>
                <li>중간고사: 4월 말</li>
                <li>기말고사: 6월 중순</li>
                <li>여름방학: 6월 말 ~ 8월 말</li>
                <li>2학기 개강: 9월 초</li>
                <li>중간고사: 10월 말</li>
                <li>기말고사: 12월 중순</li>
                <li>겨울방학: 12월 말 ~ 2월 말</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
export default EducationSchedule
