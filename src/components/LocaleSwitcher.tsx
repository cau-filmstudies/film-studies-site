import React from 'react'
import { useLocale } from '../contexts/LocaleContext'

const LocaleSwitcher = () => {
  const { locale, setLocale } = useLocale()

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLocale('ko')}
        className={`text-sm font-medium px-2 py-1 rounded transition-colors duration-200 ${
          locale === 'ko'
            ? 'text-accent bg-accent/10'
            : 'text-muted hover:text-primary'
        }`}
      >
        KO
      </button>
      <span className="text-muted">|</span>
      <button
        onClick={() => setLocale('en')}
        className={`text-sm font-medium px-2 py-1 rounded transition-colors duration-200 ${
          locale === 'en'
            ? 'text-accent bg-accent/10'
            : 'text-muted hover:text-primary'
        }`}
      >
        EN
      </button>
    </div>
  )
}

export default LocaleSwitcher
