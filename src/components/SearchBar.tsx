import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { NoticeFilters } from '../types/notice'

interface SearchBarProps {
  onSearch: (filters: NoticeFilters) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchBy, setSearchBy] = useState<'title' | 'author' | 'body'>('title')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch({ searchTerm, searchBy })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-gray-50 rounded-lg p-6 border border-gray-200"
    >
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <select
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value as 'title' | 'author' | 'body')}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="title">제목</option>
          <option value="author">작성자</option>
          <option value="body">내용</option>
        </select>
        
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="검색어를 입력하세요"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        
        <button
          type="submit"
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
        >
          검색
        </button>
      </form>
    </motion.div>
  )
}

export default SearchBar 