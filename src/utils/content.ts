import matter from 'gray-matter'
import type { Faculty, Project, Curriculum, Admissions, Site } from '../types'

export interface BoardPost {
  title: string
  date: string
  author?: string
  body: string
  slug: string
}

export const getBoardPosts = async (): Promise<BoardPost[]> => {
  try {
    const boardModules = (import.meta as any).glob(
      '/content/board/*.{md,mdx}',
      {
        eager: true,
      }
    )

    const posts = Object.entries(boardModules).map(([path, module]) => {
      const slug = path
        .replace('/content/board/', '')
        .replace(/\.(md|mdx)$/, '')
      const { data, content } = matter((module as any).default)

      return {
        title: data.title || '',
        date: data.date || '',
        author: data.author || '',
        body: content,
        slug,
      }
    })

    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  } catch (error) {
    console.error('Error reading board posts:', error)
    return []
  }
}

export const getBoardPost = async (slug: string): Promise<BoardPost | null> => {
  try {
    // .md와 .mdx 파일 모두 시도
    let module
    try {
      module = await import(`/content/board/${slug}.mdx`)
    } catch {
      try {
        module = await import(`/content/board/${slug}.md`)
      } catch {
        return null
      }
    }

    const { data, content } = matter(module.default)

    return {
      title: data.title || '',
      date: data.date || '',
      author: data.author || '',
      body: content,
      slug,
    }
  } catch (error) {
    console.error('Error reading board post:', error)
    return null
  }
}

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
      content,
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
      content,
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
      content,
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
    content,
  }
}

export const loadSite = async (): Promise<Site> => {
  const module = await import('/content/site.mdx')
  const { data } = matter(module.default)

  return {
    tagline: data.tagline,
    contact: data.contact,
    socialLinks: data.socialLinks,
  }
}

export const loadAbout = async (): Promise<string> => {
  const module = await import('/content/about.mdx')
  const { content } = matter(module.default)
  return content
}
