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
}

CMS.init(config)
