import React from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLocale } from '../../contexts/LocaleContext'

const AboutInternational = () => {
  const { t } = useLocale()

  const partners = [
    {
      name: 'USC School of Cinematic Arts',
      country: '미국',
      description: '세계 최고의 영화학교와 교류',
    },
    {
      name: 'NYU Tisch School of the Arts',
      country: '미국',
      description: '뉴욕대학교 영화학교와 협력',
    },
    {
      name: 'La Fémis',
      country: '프랑스',
      description: '프랑스 국립영화학교와 교류',
    },
    {
      name: 'Beijing Film Academy',
      country: '중국',
      description: '중국 영화학교와 협력',
    },
    {
      name: 'Tokyo University of the Arts',
      country: '일본',
      description: '일본 예술대학과 교류',
    },
  ]

  return (
    <>
      <Helmet>
        <title>국제교류 - 중앙대학교 공연영상창작학부 영화전공</title>
        <meta
          name="description"
          content="중앙대학교 공연영상창작학부 영화전공의 국제교류 현황을 확인해보세요."
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
              국제교류
            </h1>

            <div className="prose prose-lg mx-auto mb-12">
              <h2>글로벌 영화 교육 네트워크</h2>
              <p>
                중앙대학교 공연영상창작학부 영화전공은 세계 각국의 유명
                영화학교와 활발한 교류를 통해 글로벌 영화 교육 네트워크를
                구축하고 있습니다. 학생들은 다양한 문화와 영화 제작 방식을
                경험하며 세계적인 시각을 기를 수 있습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-serif text-xl font-bold text-primary mb-2">
                    {partner.name}
                  </h3>
                  <p className="text-accent font-medium mb-2">
                    {partner.country}
                  </p>
                  <p className="text-muted">{partner.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default AboutInternational
