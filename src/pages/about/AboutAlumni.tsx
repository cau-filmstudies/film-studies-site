import React from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLocale } from '../../contexts/LocaleContext'

const AboutAlumni = () => {
  const { t } = useLocale()
  return (
    <>
      <Helmet>
        <title>동문소개 - 중앙대학교 공연영상창작학부 영화전공</title>
        <meta
          name="description"
          content="중앙대학교 공연영상창작학부 영화전공 동문을 소개합니다."
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
              동문소개
            </h1>
            <div className="prose prose-lg mx-auto">
              <p>
                중앙대학교 공연영상창작학부 영화전공의 동문들은 국내외 영화계에서 활발히 활동하며
                다양한 분야에서 리더십을 발휘하고 있습니다.
              </p>
              <ul>
                <li>
                  유명 감독, 촬영감독, 편집감독, 시나리오 작가 등 다수 배출
                </li>
                <li>국내외 영화제 수상 및 영화 산업 주요 인재</li>
                <li>동문 네트워크를 통한 멘토링 및 진로 지원</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
export default AboutAlumni
