import React from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLocale } from '../../contexts/LocaleContext'

const CommunityResources = () => {
  const { t } = useLocale()
  return (
    <>
      <Helmet>
        <title>자료실 - 중앙대학교 영화학과</title>
        <meta name="description" content="중앙대학교 영화학과 자료실입니다." />
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
              자료실
            </h1>
            <div className="prose prose-lg mx-auto">
              <ul>
                <li>학사 관련 서식 다운로드</li>
                <li>영화 제작 가이드 PDF</li>
                <li>졸업 작품 제출 양식</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
export default CommunityResources
