import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Locale, LocaleContextType } from '../types'

const translations = {
  ko: {
    'nav.home': '홈',
    'nav.about': '학과소개',
    'nav.about.major': '전공소개',
    'nav.about.history': '연혁',
    'nav.about.international': '국제교류',
    'nav.about.faculty': '교수진',
    'nav.about.campus': '캠퍼스안내',
    'nav.about.alumni': '동문소개',
    'nav.education': '교육과정',
    'nav.education.goals': '교육목표 및 인재상',
    'nav.education.curriculum': '교과과정',
    'nav.education.schedule': '학사일정',
    'nav.admissions': '입학',
    'nav.admissions.guide': '입학안내',
    'nav.admissions.requirements': '모집요강',
    'nav.community': '커뮤니티',
    'nav.community.board': '공지사항',
    'nav.community.gallery': '사진첩',
    'nav.community.faq': '자주묻는질문',
    'nav.community.resources': '자료실',
    'hero.title': '중앙대학교 공연영상창작학부 영화전공',
    'hero.subtitle': 'Department of Film Studies',
    'hero.tagline': '미래의 영화인들이 시작하는 곳',
    'hero.cta.primary': '커리큘럼 탐색',
    'hero.cta.secondary': '입학 안내',
    'section.about': '학과 소개',
    'section.curriculum': '커리큘럼',
    'section.faculty': '교수진',
    'section.projects': '학생 프로젝트',
    'section.admissions': '입학 안내',
    'footer.address': '서울캠퍼스(흑석동) 301관(중앙문화예술관) 507호 공연영상창작학부',
    'footer.contact': '연락처',
    'footer.social': '소셜 미디어',
    'common.readMore': '더 보기',
    'common.close': '닫기',
    'common.back': '뒤로',
    'common.apply': '지원하기',
    'common.viewAll': '전체 보기',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.about.major': 'Major Introduction',
    'nav.about.history': 'History',
    'nav.about.international': 'International Exchange',
    'nav.about.faculty': 'Faculty',
    'nav.about.campus': 'Campus Guide',
    'nav.about.alumni': 'Alumni',
    'nav.education': 'Education',
    'nav.education.goals': 'Educational Goals & Ideal Graduate',
    'nav.education.curriculum': 'Curriculum',
    'nav.education.schedule': 'Academic Calendar',
    'nav.admissions': 'Admissions',
    'nav.admissions.guide': 'Admissions Guide',
    'nav.admissions.requirements': 'Requirements',
    'nav.community': 'Community',
    'nav.community.board': 'Notice & Board',
    'nav.community.gallery': 'Gallery',
    'nav.community.faq': 'FAQ',
    'nav.community.resources': 'Resources',
    'hero.title': 'Department of Film Studies',
    'hero.subtitle': 'Chung-Ang University',
    'hero.tagline': 'Where Future Filmmakers Begin',
    'hero.cta.primary': 'Explore Curriculum',
    'hero.cta.secondary': 'View Admissions',
    'section.about': 'About Us',
    'section.curriculum': 'Curriculum',
    'section.faculty': 'Faculty',
    'section.projects': 'Student Projects',
    'section.admissions': 'Admissions',
    'footer.address': '84 Heukseok-ro, Dongjak-gu, Seoul',
    'footer.contact': 'Contact',
    'footer.social': 'Social Media',
    'common.readMore': 'Read More',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.apply': 'Apply Now',
    'common.viewAll': 'View All',
  },
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export const useLocale = () => {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}

interface LocaleProviderProps {
  children: ReactNode
}

export const LocaleProvider: React.FC<LocaleProviderProps> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('ko')

  const t = (key: string): string => {
    return (
      translations[locale][key as keyof (typeof translations)[typeof locale]] ||
      key
    )
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}
