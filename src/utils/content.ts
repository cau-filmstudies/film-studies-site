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
    // 기본 포스트 목록 (빌드 시점에 존재하는 파일들)
    const defaultPosts: BoardPost[] = [
      {
        title: '영화학과 웹사이트에 오신 것을 환영합니다',
        date: '2025-08-02',
        author: '영화학과 관리자',
        body: '안녕하세요! 중앙대학교 영화학과 웹사이트에 오신 것을 환영합니다...',
        slug: '20250802-welcome',
      },
      {
        title: 'test',
        date: '2025-08-04',
        author: 'dogyun kim',
        body: '안녕하세요.\n\n**테스트 어쩌고.**',
        slug: '20250803-test',
      },
    ]

    // 동적 로딩 시도 (선택사항)
    let dynamicPosts: BoardPost[] = []
    try {
      const boardModules = (import.meta as any).glob(
        '/content/board/*.{md,mdx}',
        {
          eager: true,
          import: 'default',
        }
      )

      dynamicPosts = Object.entries(boardModules).map(([path, content]) => {
        const slug = path
          .replace('/content/board/', '')
          .replace(/\.(md|mdx)$/, '')
        const { data, content: bodyContent } = matter(content as string)

        return {
          title: data.title || '',
          date: data.date || '',
          author: data.author || '',
          body: bodyContent,
          slug,
        }
      })
    } catch (error) {
      console.log('Dynamic loading failed, using default posts only')
    }

    // 기본 포스트와 동적 포스트를 합치고 중복 제거
    const allPosts = [...defaultPosts, ...dynamicPosts]
    const uniquePosts = allPosts.filter(
      (post, index, self) => index === self.findIndex(p => p.slug === post.slug)
    )

    return uniquePosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  } catch (error) {
    console.error('Error reading board posts:', error)
    return []
  }
}

export const getBoardPost = async (slug: string): Promise<BoardPost | null> => {
  try {
    // 기본 포스트에서 찾기
    const defaultPosts = [
      {
        title: '영화학과 웹사이트에 오신 것을 환영합니다',
        date: '2025-08-02',
        author: '영화학과 관리자',
        body: '안녕하세요! 중앙대학교 영화학과 웹사이트에 오신 것을 환영합니다...',
        slug: '20250802-welcome',
      },
      {
        title: 'test',
        date: '2025-08-04',
        author: 'dogyun kim',
        body: '안녕하세요.\n\n**테스트 어쩌고.**',
        slug: '20250803-test',
      },
    ]

    const post = defaultPosts.find(p => p.slug === slug)
    if (post) {
      return post
    }

    // 동적 로딩 시도
    try {
      const module = await import(`/content/board/${slug}.mdx`)
      const { data, content } = matter(module.default)

      return {
        title: data.title || '',
        date: data.date || '',
        author: data.author || '',
        body: content,
        slug,
      }
    } catch {
      try {
        const module = await import(`/content/board/${slug}.md`)
        const { data, content } = matter(module.default)

        return {
          title: data.title || '',
          date: data.date || '',
          author: data.author || '',
          body: content,
          slug,
        }
      } catch {
        return null
      }
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
