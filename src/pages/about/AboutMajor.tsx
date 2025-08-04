import React from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLocale } from '../../contexts/LocaleContext'

const AboutMajor = () => {
  const { t } = useLocale()

  const majors = [
    {
      title: '영화전공',
      description: '영화전공 현재 영화전공에서 가장 활발하게 배출되고 있는 영역으로 연출을 비롯하여 촬영, 편집, 조명, 음향, 제작 등 영화제작단계 스텝으로 많은 활동을 하고 있다. 뿐만 아니라 영화 기획, 홍보, 마케팅 등 영화제작 이외에도 영화 산업의 다양한 분야에서도 활동하고 있다. 이외에도 영화정책과 관련된 다양한 분야와 부산영화제를 비롯한 여러 영화제의 프로그래머 분야에서도 전방위적인 활약을 하고 있어 실로 명실상부한 한국 최고의 영화인 산실의 학과라고 할 수 있다.',
      icon: '🎬',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: '연출전공',
      description: '연출전공은 영화를 연출하는 사람을 말한다. 각본의 내용을 조정해 플롯을 정하고 촬영방법 등을 결정하며 편집을 결정하는 등 영화를 만드는 데 있어서 영화의 내용적 부분을 모두 습득한다.',
      icon: '🎭',
      color: 'bg-red-50 border-red-200'
    },
    {
      title: '촬영전공',
      description: '영화를 만들 때 촬영 부분의 모든 것을 지도하고 책임을 지는 사람. 제작 수업에서 촬영을 담당하면서 촬영위주의 수업을 듣는다.',
      icon: '📹',
      color: 'bg-green-50 border-green-200'
    },
    {
      title: '편집전공',
      description: '촬영한 필름이나 디지털 소스를 극의 전개와 순서에 맞게 창조적으로 배열하여 하나의 완성된 영화 작품을 만드는 일을 전담한다',
      icon: '✂️',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      title: '영화제작전공',
      description: '오리지널 스토리를 생각해 내거나 영화의 기본을 이룰 작품을 선별해서 영화를 만들어나가는 사람. 영화제작의 초기부터 완성단계까지 창의적이고 관리능력을 갖추고 있어야 한다. 제작자에는 스튜디오에 속한 제작자와 개인 제작자의 두가지 유형이 있다. 스튜디오 제작자는 영화 원작을 구매하고, 제작비를 지불하며, 필름인화·광고 등의 비용을 지출하는 대리인 역할을 한다. 반면에 개인 제작자는 자신의 돈이나 후원자들의 돈을 투자해 프로젝트를 진행시키며 영화에 대한 옵션을 취해 스튜디오에 팔기도 한다. 그러나 자신의 돈을 투자해 작품을 전개시켜나간 후 스튜디오에 팔 수 없기도 하므로 위험이 뒤따른다.',
      icon: '🎪',
      color: 'bg-yellow-50 border-yellow-200'
    },
    {
      title: '영화마케팅',
      description: '성공하는 영화는 영화의 기획단계부터 관객층의 선호도를 분석하고 시대의 흐름을 파악하기 위한 다양한 마케팅 툴을 동원하는가 하면, 개봉을 앞두고 관객층의 눈과 귀를 사로잡기 위한 기발한 홍보전략들이 동원해야 한다. 또 영화와 관객을 이어주는 가교로써, 영화를 가장 매력적으로 전달할 수 있는 참신한 창의력과 트렌드를 읽어낼 수 있는 감성적인 눈이 있어야 한다. 이를 담당하는 것이 바로 영화 마케팅이다.',
      icon: '📈',
      color: 'bg-pink-50 border-pink-200'
    }
  ]

  return (
    <>
      <Helmet>
        <title>전공소개 - 중앙대학교 공연영상창작학부 영화전공</title>
        <meta
          name="description"
          content="중앙대학교 공연영상창작학부 영화전공 전공소개입니다."
        />
      </Helmet>

      <div className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-8 text-center">
              전공소개
            </h1>

            <div className="prose prose-lg mx-auto mb-16">
              <h2 className="text-center text-2xl font-bold text-primary mb-6">
                한국 최고의 영화인 산실
              </h2>
              <p className="text-center text-lg text-muted leading-relaxed">
                중앙대학교 공연영상창작학부 영화전공은 1960년 설립 이래 한국 영화계를 이끌어온
                최고의 영화 교육기관입니다. 실무 중심의 교육과정과 최첨단
                시설을 통해 학생들이 영화 제작의 모든 과정을 경험할 수 있도록
                지원합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {majors.map((major, index) => (
                <motion.div
                  key={major.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`${major.color} rounded-2xl p-8 border-2 hover:shadow-lg transition-all duration-300 hover:scale-105`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl flex-shrink-0">{major.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-serif text-xl font-bold text-primary mb-4">
                        {major.title}
                      </h3>
                      <p className="text-muted leading-relaxed text-sm">
                        {major.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8">
              <h2 className="font-serif text-2xl font-bold text-primary mb-6 text-center">
                교육 목표
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-3">🎨</div>
                  <h3 className="font-semibold text-primary mb-2">창의성</h3>
                  <p className="text-sm text-muted">독창적인 영화적 사고와 표현력</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">⚡</div>
                  <h3 className="font-semibold text-primary mb-2">실무 능력</h3>
                  <p className="text-sm text-muted">현장에서 즉시 활용 가능한 전문 기술</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">🎭</div>
                  <h3 className="font-semibold text-primary mb-2">예술적 감각</h3>
                  <p className="text-sm text-muted">세련된 미적 감각과 예술적 표현</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default AboutMajor
