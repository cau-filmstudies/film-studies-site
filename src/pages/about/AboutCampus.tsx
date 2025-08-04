import React from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLocale } from '../../contexts/LocaleContext'

const AboutCampus = () => {
  const { t } = useLocale()

  const facilities = [
    {
      name: '영화관',
      description: '전용 영화관에서 영화 상영 및 실습',
      icon: '🎬',
    },
    { name: '편집실', description: '최신 편집 장비를 갖춘 편집실', icon: '✂️' },
    {
      name: '촬영 스튜디오',
      description: '전문적인 촬영 환경을 제공하는 스튜디오',
      icon: '📹',
    },
    { name: '음향실', description: '사운드 믹싱 및 녹음 시설', icon: '🎵' },
    {
      name: '시나리오실',
      description: '창작 활동을 위한 전용 공간',
      icon: '✍️',
    },
    { name: '강의실', description: '최신 시설을 갖춘 강의실', icon: '📚' },
  ]

  return (
    <>
      <Helmet>
        <title>캠퍼스안내 - 중앙대학교 공연영상창작학부 영화전공</title>
        <meta
          name="description"
          content="중앙대학교 공연영상창작학부 영화전공 캠퍼스 시설을 안내합니다."
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
              캠퍼스안내
            </h1>

            <div className="prose prose-lg mx-auto mb-12">
              <h2>최첨단 영화 제작 시설</h2>
              <p>
                중앙대학교 공연영상창작학부 영화전공은 학생들이 영화 제작의 모든 과정을 경험할 수
                있도록 최첨단 시설을 제공합니다. 실제 영화 현장과 동일한
                환경에서 실습하며 전문적인 영화 제작 능력을 기를 수 있습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilities.map((facility, index) => (
                <motion.div
                  key={facility.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-4">{facility.icon}</div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-2">
                    {facility.name}
                  </h3>
                  <p className="text-muted">{facility.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 bg-accent/10 rounded-2xl p-8">
              <h2 className="font-serif text-2xl font-bold text-primary mb-4">
                위치 안내
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-primary mb-2">주소</h3>
                  <p className="text-muted">
                    서울특별시 동작구 흑석로 84 중앙대학교 영화관
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">교통편</h3>
                  <p className="text-muted">
                    지하철 2호선 흑석역 1번 출구에서 도보 10분
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default AboutCampus
