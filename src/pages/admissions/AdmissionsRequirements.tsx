import React from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLocale } from '../../contexts/LocaleContext'

const AdmissionsRequirements = () => {
  const { t } = useLocale()
  return (
    <>
      <Helmet>
        <title>모집요강 - 중앙대학교 공연영상창작학부 영화전공</title>
        <meta
          name="description"
          content="중앙대학교 공연영상창작학부 영화전공 모집요강입니다."
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
              모집요강
            </h1>
            <div className="prose prose-lg mx-auto">
              <ul>
                <li>포트폴리오(단편영화 또는 시나리오 샘플)</li>
                <li>자기소개서</li>
                <li>학업계획서</li>
                <li>고등학교 성적표</li>
                <li>추천서(선택사항)</li>
              </ul>
              <p>
                지원 마감일, 전형 일정 등은 학과 홈페이지 공지사항을 참고하세요.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
export default AdmissionsRequirements
