import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLocale } from '../contexts/LocaleContext'

const NotFound = () => {
  const { t } = useLocale()

  return (
    <>
      <Helmet>
        <title>페이지를 찾을 수 없습니다 - 중앙대학교 공연영상창작학부 영화전공</title>
        <meta
          name="description"
          content="요청하신 페이지를 찾을 수 없습니다."
        />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto"
          >
            <div className="text-8xl font-bold text-accent mb-8">404</div>
            <h1 className="font-serif text-3xl font-bold text-primary mb-4">
              페이지를 찾을 수 없습니다
            </h1>
            <p className="text-muted mb-8">
              요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            </p>
            <Link to="/" className="btn-primary">
              홈으로 돌아가기
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default NotFound
