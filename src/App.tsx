import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { LocaleProvider } from './contexts/LocaleContext'
import { config, checkAdminAccess, isLoginBlocked } from './utils/config'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

// Faculty pages
import FacultyList from './pages/FacultyList'
import FacultyDetail from './pages/FacultyDetail'

// About pages
import AboutMajor from './pages/about/AboutMajor'
import AboutHistory from './pages/about/AboutHistory'
import AboutInternational from './pages/about/AboutInternational'
import AboutFaculty from './pages/about/AboutFaculty'
import AboutCampus from './pages/about/AboutCampus'
import AboutAlumni from './pages/about/AboutAlumni'

// Education pages
import EducationGoals from './pages/education/EducationGoals'
import EducationCurriculum from './pages/education/EducationCurriculum'
import EducationSchedule from './pages/education/EducationSchedule'

// Admissions pages
import AdmissionsGuide from './pages/admissions/AdmissionsGuide'

// Community pages
import CommunityFAQ from './pages/community/CommunityFAQ'
import CommunityBoard from './pages/community/CommunityBoard'
import NoticeDetail from './pages/NoticeDetail'

// CMS pages
import AdminPage from './cms/admin'

// 관리자 페이지 접근 제어를 위한 컴포넌트
const ProtectedAdminRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 로그인 차단 확인
        if (isLoginBlocked()) {
          setIsAuthenticated(false)
          setIsLoading(false)
          return
        }

        // 관리자 접근 권한 확인
        if (checkAdminAccess()) {
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/404" replace />
  }

  return <AdminPage />
}

function App() {
  return (
    <LocaleProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Faculty routes */}
            <Route path="/faculty" element={<FacultyList />} />
            <Route path="/faculty/:slug" element={<FacultyDetail />} />
            <Route path="/about/faculty/:slug" element={<FacultyDetail />} />

            {/* About routes */}
            <Route path="/about/major" element={<AboutMajor />} />
            <Route path="/about/history" element={<AboutHistory />} />
            <Route
              path="/about/international"
              element={<AboutInternational />}
            />
            <Route path="/about/faculty" element={<AboutFaculty />} />
            <Route path="/about/campus" element={<AboutCampus />} />
            <Route path="/about/alumni" element={<AboutAlumni />} />

            {/* Education routes */}
            <Route path="/education/goals" element={<EducationGoals />} />
            <Route
              path="/education/curriculum"
              element={<EducationCurriculum />}
            />
            <Route path="/education/schedule" element={<EducationSchedule />} />

            {/* Admissions routes */}
            <Route path="/admissions/guide" element={<AdmissionsGuide />} />

            {/* Community routes */}
            <Route
              path="/community/notice"
              element={<Navigate to="/community/board" replace />}
            />
            <Route path="/community/faq" element={<CommunityFAQ />} />
            <Route path="/community/board" element={<CommunityBoard />} />
            <Route path="/notices/:slug" element={<NoticeDetail />} />

            {/* CMS routes - 동적 경로 설정 */}
            <Route
              path={`/${config.adminPath}`}
              element={<ProtectedAdminRoute />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </LocaleProvider>
  )
}

export default App
