import React, { useEffect } from 'react'

declare global {
  interface Window {
    CMS: any
  }
}

const AdminPage: React.FC = () => {
  useEffect(() => {
    // DOM이 완전히 로드된 후 CMS 초기화
    const initCMS = () => {
      // 이미 초기화되었는지 확인
      if (window.CMS && document.getElementById('nc-root')) {
        return
      }

      // CMS 스크립트 로드
      const script = document.createElement('script')
      script.src =
        'https://cdn.jsdelivr.net/npm/decap-cms@3.8.3/dist/decap-cms.js'
      script.async = true

      script.onload = () => {
        // 잠시 대기 후 초기화
        setTimeout(() => {
          if (window.CMS) {
            try {
              window.CMS.registerPreviewStyle('/src/index.css')

              const config = {
                backend: {
                  name: 'git-gateway',
                  branch: 'main',
                },
                media_folder: 'public/images/uploads',
                public_folder: '/images/uploads',
                collections: [
                  {
                    name: 'board',
                    label: '게시판',
                    folder: 'content/board',
                    create: true,
                    slug: '{{year}}{{month}}{{day}}-{{slug}}',
                    fields: [
                      {
                        label: '제목',
                        name: 'title',
                        widget: 'string',
                        required: true,
                      },
                      {
                        label: '작성일',
                        name: 'date',
                        widget: 'datetime',
                        format: 'YYYY-MM-DD',
                        date_format: 'YYYY-MM-DD',
                        time_format: false,
                        default: 'now',
                      },
                      {
                        label: '작성자',
                        name: 'author',
                        widget: 'string',
                        required: false,
                      },
                      {
                        label: '내용',
                        name: 'body',
                        widget: 'markdown',
                        required: true,
                      },
                    ],
                  },
                ],
              }

              window.CMS.init({ config })
            } catch (error) {
              console.error('CMS 초기화 오류:', error)
            }
          }
        }, 100)
      }

      document.head.appendChild(script)
    }

    // DOM이 로드된 후 초기화
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initCMS)
    } else {
      initCMS()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div id="nc-root" className="h-screen">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted">CMS 로딩 중...</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
