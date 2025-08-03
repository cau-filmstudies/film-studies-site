import React from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLocale } from '../../contexts/LocaleContext'

const AdmissionsGuide = () => {
  const { t } = useLocale()
  return (
    <>
      <Helmet>
        <title>입학안내 - 중앙대학교 영화학과</title>
        <meta
          name="description"
          content="중앙대학교 영화학과 입학안내입니다."
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
              입학안내
            </h1>
            <div className="prose prose-lg mx-auto mb-12">
              <p>
                중앙대학교 영화학과에 입학을 희망하는 학생들을 위한 안내입니다.
              </p>
              <ul>
                <li>지원 자격: 고등학교 졸업(예정)자 또는 동등 학력 소지자</li>
                <li>전형 방법: 서류 심사, 실기 시험, 면접</li>
                <li>자세한 내용은 모집요강을 참고하세요.</li>
              </ul>
            </div>

            {/* External Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <a
                href="https://www.youtube.com/channel/UCGiS3YxJN3PNt-entnSCtPw"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-primary group-hover:text-accent transition-colors">
                      중앙대학교 입학처 유튜브
                    </h3>
                    <p className="text-muted text-sm">
                      입학 관련 영상과 정보를 확인하세요
                    </p>
                  </div>
                </div>
              </a>

              <a
                href="https://admission.cau.ac.kr/main.do"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-primary group-hover:text-accent transition-colors">
                      중앙대학교 입학안내 사이트
                    </h3>
                    <p className="text-muted text-sm">
                      공식 입학 정보를 확인하세요
                    </p>
                  </div>
                </div>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
export default AdmissionsGuide
