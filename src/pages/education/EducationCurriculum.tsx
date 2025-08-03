import React from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLocale } from '../../contexts/LocaleContext'

const EducationCurriculum = () => {
  const { t } = useLocale()
  return (
    <>
      <Helmet>
        <title>교과과정 - 중앙대학교 영화학과</title>
        <meta
          name="description"
          content="중앙대학교 영화학과의 교과과정을 소개합니다."
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
              교과과정
            </h1>
            <div className="prose prose-lg mx-auto">
              <p>
                영화 제작의 이론과 실습을 균형 있게 배울 수 있는 체계적인
                커리큘럼을 제공합니다.
              </p>
              <ul>
                <li>기초 이론: 영화사, 영화이론, 시나리오 작성법</li>
                <li>실습: 촬영, 편집, 음향, 연출 등</li>
                <li>심화 과정: 장편/단편 제작, 졸업 작품</li>
                <li>산학 협력 및 현장 실습</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
export default EducationCurriculum
