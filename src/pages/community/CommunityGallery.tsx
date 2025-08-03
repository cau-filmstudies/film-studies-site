import React from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLocale } from '../../contexts/LocaleContext'

const CommunityGallery = () => {
  const { t } = useLocale()
  return (
    <>
      <Helmet>
        <title>사진첩 - 중앙대학교 영화학과</title>
        <meta name="description" content="중앙대학교 영화학과 사진첩입니다." />
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
              사진첩
            </h1>
            <div className="prose prose-lg mx-auto">
              <p>학과 행사, 영화제, 수업 등 다양한 활동 사진을 공유합니다.</p>
              <ul>
                <li>2024 봄 영화제 현장</li>
                <li>2023 졸업작품 시사회</li>
                <li>2023 신입생 오리엔테이션</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
export default CommunityGallery
