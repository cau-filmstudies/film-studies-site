import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLocale } from '../contexts/LocaleContext'

const Hero = () => {
  const { t } = useLocale()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-surface/90">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="font-serif text-5xl md:text-7xl font-bold">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-accent font-medium">
            {t('hero.subtitle')}
          </p>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            {t('hero.tagline')}
          </p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link to="/curriculum" className="btn-primary text-lg px-8 py-4">
              {t('hero.cta.primary')}
            </Link>
            <Link to="/admissions" className="btn-secondary text-lg px-8 py-4">
              {t('hero.cta.secondary')}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
