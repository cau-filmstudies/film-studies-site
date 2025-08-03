const config = {
  backend: {
    name: 'github',
    repo: 'cau-filmstudies/film-studies-site',
    branch: 'main',
    auth_scope: 'repo',
    open_authoring: false,
    editorial_workflow: true,
  },
  // Netlify Identity를 사용하는 대안 설정
  // backend: {
  //   name: 'git-gateway',
  //   branch: 'main',
  // },
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
    {
      name: 'pages',
      label: '페이지',
      files: [
        {
          name: 'about',
          label: '소개',
          file: 'content/about.mdx',
          fields: [
            {
              label: '제목',
              name: 'title',
              widget: 'string',
              required: true,
            },
            {
              label: '내용',
              name: 'body',
              widget: 'markdown',
              required: true,
            },
          ],
        },
        {
          name: 'admissions',
          label: '입학안내',
          file: 'content/admissions.mdx',
          fields: [
            {
              label: '제목',
              name: 'title',
              widget: 'string',
              required: true,
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
    },
  ],
}

// 안전한 CMS 초기화
function initCMS() {
  try {
    console.log('CMS 초기화 시작...')
    if (window.CMS) {
      console.log('CMS 객체 발견')
      // 이미 초기화되었는지 확인
      if (window.CMS.init) {
        console.log('CMS 초기화 중...')
        window.CMS.registerPreviewStyle('/src/index.css')
        window.CMS.init({ config })
        console.log('CMS 초기화 완료')
      } else {
        console.log('CMS.init 함수를 찾을 수 없음')
        setTimeout(initCMS, 100)
      }
    } else {
      console.log('CMS 객체를 찾을 수 없음, 재시도 중...')
      // CMS가 아직 로드되지 않았으면 잠시 후 다시 시도
      setTimeout(initCMS, 100)
    }
  } catch (error) {
    console.error('CMS 초기화 오류:', error)
    // 오류 발생 시 다시 시도
    setTimeout(initCMS, 500)
  }
}

// DOM이 로드된 후 CMS 초기화
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCMS)
} else {
  initCMS()
}
