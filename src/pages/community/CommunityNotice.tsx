import React from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLocale } from '../../contexts/LocaleContext'

const CommunityNotice = () => {
  const { t } = useLocale()
  return (
    <>
      <Helmet>
        <title>공지사항 - 중앙대학교 영화학과</title>
        <meta
          name="description"
          content="중앙대학교 영화학과 공지사항입니다."
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
              공지사항
            </h1>
            <div className="prose prose-lg mx-auto">
              <p>학과의 주요 소식과 공지사항을 안내합니다.</p>
              <ul>
                <li>2024-06-01: 2024학년도 2학기 수강신청 안내</li>
                <li>2024-05-15: 영화제 참가자 모집 공고</li>
                <li>2024-04-20: 실습실 장비 점검 일정 안내</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
export default CommunityNotice
