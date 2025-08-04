import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import { useLocale } from '../contexts/LocaleContext'

interface BoardPost {
  title: string
  date: string
  author?: string
  thumbnail?: string
  images?: Array<{ image: string }>
  body: string
  slug: string
}


const Home = () => {
  const { t } = useLocale()
  const [boardPosts, setBoardPosts] = useState<BoardPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBoardPosts = async () => {
      try {
        // Netlify Function을 통해 게시글을 가져옴
        const response = await fetch('/.netlify/functions/get-board-posts')
        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }

        const posts = await response.json()
        // 최신 3개의 공지사항만 가져오기
        setBoardPosts(posts.slice(0, 3))
      } catch (error) {
        console.error('Error loading board posts:', error)
        // API 실패 시 기본 데이터 사용
        setBoardPosts([
          {
            title: '2025학년도 1학기 수강신청 안내',
            date: '2024-12-19',
            author: '영화학과 관리자',
            body: '2025학년도 1학기 수강신청이 시작됩니다. 자세한 일정과 방법을 확인하세요.',
            slug: '20241219-course-registration',
          },
          {
            title: '겨울방학 중 시설 이용 안내',
            date: '2024-12-18',
            author: '영화학과 관리자',
            body: '겨울방학 중 시설 이용에 관한 안내사항입니다.',
            slug: '20241218-facility-notice',
          },
          {
            title: '졸업작품전 개최 안내',
            date: '2024-12-17',
            author: '영화학과 관리자',
            body: '졸업작품전이 개최됩니다. 많은 관심과 참여 부탁드립니다.',
            slug: '20241217-graduation-exhibition',
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    loadBoardPosts()
  }, [])

  return (
    <>
      <Helmet>
        <title>중앙대학교 공연영상창작학부 영화전공 - School of Performing Arts and Media</title>
        <meta
          name="description"
          content="미래의 영화인들이 시작하는 곳, 중앙대학교 공연영상창작학부 영화전공입니다."
        />
      </Helmet>

      <Hero />

      {/* Faculty & Community Cards */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Faculty Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="text-center">
                <div className="text-5xl mb-4">👥</div>
                <h3 className="font-serif text-2xl font-bold text-primary mb-4">
                  구성원 보러가기
                </h3>
                <p className="text-muted mb-6 leading-relaxed">
                  중앙대학교 공연영상창작학부 영화전공의 교수진과 구성원들을 소개합니다. 
                  영화계의 전문가들이 직접 전하는 실무 중심의 교육을 경험해보세요.
                </p>
                <Link 
                  to="/about/faculty" 
                  className="inline-flex items-center btn-primary"
                >
                  구성원 보러가기 +
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* Community Board Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="text-center">
                <div className="text-5xl mb-4">📢</div>
                <h3 className="font-serif text-2xl font-bold text-primary mb-4">
                  공지사항
                </h3>
                                 <div className="space-y-4 mb-6">
                   {loading ? (
                     <div className="text-center py-4">
                       <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent mx-auto"></div>
                       <p className="text-xs text-muted mt-2">로딩 중...</p>
                     </div>
                   ) : boardPosts.length > 0 ? (
                     boardPosts.map((post, index) => (
                       <div key={post.slug} className="bg-white/50 rounded-lg p-4 text-left">
                         <div className="flex items-center justify-between mb-2">
                           <span className="text-sm text-accent font-semibold">[공지]</span>
                           <span className="text-xs text-muted">
                             {new Date(post.date).toLocaleDateString('ko-KR', {
                               year: 'numeric',
                               month: '2-digit',
                               day: '2-digit'
                             })}
                           </span>
                         </div>
                         <p className="text-sm text-primary font-medium line-clamp-2">
                           {post.title}
                         </p>
                       </div>
                     ))
                   ) : (
                     <div className="text-center py-4">
                       <p className="text-sm text-muted">아직 공지사항이 없습니다.</p>
                     </div>
                   )}
                 </div>
                <Link 
                  to="/community/board" 
                  className="inline-flex items-center btn-secondary"
                >
                  더보기
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
                     </div>
         </div>
       </section>

       {/* Quick Links */}
       <section className="py-20 bg-gray-50">
         <div className="container-custom">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             viewport={{ once: true }}
             className="text-center mb-16"
           >
             <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
               Quick Links
             </h2>
             <p className="text-lg text-muted max-w-2xl mx-auto">
               필요한 정보를 빠르게 찾아보세요
             </p>
           </motion.div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* 입학정보 바로가기 */}
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.1 }}
               viewport={{ once: true }}
               className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-accent/20"
             >
               <div className="text-center">
                 <div className="text-5xl mb-4">🎓</div>
                 <h3 className="font-serif text-xl font-bold text-primary mb-4">
                   입학정보 바로가기
                 </h3>
                 <p className="text-muted mb-6 leading-relaxed">
                   입학 안내, 지원 자격, 서류 제출 등 입학과 관련된 모든 정보를 확인하세요.
                 </p>
                 <Link 
                   to="/admissions/guide" 
                   className="inline-flex items-center btn-primary w-full justify-center"
                 >
                   입학정보 보기
                   <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                   </svg>
                 </Link>
               </div>
             </motion.div>

             {/* 중앙대학교 바로가기 */}
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               viewport={{ once: true }}
               className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-primary/20"
             >
               <div className="text-center">
                 <div className="text-5xl mb-4">🏛️</div>
                 <h3 className="font-serif text-xl font-bold text-primary mb-4">
                   중앙대학교 바로가기
                 </h3>
                 <p className="text-muted mb-6 leading-relaxed">
                   중앙대학교 공식 웹사이트에서 학교 소개, 학사 정보, 캠퍼스 안내를 확인하세요.
                 </p>
                 <a 
                   href="https://www.cau.ac.kr" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center btn-secondary w-full justify-center"
                 >
                   중앙대학교 홈페이지
                   <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                   </svg>
                 </a>
               </div>
             </motion.div>

             {/* 포탈 바로가기 */}
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.3 }}
               viewport={{ once: true }}
               className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-green-200"
             >
               <div className="text-center">
                 <div className="text-5xl mb-4">🔗</div>
                 <h3 className="font-serif text-xl font-bold text-primary mb-4">
                   포탈 바로가기
                 </h3>
                 <p className="text-muted mb-6 leading-relaxed">
                   학생 포털에서 수강신청, 성적조회, 학사일정 등 학생 서비스를 이용하세요.
                 </p>
                 <a 
                   href="https://portal.cau.ac.kr" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-2xl font-medium hover:bg-green-700 transition-colors duration-200 w-full justify-center"
                 >
                   포탈 바로가기
                   <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                   </svg>
                 </a>
               </div>
             </motion.div>
           </div>
         </div>
       </section>
     </>
   )
 }

export default Home
