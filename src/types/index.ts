export interface Faculty {
  title: string
  slug: string
  role: string
  focus: string[]
  email: string
  photo: string
  links?: Array<{
    label: string
    url: string
  }>
  content: string
}

export interface Project {
  title: string
  slug: string
  year: number
  type: string
  thumbnail: string
  videoUrl?: string
  credits: {
    director: string
    cinematography: string
  }
  tags: string[]
  content: string
}

export interface Curriculum {
  title: string
  slug: string
  sequence: number
  core: string[]
  electives: string[]
  credits: {
    total: number
  }
  content: string
}

export interface Admissions {
  applyUrl: string
  deadlines: Array<{
    name: string
    date: string
  }>
  requirements: string[]
  steps: string[]
  content: string
}

export interface Site {
  tagline: string
  contact: string
  socialLinks: Array<{
    label: string
    url: string
  }>
}

export type Locale = 'ko' | 'en'

export interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
} 