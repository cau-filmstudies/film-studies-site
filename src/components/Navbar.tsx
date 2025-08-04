import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocale } from '../contexts/LocaleContext'
import LocaleSwitcher from './LocaleSwitcher'

const Navbar = () => {
  const { t } = useLocale()
  const location = useLocation()
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const navItems: Array<{
    key: string
    label: string
    path: string
    submenu?: Array<{
      key: string
      label: string
      path: string
    }>
  }> = [
    {
      key: 'about',
      label: t('nav.about'),
      path: '/about/major',
      submenu: [
        {
          key: 'major',
          label: t('nav.about.major'),
          path: '/about/major',
        },
        {
          key: 'history',
          label: t('nav.about.history'),
          path: '/about/history',
        },
        {
          key: 'international',
          label: t('nav.about.international'),
          path: '/about/international',
        },
        {
          key: 'faculty',
          label: t('nav.about.faculty'),
          path: '/about/faculty',
        },
        {
          key: 'campus',
          label: t('nav.about.campus'),
          path: '/about/campus',
        },
        {
          key: 'alumni',
          label: t('nav.about.alumni'),
          path: '/about/alumni',
        },
      ],
    },
    {
      key: 'education',
      label: t('nav.education'),
      path: '/education/goals',
      submenu: [
        {
          key: 'goals',
          label: t('nav.education.goals'),
          path: '/education/goals',
        },
        {
          key: 'curriculum',
          label: t('nav.education.curriculum'),
          path: '/education/curriculum',
        },
        {
          key: 'schedule',
          label: t('nav.education.schedule'),
          path: '/education/schedule',
        },
      ],
    },

    {
      key: 'admissions',
      label: t('nav.admissions'),
      path: '/admissions/guide',
    },
    {
      key: 'community',
      label: t('nav.community'),
      path: '/community/board',
      submenu: [
        {
          key: 'board',
          label: t('nav.community.board'),
          path: '/community/board',
        },

        { key: 'faq', label: t('nav.community.faq'), path: '/community/faq' },
      ],
    },
  ]

  const handleMouseEnter = (key: string) => {
    setActiveDropdown(key)
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
  }

  return (
    <motion.nav
      className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img 
              src="/images/CAU_emblem.png" 
              alt="CAU Emblem" 
              className="w-12 h-12 object-contain hover:opacity-80 transition-opacity duration-200"
            />
            <span className="ml-3 text-base font-semibold whitespace-nowrap">
              중앙대학교 공연영상창작학부 영화전공
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map(item => (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.key)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={item.path}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-accent ${
                    location.pathname.startsWith(item.path)
                      ? 'text-accent'
                      : 'text-muted'
                  }`}
                >
                  {item.label}
                </Link>

                <AnimatePresence>
                  {activeDropdown === item.key && item.submenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                    >
                      {item.submenu.map(subItem => (
                        <Link
                          key={subItem.key}
                          to={subItem.path}
                          className="block px-4 py-2 text-sm text-muted hover:text-accent hover:bg-gray-50 transition-colors duration-200"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <LocaleSwitcher />
            <button className="btn-primary text-sm">{t('common.apply')}</button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
