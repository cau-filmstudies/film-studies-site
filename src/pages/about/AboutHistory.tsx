import React from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLocale } from '../../contexts/LocaleContext'

const AboutHistory = () => {
  const { t } = useLocale()

  const history = [
    {
      year: '1960',
      title: '영화학과 설립',
              description: '중앙대학교 공연영상창작학부 영화전공이 설립되었습니다.',
    },
    {
      year: '1970',
      title: '첫 졸업생 배출',
      description: '영화학과 첫 졸업생들이 배출되었습니다.',
    },
    {
      year: '1980',
      title: '영화관 완공',
      description: '전용 영화관이 완공되어 실습 환경이 크게 개선되었습니다.',
    },
    {
      year: '1990',
      title: '국제교류 확대',
      description: '해외 영화학교와의 교류가 활발해졌습니다.',
    },
    {
      year: '2000',
      title: '디지털 영화 교육 도입',
      description: '디지털 영화 제작 교육이 본격적으로 시작되었습니다.',
    },
    {
      year: '2010',
      title: '영화제 개최',
      description: '학생 영화제가 정기적으로 개최되기 시작했습니다.',
    },
    {
      year: '2020',
      title: '온라인 교육 도입',
      description: '코로나19 상황에 대응하여 온라인 교육을 도입했습니다.',
    },
    {
      year: '2024',
      title: '현재',
      description:
        '한국 영화계를 이끄는 최고의 영화 교육기관으로 자리매김했습니다.',
    },
  ]

  return (
    <>
      <Helmet>
        <title>연혁 - 중앙대학교 공연영상창작학부 영화전공</title>
        <meta
          name="description"
          content="중앙대학교 공연영상창작학부 영화전공의 연혁을 확인해보세요."
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
              연혁
            </h1>

            <div className="space-y-8">
              {history.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center space-x-8"
                >
                  <div className="flex-shrink-0 w-24 h-24 bg-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {item.year}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-bold text-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default AboutHistory
