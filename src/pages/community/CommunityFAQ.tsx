import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLocale } from '../../contexts/LocaleContext'

interface FAQItem {
  id: number
  question: string
  answer: string
  attachments?: Array<{
    name: string
    url: string
    type: string
    size: string
  }>
}

const CommunityFAQ = () => {
  const { t } = useLocale()
  const [openItem, setOpenItem] = useState<number | null>(null)

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: '재수강을 했지만 F학점을 받았습니다. 3수강은 어떻게 하나요?',
      answer: '3수강에 대해서는 원칙상 "불가"합니다. 하지만 불가피한 졸업 필수 과목에 한하여 허가를 받을 수 있습니다.\n\n3수강 신청을 할 때에는 먼저 해당 필수과목에 대한 교양대학이나 학과에 문의합니다. 다음으로 아래 붙임 파일에 있는 "강제 수강신청요청서"를 작성, 자필서명하여 자신의 소속 학과에 제출합니다. 추후 학생이 직접 수강신청이 되었는지 확인합니다.\n\n※3수강 이후에도 이수하지 못하는 경우에는 더 이상 수강이 불가능합니다.\n※재수강까지 받았던 F학점은 성적기록에 남아있으며 삭제되지 않습니다.',
      attachments: [
        {
          name: '강제수강신청_요청서.hwp',
          url: '/documents/강제수강신청_요청서.hwp',
          type: 'hwp',
          size: '14KB'
        }
      ]
    },
    {
      id: 2,
      question: '수강과목 정정은 어떻게 하나요?',
      answer: '수강과목 정정은 수강신청시스템에 접속하여 기간 내에 과목을 선택하여 정정합니다. 수강정정 및 수강취소의 기회를 놓쳐 성적이 F(Fail)처리가 되더라도 수강취소 및 성적정정은 일체 허용하지 않습니다. 따라서 장학금 지급대상에서도 제외됩니다.\n\n규정을 위반한 수강신청의 경우 대학에서 부분삭제 또는 임의 정정할 수 있습니다. 또한 학점등록자 및 시간제등록자는 수강과목을 정정할 수 없습니다.\n\n수강여석 조정에 있어서 저희 학과는 졸업관련 필수 과목인 경우, 졸업학점에 직접적 타격이 있는 경우에 한하여, 수강정정 기간 일주일 전(일정에 따라 달라질 수 있음)부터 해당 학생들의 수강여석신청서를 받고 있습니다. 수정된 수강여석은 수강정정기간 동안 정해진 시간에 일괄적으로 열리며, 해당 시간에 학생이 직접 포탈에 접속하여 꼭 신청해야 합니다.\n\n수강정정 기간에 신청하지 못한 수강여석 조정은 불가능합니다.',
      attachments: [
        {
          name: '전공과목_여석_신청서.hwp',
          url: '/documents/전공과목_여석_신청서.hwp',
          type: 'hwp',
          size: '12KB'
        }
      ]
    },
    {
      id: 3,
      question: '학점등록은 어떻게 하나요?',
      answer: '학점등록은 총 7차 학기 이수 후 졸업에 필요한 학점이 9학점 이내로 부족하고, 전체성적 열람용 평균 평점이 4.00이상인 학생, 또는 총 8학기 이상 이수하였고 수강신청 학점이 9학점 이내인 학생이 신청할 수 있습니다.\n\n학점등록은 정해진 기간 내 수강신청을 한 후 학과사무실에 학점등록신청서를 제출, 학과장님의 서명을 받고 예술대학 교학지원팀에 학점등록을 신청합니다. 학점등록을 해야하는 경우 학과조교와 상의 후 진행합니다.\n\n학점등록 대상자는 봉사활동, 산학협동인턴십수업 등으로 학점등록 대체는 허가하지 않습니다. 또한 학점등록 허가자는 휴학을 신청할 수 없습니다. 다만, 학칙 제 23조 2항에 해당하는 경우 학점등록을 취소하며 이미 납부한 등록금은 반환합니다. 학점등록 허가자는 수강신청 정정 및 수강과목 취소를 할 수 없습니다. 2006학년도 이전에 하향 전과(부)한 자는 학점등록을 허가하지 않습니다.',
      attachments: [
        {
          name: '학점등록신청서.hwp',
          url: '/documents/학점등록신청서.hwp',
          type: 'hwp',
          size: '16KB'
        }
      ]
    },
    {
      id: 4,
      question: '재입학은 어떻게 하나요?',
      answer: '재입학은 제적된 자가 입학정원에 결원이 있는 경우 학교 측에 재입학 허가를 신청할 수 있습니다. 1학기의 경우 1월 중, 2학기의 경우 7월 중 학사일정에 정해진 기간 내에 신청할 수 있습니다.\n\n일반 재입학은 학사경고 및 자퇴 후 1년이 경과된 자가 신청할 수 있습니다. 다만, 미등록 제적자나 휴학 기간 경과 후 복학하지 아니한 자(미복학 제적자)는 한 학기이후에도 재입학 신청이 가능합니다. 또, 퇴학자에게는 재입학을 허가하지 아니합니다. (타 대학교에 입학 또는 편입학한 자, 학사겨고 제적 1년 경과 후 재입학한 자로서 재입학 후 재입학 당해 학기성적이 1.75미만 인 자 또는 학사경고 제적자는 퇴학 처분함)\n\n재입학은 3회까지 허가할 수 있으나 학사경고제적자의 재입학은 1회에 한하여 허가하고, 재입학은 제적 당시 학년, 학기로 허가합니다.\n\n학사일정에 정해진 기간 내에 소속대학 교학지원팀에 재입학을 신청한 후 대학장은 재입학 신청자의 적격 여부를 심사하여 재입학 허가를 총장에게 제청합니다.(자세한 사항은 학사운영규정 제64조 참조)',
      attachments: [
        {
          name: '재입학원서.hwp',
          url: '/documents/재입학원서.hwp',
          type: 'hwp',
          size: '15KB'
        }
      ]
    },
    {
      id: 5,
      question: '휴학/복학은 언제 어떻게 하나요?',
      answer: '가-일반/연장휴학은 매 학기 개강일로부터 4주전, 개강 후로부터 4주 이내에 신청가능하며 포탈에 로그인 후 학사마당(학적변동신청)메뉴에서 신청하시면 됩니다.\n\n휴학의 종류에는 일반휴학(질병휴학 포함), 특별휴학(군입대휴학, 유급휴학, 창업휴학, 육아휴학, 학사경고휴학)이 있습니다. 군입대/질병휴학/육아휴학/창업휴학의 경우, 학생 본인이 휴학신청서를 작성하고 첨부서류(질병휴학: 종합병원에서 발행한 4주 이상의 진단서/ 군입대휴학: 입영통지서 또는 복무확인서/ 육아휴학: 병원 진단서(임신, 출산), 가족관계증명서(만 8세 이하 자녀 육아)/ 창업휴학: 사업자등록증 또는 법인등기부등본, 사업계획서, 현장점검신청서, 기타 심의에 필요한 자료 등)를 준비하여 교학지원팀에 신청하시면 됩니다. 특별휴학의 경우 자세한 내용은 학과 조교와 상의하시길 바랍니다.\n\n※유의사항※\n1. 일반휴학중인 자가 병역관계로 인해 입대휴학으로 변경하고자 할 때에는 일반휴학기간 만료 전에 입영통지서를 첨부하여 군입대휴학신청서를 소속 대학 교학지원팀에 제출하여야 함. (군입대휴학 절차를 진행하지 않을 경우에는 휴학만료 제적처리 됨)\n2. 조기전역한 자와 만기전역자는 전역일로부터 1년 이내의 복학기간내에 복학하여야 한다.\n3. 군입대휴학자 중 입영취소, 연기 또는 입대 후 귀향 조치된 자는 사유발생일로부터 7일 이내 소속대학 교학지원팀에 신고 후 필요한 조치를 취하여야 한다.\n4. 휴학기간이 만료되어 기간을 연장하고자 하는 학생은 기간내에 연장휴학을 신청하여야 한다. 다만, 휴학 기간이 남아있는 상태에서 연장휴학 신청은 하지 말아야 한다.\n\n나-복학의 종류에는 일반복학과 군제대복학이 있습니다. 일반/군제대복학은 매학기 개강 전 4주차에 신청할 수 있습니다. 일반휴학의 경우 일반휴학기간 만료이전 학사일정에 정해진 기간내에 포탈에 로그인 후 학사마당(학적변동신청)메뉴에서 신청하시면 됩니다.\n\n군제대복학은 입대신고를 필한 후 입대했던 자가 군복무를 마친 날로부터 1년을 경과하지 않는 경우에 한하며 병적 사항이 기재된 증명서(전역증 또는 주민등록초본 등)를 학사일정으로 정해진 기간내에 소속대학 교학지원팀에 제출하여하 합니다.',
      attachments: [
        {
          name: '제대복학신청서.hwp',
          url: '/documents/제대복학신청서.hwp',
          type: 'hwp',
          size: '15KB'
        },
        {
          name: '군입대신청서.hwp',
          url: '/documents/군입대신청서.hwp',
          type: 'hwp',
          size: '15KB'
        },
        {
          name: '일반휴학원서.hwp',
          url: '/documents/일반휴학원서.hwp',
          type: 'hwp',
          size: '16KB'
        }
      ]
    },
    {
      id: 6,
      question: '복수전공 도중 이수포기는 어떻게 하나요?',
      answer: '복수전공의 이수를 중도 포기하고자 하는 자는 복수전공취소신청서를 주전공대학 교학지원팀으로 제출해야합니다. 복수전공을 포기한 경우 그동안 이수한 복수전공 학점은 자유선택 학점으로 인정합니다.\n\n다만, 허가를 받은 경우 부, 연계, 융합, 설계전공 학점으로 인정할 수 있습니다. 그리고 복수전공은 합격을 기준으로 2회까지 신청가능(불합격시 횟수 산정 안됨)하며 2회 합격시 취소를 하더라도 추가적인 선창이 불가능합니다.',
      attachments: [
        {
          name: '복수부연계학생설계전공취소신청서.hwp',
          url: '/documents/복수부연계학생설계전공취소신청서.hwp',
          type: 'hwp',
          size: '14KB'
        }
      ]
    },
    {
      id: 7,
      question: '이수구분변경신청은 어떻게 하나요?',
      answer: '수강을 했던 교과목의 이수구분을 변경하고자 한다면, 이수구분변경신청서를 작성하셔서 학과사무실에 직접 제출하시고 학과장님의 서명을 받은 후 필요한 서류와 함께 예술대학교 교학지원팀에 제출하셔야 합니다. 관련 문서 작성 후, 학과 조교와 상의하시길 바랍니다.',
      attachments: [
        {
          name: '이수구분신청서.hwp',
          url: '/documents/이수구분신청서.hwp',
          type: 'hwp',
          size: '13KB'
        }
      ]
    }
  ]

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id)
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return '📄'
      case 'zip':
        return '📦'
      case 'hwp':
        return '📝'
      default:
        return '📎'
    }
  }

  return (
    <>
      <Helmet>
        <title>자주묻는질문 - 중앙대학교 공연영상창작학부 영화전공</title>
        <meta
          name="description"
          content="중앙대학교 공연영상창작학부 영화전공 자주묻는질문입니다."
        />
      </Helmet>
      <div className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-8 text-center">
              자주묻는질문
            </h1>
            <p className="text-lg text-muted text-center mb-12">
              자주 묻는 질문들을 확인해보세요. 더 자세한 정보가 필요하시면 첨부파일을 다운로드하세요.
            </p>

            <div className="space-y-4">
              {faqData.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: item.id * 0.1 }}
                  className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300"
                >
                  {/* Question Header */}
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl text-primary">❓</div>
                      <h3 className="font-serif text-lg font-semibold text-primary">
                        {item.question}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-3">
                      {item.attachments && item.attachments.length > 0 && (
                        <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                          첨부파일 {item.attachments.length}개
                        </span>
                      )}
                      <motion.div
                        animate={{ rotate: openItem === item.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-primary"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </div>
                  </button>

                  {/* Answer Content */}
                  <AnimatePresence>
                    {openItem === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className="flex items-start space-x-4">
                            <div className="text-2xl text-green-600 mt-1">💡</div>
                            <div className="flex-1">
                                                             <p className="text-muted leading-relaxed mb-4 whitespace-pre-line">
                                 {item.answer}
                               </p>
                              
                              {/* Attachments */}
                              {item.attachments && item.attachments.length > 0 && (
                                <div className="mt-6 pt-4 border-t border-gray-200">
                                  <h4 className="text-sm font-medium text-muted mb-3 flex items-center">
                                    <span className="mr-2">📎</span>
                                    첨부파일
                                  </h4>
                                  <div className="space-y-2">
                                    {item.attachments.map((file, index) => (
                                      <a
                                        key={index}
                                        href={file.url}
                                        download
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
                                      >
                                        <div className="flex items-center space-x-3">
                                          <span className="text-lg">{getFileIcon(file.type)}</span>
                                          <div>
                                            <p className="text-sm font-medium text-primary group-hover:text-primary-dark">
                                              {file.name}
                                            </p>
                                            <p className="text-xs text-muted">
                                              {file.size}
                                            </p>
                                          </div>
                                        </div>
                                        <svg className="w-4 h-4 text-muted group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl text-center"
            >
              <h3 className="font-serif text-xl font-bold text-primary mb-3">
                더 궁금한 점이 있으신가요?
              </h3>
              <p className="text-muted mb-4">
                위의 FAQ에서 답변을 찾지 못하셨다면, 언제든지 문의해주세요.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center space-x-2">
                  <span className="text-accent">📧</span>
                  <span className="text-sm text-muted">이메일: film@cau.ac.kr</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-accent">📞</span>
                  <span className="text-sm text-muted">전화: 02-820-5799</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default CommunityFAQ
