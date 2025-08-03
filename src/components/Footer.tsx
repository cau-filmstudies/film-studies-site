import React from 'react'
import { Link } from 'react-router-dom'
import { useLocale } from '../contexts/LocaleContext'

const Footer = () => {
  const { t } = useLocale()

  return (
    <footer className="bg-primary text-white py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Department Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg"></div>
              <span className="font-serif font-semibold text-xl">
                중앙대학교 영화학과
              </span>
            </div>
            <p className="text-white/80 mb-4 max-w-md">
              미래의 영화인들이 시작하는 곳에서 창의적이고 혁신적인 영화 교육을
              제공합니다.
            </p>
            <p className="text-white/60 text-sm">{t('footer.address')}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">
              {t('nav.about')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about/faculty"
                  className="text-white/80 hover:text-accent transition-colors"
                >
                  {t('nav.about.faculty')}
                </Link>
              </li>
              <li>
                <Link
                  to="/education/curriculum"
                  className="text-white/80 hover:text-accent transition-colors"
                >
                  {t('nav.education.curriculum')}
                </Link>
              </li>
              <li>
                <Link
                  to="/admissions/guide"
                  className="text-white/80 hover:text-accent transition-colors"
                >
                  {t('nav.admissions.guide')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-2">
              <li className="text-white/80">
                <a
                  href="tel:+82-2-820-0000"
                  className="hover:text-accent transition-colors"
                >
                  +82-2-820-0000
                </a>
              </li>
              <li className="text-white/80">
                <a
                  href="mailto:film@cau.ac.kr"
                  className="hover:text-accent transition-colors"
                >
                  film@cau.ac.kr
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © 2024 중앙대학교 영화학과. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-white/60 hover:text-accent transition-colors"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-accent transition-colors"
            >
              YouTube
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-accent transition-colors"
            >
              Vimeo
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
