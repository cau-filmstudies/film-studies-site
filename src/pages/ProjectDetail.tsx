import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLocale } from '../contexts/LocaleContext'

const ProjectDetail = () => {
  const { slug } = useParams()
  const { t } = useLocale()

  // 실제로는 slug를 사용해서 해당 프로젝트 정보를 로드해야 합니다
  const project = {
    title: "미드나잇 플랫폼",
    year: 2025,
    type: "단편영화",
    thumbnail: "/images/projects/midnight.jpg",
    videoUrl: "https://www.youtube.com/embed/xxxx",
    credits: {
      director: "학생 A",
      cinematography: "학생 B"
    },
    tags: ["스릴러", "촬영기법"],
    content: "한 지하철 플랫폼에서 벌어지는 미스터리한 이야기를 다룬 단편영화입니다."
  }

  return (
    <>
      <Helmet>
        <title>{project.title} - 중앙대학교 영화학과</title>
        <meta name="description" content={`${project.title} 프로젝트를 확인해보세요.`} />
      </Helmet>

      <div className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <Link to="/projects" className="text-accent hover:text-accent/80 mb-8 inline-block">
              ← {t('common.back')}
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h1 className="font-serif text-4xl font-bold text-primary mb-4">
                  {project.title}
                </h1>
                <p className="text-muted mb-6">
                  {project.type} • {project.year}
                </p>
                
                <div className="mb-8">
                  <h2 className="font-serif text-2xl font-bold text-primary mb-4">
                    제작진
                  </h2>
                  <div className="space-y-2">
                    <p className="text-muted">
                      <strong>감독:</strong> {project.credits.director}
                    </p>
                    <p className="text-muted">
                      <strong>촬영:</strong> {project.credits.cinematography}
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="font-serif text-2xl font-bold text-primary mb-4">
                    태그
                  </h2>
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

                <div>
                  <h2 className="font-serif text-2xl font-bold text-primary mb-4">
                    시놉시스
                  </h2>
                  <p className="text-muted leading-relaxed">
                    {project.content}
                  </p>
                </div>
              </div>

              <div>
                <div className="aspect-video bg-gray-200 rounded-2xl mb-6">
                  {project.videoUrl && (
                    <iframe
                      src={project.videoUrl}
                      title={project.title}
                      className="w-full h-full rounded-2xl"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default ProjectDetail 