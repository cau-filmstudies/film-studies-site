import React from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLocale } from '../../contexts/LocaleContext'

const CommunityFAQ = () => {
  const { t } = useLocale()
  return (
    <>
      <Helmet>
        <title>자주묻는질문 - 중앙대학교 영화학과</title>
        <meta
          name="description"
          content="중앙대학교 영화학과 자주묻는질문입니다."
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
              자주묻는질문
            </h1>
            <div className="prose prose-lg mx-auto">
              <ul>
                <li>
                  <strong>Q.</strong> 영화학과 지원에 포트폴리오가 꼭
                  필요한가요?
                  <br />
                  <strong>A.</strong> 네, 포트폴리오(단편영화, 시나리오 등)가
                  필요합니다.
                </li>
                <li>
                  <strong>Q.</strong> 실기 시험은 어떤 방식으로 진행되나요?
                  <br />
                  <strong>A.</strong> 영화 분석, 스토리텔링, 영상 제작 등 다양한
                  항목으로 평가합니다.
                </li>
                <li>
                  <strong>Q.</strong> 졸업 후 진로는 어떻게 되나요?
                  <br />
                  <strong>A.</strong> 감독, 촬영, 편집, 시나리오 작가,
                  영화제작사 등 다양한 분야로 진출합니다.
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
export default CommunityFAQ
