import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero'
import { useLocale } from '../contexts/LocaleContext'
import {
  loadAbout,
  loadCurriculum,
  loadFaculty,
  loadProjects,
} from '../utils/content'
import type { Curriculum, Faculty, Project } from '../types'

const Home = () => {
  const { t } = useLocale()
  const [about, setAbout] = useState<string>('')
  const [curriculum, setCurriculum] = useState<Curriculum[]>([])
  const [faculty, setFaculty] = useState<Faculty[]>([])
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const loadContent = async () => {
      try {
        const [aboutContent, curriculumData, facultyData, projectsData] =
          await Promise.all([
            loadAbout(),
            loadCurriculum(),
            loadFaculty(),
            loadProjects(),
          ])

        setAbout(aboutContent)
        setCurriculum(curriculumData.slice(0, 3)) // Show first 3
        setFaculty(facultyData.slice(0, 6)) // Show first 6
        setProjects(projectsData.slice(0, 4)) // Show first 4
      } catch (error) {
        console.error('Error loading content:', error)
      }
    }

    loadContent()
  }, [])

  return (
    <>
      <Helmet>
        <title>중앙대학교 영화학과 - Department of Film Studies</title>
        <meta
          name="description"
          content="미래의 영화인들이 시작하는 곳, 중앙대학교 영화학과입니다."
        />
      </Helmet>

      <Hero />

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-8">
              {t('section.about')}
            </h2>
            <div className="prose prose-lg mx-auto text-muted">
              {about ? (
                <div dangerouslySetInnerHTML={{ __html: about }} />
              ) : (
                <p className="text-lg leading-relaxed">
                  중앙대학교 영화학과는 창의적이고 혁신적인 영화 교육을 통해
                  미래의 영화인들을 양성합니다. 실무 중심의 교육과정과 최첨단
                  시설을 통해 학생들이 영화 제작의 모든 과정을 경험할 수 있도록
                  지원합니다.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Curriculum Overview */}
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
              {t('section.curriculum')}
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              체계적이고 실무 중심의 커리큘럼으로 영화 제작의 모든 과정을
              학습합니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {curriculum.map((item, index) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="font-serif text-2xl font-bold text-primary mb-4">
                  {item.title}
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-primary mb-2">
                      핵심 과목
                    </h4>
                    <ul className="text-muted space-y-1">
                      {item.core.map(course => (
                        <li key={course}>{course}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">
                      선택 과목
                    </h4>
                    <ul className="text-muted space-y-1">
                      {item.electives.map(course => (
                        <li key={course}>{course}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Preview */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
              {t('section.faculty')}
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              영화계의 전문가들이 직접 전하는 실무 중심의 교육
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {faculty.map((member, index) => (
              <motion.div
                key={member.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-24 h-24 bg-accent rounded-full mx-auto mb-4"></div>
                <h3 className="font-serif text-xl font-bold text-primary text-center mb-2">
                  {member.title}
                </h3>
                <p className="text-muted text-center mb-4">{member.role}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.focus.map(focus => (
                    <span
                      key={focus}
                      className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full"
                    >
                      {focus}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Preview */}
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
              {t('section.projects')}
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              학생들의 창의적인 영화 작품들을 확인해보세요
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video bg-gray-200"></div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-primary mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted mb-4">
                    {project.type} • {project.year}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
