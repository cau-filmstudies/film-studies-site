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
        title: '영화전공 웹사이트에 오신 것을 환영합니다',
        date: '2025-08-02',
        author: '영화전공 관리자',
        body: '안녕하세요! 중앙대학교 공연영상창작학부 영화전공 웹사이트에 오신 것을 환영합니다...',
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
        title: '영화전공 웹사이트에 오신 것을 환영합니다',
        date: '2025-08-02',
        author: '영화전공 관리자',
        body: '안녕하세요! 중앙대학교 공연영상창작학부 영화전공 웹사이트에 오신 것을 환영합니다...',
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
  try {
    // 하드코딩된 교수진 데이터를 사용 (임시 해결책)
    const faculty: Faculty[] = [
      {
        title: "김도균",
        slug: "prof-kim1",
        role: "교수 / 영화감독",
        focus: ["감독", "시나리오", "영화사"],
        email: "kimddogyun1@cau.ac.kr",
        photo: "/images/test_image.JPG",
        links: [],
        content: `
          <h2>소개</h2>
          <p>김도균 교수는 15년간의 영화 제작 경험을 바탕으로 학생들에게 실무 중심의 교육을 제공합니다. 한국 영화계에서 활발히 활동하며, 다수의 상업 영화와 독립 영화를 제작했습니다.</p>
          
          <h2>학력</h2>
          <ul>
            <li><strong>중앙대학교</strong> 영화학과 학사</li>
            <li><strong>중앙대학교</strong> 영화학과 석사</li>
            <li><strong>NYU 영화학교</strong> 영화 제작 석사</li>
          </ul>
          
          <h2>주요 작품</h2>
          <h3>장편 영화</h3>
          <ul>
            <li><strong>《첫 번째 시간》</strong> (2023) - 감독, 각본</li>
            <li><strong>《기억의 조각들》</strong> (2021) - 감독</li>
            <li><strong>《우리들의 이야기》</strong> (2019) - 감독, 각본</li>
          </ul>
        `
      },
      {
        title: "김도균",
        slug: "prof-kim2",
        role: "부교수 / 촬영감독",
        focus: ["촬영", "조명", "영상기술"],
        email: "kimddogyun2@cau.ac.kr",
        photo: "/images/test_image.JPG",
        links: [],
        content: `
          <h2>소개</h2>
          <p>김도균 교수는 12년간의 촬영 경험을 바탕으로 학생들에게 실무 중심의 촬영 교육을 제공합니다. 한국 영화계에서 활발히 활동하며, 다수의 상업 영화와 독립 영화의 촬영을 담당했습니다.</p>
          
          <h2>학력</h2>
          <ul>
            <li><strong>중앙대학교</strong> 영화학과 학사</li>
            <li><strong>중앙대학교</strong> 영화학과 석사</li>
            <li><strong>AFI 영화학교</strong> 촬영 석사</li>
          </ul>
          
          <h2>주요 작품</h2>
          <h3>장편 영화</h3>
          <ul>
            <li><strong>《미드나잇 플랫폼》</strong> (2023) - 촬영감독</li>
            <li><strong>《서울의 밤》</strong> (2020) - 촬영감독</li>
            <li><strong>《우리들의 이야기》</strong> (2018) - 촬영감독</li>
          </ul>
        `
      },
      {
        title: "김도균",
        slug: "prof-kim3",
        role: "조교수 / 편집감독",
        focus: ["편집", "후반작업", "영상편집"],
        email: "kimddogyun3@cau.ac.kr",
        photo: "/images/test_image.JPG",
        links: [],
        content: `
          <h2>소개</h2>
          <p>김도균 교수는 10년간의 편집 경험을 바탕으로 학생들에게 실무 중심의 편집 교육을 제공합니다. 한국 영화계에서 활발히 활동하며, 다수의 상업 영화와 독립 영화의 편집을 담당했습니다.</p>
          
          <h2>학력</h2>
          <ul>
            <li><strong>중앙대학교</strong> 영화학과 학사</li>
            <li><strong>중앙대학교</strong> 영화학과 석사</li>
            <li><strong>USC 영화학교</strong> 편집 석사</li>
          </ul>
          
          <h2>주요 작품</h2>
          <h3>장편 영화</h3>
          <ul>
            <li><strong>《미드나잇 플랫폼》</strong> (2023) - 편집감독</li>
            <li><strong>《서울의 밤》</strong> (2020) - 편집감독</li>
            <li><strong>《우리들의 이야기》</strong> (2018) - 편집감독</li>
          </ul>
        `
      },
      {
        title: "김도균",
        slug: "prof-kim4",
        role: "조교수 / 음향감독",
        focus: ["음향", "사운드디자인", "음악"],
        email: "kimddogyun4@cau.ac.kr",
        photo: "/images/test_image.JPG",
        links: [],
        content: `
          <h2>소개</h2>
          <p>김도균 교수는 8년간의 음향 경험을 바탕으로 학생들에게 실무 중심의 음향 교육을 제공합니다. 한국 영화계에서 활발히 활동하며, 다수의 상업 영화와 독립 영화의 음향을 담당했습니다.</p>
          
          <h2>학력</h2>
          <ul>
            <li><strong>중앙대학교</strong> 영화학과 학사</li>
            <li><strong>중앙대학교</strong> 영화학과 석사</li>
            <li><strong>Berklee 음악대학</strong> 음향공학 석사</li>
          </ul>
          
          <h2>주요 작품</h2>
          <h3>장편 영화</h3>
          <ul>
            <li><strong>《미드나잇 플랫폼》</strong> (2023) - 음향감독</li>
            <li><strong>《서울의 밤》</strong> (2020) - 음향감독</li>
            <li><strong>《우리들의 이야기》</strong> (2018) - 음향감독</li>
          </ul>
        `
      },
      {
        title: "김도균",
        slug: "prof-kim5",
        role: "조교수 / 미술감독",
        focus: ["미술", "세트디자인", "의상"],
        email: "kimddogyun5@cau.ac.kr",
        photo: "/images/test_image.JPG",
        links: [],
        content: `
          <h2>소개</h2>
          <p>김도균 교수는 6년간의 미술 경험을 바탕으로 학생들에게 실무 중심의 미술 교육을 제공합니다. 한국 영화계에서 활발히 활동하며, 다수의 상업 영화와 독립 영화의 미술을 담당했습니다.</p>
          
          <h2>학력</h2>
          <ul>
            <li><strong>중앙대학교</strong> 영화학과 학사</li>
            <li><strong>중앙대학교</strong> 영화학과 석사</li>
            <li><strong>Parsons 디자인학교</strong> 미술디자인 석사</li>
          </ul>
          
          <h2>주요 작품</h2>
          <h3>장편 영화</h3>
          <ul>
            <li><strong>《미드나잇 플랫폼》</strong> (2023) - 미술감독</li>
            <li><strong>《서울의 밤》</strong> (2020) - 미술감독</li>
            <li><strong>《우리들의 이야기》</strong> (2018) - 미술감독</li>
          </ul>
        `
      },
      {
        title: "김도균",
        slug: "prof-kim6",
        role: "조교수 / 영화이론",
        focus: ["영화이론", "영화사", "영화비평"],
        email: "kimddogyun6@cau.ac.kr",
        photo: "/images/test_image.JPG",
        links: [],
        content: `
          <h2>소개</h2>
          <p>김도균 교수는 4년간의 영화이론 연구 경험을 바탕으로 학생들에게 실무 중심의 영화이론 교육을 제공합니다. 한국 영화계에서 활발히 활동하며, 다수의 영화이론 연구와 비평을 담당했습니다.</p>
          
          <h2>학력</h2>
          <ul>
            <li><strong>중앙대학교</strong> 영화학과 학사</li>
            <li><strong>중앙대학교</strong> 영화학과 석사</li>
            <li><strong>UCLA 영화학교</strong> 영화이론 박사</li>
          </ul>
          
          <h2>주요 연구</h2>
          <h3>영화이론</h3>
          <ul>
            <li><strong>《현대 영화이론의 이해》</strong> (2023) - 저서</li>
            <li><strong>《한국 영화사 연구》</strong> (2021) - 저서</li>
            <li><strong>《영화비평의 방법론》</strong> (2019) - 저서</li>
          </ul>
        `
      }
    ]

    console.log('Processed faculty data:', faculty)
    return faculty.sort((a, b) => a.title.localeCompare(b.title))
  } catch (error) {
    console.error('Error in loadFaculty:', error)
    return []
  }
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
