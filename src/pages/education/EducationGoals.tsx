import React from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLocale } from '../../contexts/LocaleContext'

const EducationGoals = () => {
  const { t } = useLocale()
  return (
    <>
      <Helmet>
        <title>교육목표 및 인재상 - 중앙대학교 공연영상창작학부 영화전공</title>
        <meta
          name="description"
          content="중앙대학교 공연영상창작학부 영화전공의 교육목표 및 인재상을 소개합니다."
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
              교육목표 및 인재상
            </h1>
            <div className="prose prose-lg mx-auto">
              <p>
                창의적이고 실무 능력을 갖춘 영화인을 양성하며, 예술적 감각과
                윤리의식을 겸비한 글로벌 인재를 배출하는 것이 목표입니다.
              </p>
              <ul>
                <li>창의적 스토리텔러</li>
                <li>실무 중심의 영화 제작자</li>
                <li>윤리적 리더십을 갖춘 인재</li>
                <li>글로벌 영화 산업을 선도할 전문가</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
export default EducationGoals
