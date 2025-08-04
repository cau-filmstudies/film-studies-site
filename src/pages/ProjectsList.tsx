import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLocale } from '../contexts/LocaleContext'
import { loadProjects } from '../utils/content'
import type { Project } from '../types'

const ProjectsList = () => {
  const { t } = useLocale()
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const loadProjectsData = async () => {
      try {
        const projectsData = await loadProjects()
        setProjects(projectsData)
      } catch (error) {
        console.error('Error loading projects:', error)
      }
    }

    loadProjectsData()
  }, [])

  return (
    <>
      <Helmet>
        <title>학생 프로젝트 - 중앙대학교 공연영상창작학부 영화전공</title>
        <meta name="description" content="중앙대학교 공연영상창작학부 영화전공 학생들의 창의적인 영화 작품들을 확인해보세요." />
      </Helmet>

      <div className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
              {t('section.projects')}
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              학생들의 창의적인 영화 작품들을 확인해보세요
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video bg-gray-200"></div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-primary mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted mb-4">{project.type} • {project.year}</p>
                  <div className="mb-4">
                    <p className="text-sm text-muted">
                      <strong>감독:</strong> {project.credits.director}
                    </p>
                    <p className="text-sm text-muted">
                      <strong>촬영:</strong> {project.credits.cinematography}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
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
      </div>
    </>
  )
}

export default ProjectsList 