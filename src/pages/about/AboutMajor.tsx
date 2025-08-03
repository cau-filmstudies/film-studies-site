import React from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLocale } from '../../contexts/LocaleContext'

const AboutMajor = () => {
  const { t } = useLocale()

  return (
    <>
      <Helmet>
        <title>전공소개 - 중앙대학교 영화학과</title>
        <meta
          name="description"
          content="중앙대학교 영화학과 전공소개입니다."
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
              전공소개
            </h1>

            <div className="prose prose-lg mx-auto">
              <h2>영화학과 소개</h2>
              <p>
                중앙대학교 영화학과는 1960년 설립 이래 한국 영화계를 이끌어온
                최고의 영화 교육기관입니다. 실무 중심의 교육과정과 최첨단 시설을
                통해 학생들이 영화 제작의 모든 과정을 경험할 수 있도록
                지원합니다.
              </p>

              <h2>교육 목표</h2>
              <p>
                우리는 <strong>창의성</strong>, <strong>실무 능력</strong>,{' '}
                <strong>예술적 감각</strong>을 겸비한 영화인을 양성합니다.
                이론과 실습의 균형을 통해 학생들이 실제 영화 현장에서 즉시
                활용할 수 있는 능력을 갖출 수 있도록 합니다.
              </p>

              <h2>주요 특징</h2>
              <ul>
                <li>
                  <strong>실무 중심 교육</strong>: 현직 영화인들의 직접 지도
                </li>
                <li>
                  <strong>최첨단 시설</strong>: 최신 영화 제작 장비와 스튜디오
                </li>
                <li>
                  <strong>다양한 전공</strong>: 감독, 촬영, 편집, 음향, 시나리오
                  등
                </li>
                <li>
                  <strong>산학 협력</strong>: 영화사와의 긴밀한 협력 관계
                </li>
              </ul>

              <h2>졸업생 성과</h2>
              <p>
                우리 학과 졸업생들은 국내외 영화제에서 수상하며 활발히 활동하고
                있습니다. 영화계의 다양한 분야에서 리더십을 발휘하며 한국 영화
                발전에 기여하고 있습니다.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default AboutMajor
