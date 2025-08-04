import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { LocaleProvider } from './contexts/LocaleContext'
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
import AdmissionsRequirements from './pages/admissions/AdmissionsRequirements'

// Community pages
import CommunityGallery from './pages/community/CommunityGallery'
import CommunityFAQ from './pages/community/CommunityFAQ'
import CommunityResources from './pages/community/CommunityResources'
import CommunityBoard from './pages/community/CommunityBoard'

// CMS pages
import AdminPage from './cms/admin'

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
            <Route
              path="/admissions/requirements"
              element={<AdmissionsRequirements />}
            />

            {/* Community routes */}
            <Route
              path="/community/notice"
              element={<Navigate to="/community/board" replace />}
            />
            <Route path="/community/gallery" element={<CommunityGallery />} />
            <Route path="/community/faq" element={<CommunityFAQ />} />
            <Route
              path="/community/resources"
              element={<CommunityResources />}
            />
            <Route path="/community/board" element={<CommunityBoard />} />

            {/* CMS routes */}
            <Route path="/admin" element={<AdminPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </LocaleProvider>
  )
}

export default App
