export interface Notice {
  id: string
  title: string
  date: string
  author: string
  views: number
  pinned: boolean
  body: string
  slug: string
  images?: Array<{ image: string }>
}

export interface NoticeFilters {
  searchTerm: string
  searchBy: 'title' | 'author' | 'body'
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
} 