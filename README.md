# 중앙대학교 공연영상창작학부 영화전공 웹사이트

중앙대학교 공연예술대학 영화학과를 위한 React + TypeScript 단일 페이지 애플리케이션입니다.

## 🎬 프로젝트 개요

이 프로젝트는 중앙대학교 공연영상창작학부 영화전공의 온라인 프레즌스를 위한 현대적이고 반응형 웹사이트입니다. MDX를 활용한 콘텐츠 관리 시스템을 통해 전공 정보, 교수진, 학생 프로젝트, 입학 안내 등을 제공합니다.

## 🚀 기술 스택

- **React 18** + **TypeScript**
- **Vite** - 빌드 도구
- **React Router** - 라우팅
- **Tailwind CSS** - 스타일링
- **Framer Motion** - 애니메이션
- **MDX** - 콘텐츠 관리
- **React Helmet Async** - SEO
- **Decap CMS** - 콘텐츠 관리 시스템

## 📁 프로젝트 구조

```
├── src/
│   ├── components/     # 재사용 가능한 컴포넌트
│   ├── contexts/       # React Context
│   ├── pages/          # 페이지 컴포넌트
│   ├── cms/           # CMS 설정 및 관리
│   ├── types/          # TypeScript 타입 정의
│   ├── utils/          # 유틸리티 함수
│   ├── App.tsx         # 메인 앱 컴포넌트
│   └── main.tsx        # 앱 진입점
├── content/            # MDX 콘텐츠
│   ├── faculty/        # 교수진 정보
│   ├── projects/       # 학생 프로젝트
│   ├── curriculum/     # 커리큘럼 정보
│   ├── board/          # 게시판 콘텐츠
│   ├── about.mdx       # 학과 소개
│   ├── admissions.mdx  # 입학 안내
│   └── site.mdx        # 사이트 메타데이터
├── public/             # 정적 파일
│   ├── admin/          # CMS 관리 파일
│   └── images/
│       └── uploads/    # CMS 업로드 이미지
└── package.json        # 의존성 관리
```

## 🛠️ 설치 및 실행

### 필수 요구사항

- Node.js 18.0.0 이상
- npm, yarn, 또는 pnpm

### 설치

```bash
# 의존성 설치
npm install

# 또는 yarn 사용
yarn install

# 또는 pnpm 사용
pnpm install
```

### 개발 서버 실행

```bash
# 개발 서버 시작
npm run dev

# 또는 yarn 사용
yarn dev

# 또는 pnpm 사용
pnpm dev
```

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 또는 yarn 사용
yarn build

# 또는 pnpm 사용
pnpm build
```

### 미리보기

```bash
# 빌드된 파일 미리보기
npm run preview

# 또는 yarn 사용
yarn preview

# 또는 pnpm 사용
pnpm preview
```

## 📝 콘텐츠 관리

### Decap CMS를 통한 콘텐츠 관리

이 프로젝트는 Decap CMS를 통해 콘텐츠를 관리할 수 있습니다.

#### CMS 접속

개발 서버가 실행 중일 때 CMS에 접속할 수 있습니다. 관리자 페이지 URL은 환경 변수로 설정됩니다.

#### 보안 설정

관리자 페이지 접근을 위한 보안 설정:

1. **환경 변수 설정**:

   ```bash
   # .env 파일에 추가
   VITE_ADMIN_PATH=your-secure-admin-path
   VITE_GITHUB_CLIENT_ID=your_client_id
   VITE_GITHUB_CLIENT_SECRET=your_client_secret
   VITE_MAX_LOGIN_ATTEMPTS=5
   VITE_SESSION_TIMEOUT=3600000
   ```

2. **관리자 페이지 URL 보안**:
   - 예측하기 어려운 URL 사용
   - 환경 변수를 통한 동적 설정
   - 접근 로그 모니터링

#### CMS 문제 해결

Decap CMS에서 DOM 오류가 발생하는 경우:

1. **브라우저 캐시 삭제**: Ctrl+Shift+R (Windows/Linux) 또는 Cmd+Shift+R (Mac)
2. **개인 브라우징 모드 사용**: 시크릿/프라이빗 모드에서 테스트
3. **다른 브라우저 사용**: Chrome, Firefox, Safari 등에서 테스트
4. **네트워크 연결 확인**: CDN 접근이 가능한지 확인

#### 대안 CMS 솔루션

Decap CMS에 문제가 있는 경우 다음 대안을 고려할 수 있습니다:

1. **Forestry CMS**: 더 안정적인 Git-based CMS
2. **Strapi**: Headless CMS with REST API
3. **Sanity**: Real-time collaborative CMS
4. **Contentful**: Enterprise-grade CMS

#### 게시판 글 작성 및 발행 가이드

**1단계: GitHub OAuth 앱 설정**

1. GitHub에서 새로운 OAuth 앱을 생성합니다:
   - GitHub Settings → Developer settings → OAuth Apps → New OAuth App
   - Application name: `CAU Film Studies CMS`
   - Homepage URL: `https://your-domain.com`
   - Authorization callback URL: `https://your-domain.com/[관리자경로]`

2. 생성된 Client ID와 Client Secret을 환경 변수로 설정:
   ```bash
   # .env 파일에 추가
   VITE_GITHUB_CLIENT_ID=your_client_id
   VITE_GITHUB_CLIENT_SECRET=your_client_secret
   ```

**2단계: CMS에 로그인**

1. 관리자 페이지에 접속
2. "Login with GitHub" 버튼 클릭
3. GitHub 계정으로 인증

**3단계: 새 글 작성**

1. CMS 대시보드에서 "게시판" 컬렉션 선택
2. "New 게시판" 버튼 클릭
3. 다음 필드들을 작성:
   - **제목**: 글의 제목 (필수)
   - **작성일**: 자동으로 현재 날짜 설정됨
   - **작성자**: 작성자 이름 (선택사항)
   - **내용**: Markdown 형식으로 글 내용 작성

**4단계: 이미지 업로드**

1. 내용 작성 중 이미지 삽입 버튼 클릭
2. 이미지 파일 선택 (자동으로 `/public/images/uploads/`에 저장됨)
3. 이미지 URL이 자동으로 생성됨

**5단계: 발행**

1. **Draft 상태**: 초기 저장 상태
2. **Review 상태**: 검토를 위해 변경 (editorial workflow 활성화)
3. **Publish 상태**: 최종 발행

#### 새로운 편집자 추가

1. GitHub 저장소 설정에서 Collaborators 추가
2. 해당 사용자가 CMS에 로그인하여 콘텐츠 작성 가능

### MDX 파일 작성

모든 텍스트 콘텐츠는 `/content` 디렉토리의 MDX 파일로 관리됩니다.

#### 교수진 정보 추가

`/content/faculty/` 디렉토리에 새로운 MDX 파일을 생성하세요:

```mdx
---
title: '교수명'
slug: 'prof-name'
role: '직책'
focus: ['전공분야1', '전공분야2']
email: 'email@cau.ac.kr'
photo: '/images/faculty/name.jpg'
links:
  - label: '링크명'
    url: 'https://...'
---

# 교수 소개

교수님의 소개 내용을 여기에 작성하세요.
```

#### 학생 프로젝트 추가

`/content/projects/` 디렉토리에 새로운 MDX 파일을 생성하세요:

```mdx
---
title: '프로젝트명'
slug: 'project-name'
year: 2025
type: '단편영화'
thumbnail: '/images/projects/name.jpg'
videoUrl: 'https://www.youtube.com/embed/xxxx'
credits:
  director: '감독명'
  cinematography: '촬영감독명'
tags: ['태그1', '태그2']
---

# 프로젝트 소개

프로젝트에 대한 상세한 설명을 여기에 작성하세요.
```

#### 커리큘럼 정보 추가

`/content/curriculum/` 디렉토리에 새로운 MDX 파일을 생성하세요:

```mdx
---
title: '과정명'
slug: 'course-name'
sequence: 1
core:
  - '핵심과목1'
  - '핵심과목2'
electives:
  - '선택과목1'
credits:
  total: 30
---

# 과정 소개

과정에 대한 상세한 설명을 여기에 작성하세요.
```

## 🎨 디자인 시스템

### 색상 팔레트

- **Primary**: `#0F0F10` - 메인 텍스트
- **Accent**: `#C8A24A` - 강조색
- **Surface**: `#111113` - 표면색
- **Muted**: `#6B7280` - 흐린 텍스트
- **Background**: `#FAFAF8` - 배경색

### 타이포그래피

- **제목**: Noto Serif KR
- **본문**: Inter (시스템 폰트)

### 간격 시스템

8pt 기반 스페이싱 시스템을 사용합니다:

- `p-2` = 8px
- `p-4` = 16px
- `p-8` = 32px

## 🌐 다국어 지원

현재 한국어(ko)와 영어(en)를 지원합니다. 언어 전환은 우측 상단의 언어 전환기를 통해 가능합니다.

## 📱 반응형 디자인

다음 브레이크포인트를 지원합니다:

- **모바일**: 360px
- **태블릿**: 768px
- **데스크톱**: 1280px

## ♿ 접근성

- WCAG 2.1 AA 기준 준수
- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 고대비 모드 지원

## 🚀 배포

### GitHub Pages 배포

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run typecheck

      - name: Lint
        run: npm run lint

      - name: Build
        run: npm run build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build-files
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Download build artifacts
        uses: actions/download-artifact@v4
        with:
          name: build-files
          path: dist/

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          cname: cau-film.github.io
```

### Vercel 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

### Netlify 배포

```bash
# Netlify CLI 설치
npm i -g netlify-cli

# 빌드
npm run build

# 배포
netlify deploy --prod --dir=dist
```

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새로운 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 다음으로 연락해주세요:

- **이메일**: film@cau.ac.kr
- **전화**: +82-2-820-0000

---

© 2024 중앙대학교 공연영상창작학부 영화전공. All rights reserved.
