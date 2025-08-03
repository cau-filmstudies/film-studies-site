import matter from 'gray-matter'
import type { Faculty, Project, Curriculum, Admissions, Site } from '../types'

// MDX 파일들을 동적으로 로드하는 함수들
export const loadFaculty = async (): Promise<Faculty[]> => {
  const modules = import.meta.glob('/content/faculty/*.mdx', { eager: true })
  const faculty: Faculty[] = []

  for (const path in modules) {
    const module = modules[path] as { default: string }
    const { data, content } = matter(module.default)
    
    faculty.push({
      title: data.title,
      slug: data.slug,
      role: data.role,
      focus: data.focus,
      email: data.email,
      photo: data.photo,
      links: data.links,
      content
    })
  }

  return faculty.sort((a, b) => a.title.localeCompare(b.title))
}

export const loadProjects = async (): Promise<Project[]> => {
  const modules = import.meta.glob('/content/projects/*.mdx', { eager: true })
  const projects: Project[] = []

  for (const path in modules) {
    const module = modules[path] as { default: string }
    const { data, content } = matter(module.default)
    
    projects.push({
      title: data.title,
      slug: data.slug,
      year: data.year,
      type: data.type,
      thumbnail: data.thumbnail,
      videoUrl: data.videoUrl,
      credits: data.credits,
      tags: data.tags,
      content
    })
  }

  return projects.sort((a, b) => b.year - a.year)
}

export const loadCurriculum = async (): Promise<Curriculum[]> => {
  const modules = import.meta.glob('/content/curriculum/*.mdx', { eager: true })
  const curriculum: Curriculum[] = []

  for (const path in modules) {
    const module = modules[path] as { default: string }
    const { data, content } = matter(module.default)
    
    curriculum.push({
      title: data.title,
      slug: data.slug,
      sequence: data.sequence,
      core: data.core,
      electives: data.electives,
      credits: data.credits,
      content
    })
  }

  return curriculum.sort((a, b) => a.sequence - b.sequence)
}

export const loadAdmissions = async (): Promise<Admissions> => {
  const module = await import('/content/admissions.mdx')
  const { data, content } = matter(module.default)
  
  return {
    applyUrl: data.applyUrl,
    deadlines: data.deadlines,
    requirements: data.requirements,
    steps: data.steps,
    content
  }
}

export const loadSite = async (): Promise<Site> => {
  const module = await import('/content/site.mdx')
  const { data } = matter(module.default)
  
  return {
    tagline: data.tagline,
    contact: data.contact,
    socialLinks: data.socialLinks
  }
}

export const loadAbout = async (): Promise<string> => {
  const module = await import('/content/about.mdx')
  const { content } = matter(module.default)
  return content
} 