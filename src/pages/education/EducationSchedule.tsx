import React from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLocale } from '../../contexts/LocaleContext'

const EducationSchedule = () => {
  const { t } = useLocale()
  
  const scheduleData = [
    {
      month: "2025년 3월",
      events: [
        { day: "1", content: "삼일절(공휴일)", note: "" },
        { day: "2", content: "2025년 1학기 개강", note: "" },
        { day: "2~8", content: "2025년 1학기 수강신청 정정", note: "" },
        { day: "23~29", content: "2025년 1학기 수강과목 취소(4주차)", note: "" }
      ]
    },
    {
      month: "2025년 4월",
      events: [
        { day: "20~26", content: "2025년 1학기 중간시험(8주차)", note: "" }
      ]
    },
    {
      month: "2025년 5월",
      events: [
        { day: "5", content: "어린이날(공휴일)", note: "" },
        { day: "10~14", content: "졸업 논문 제출", note: "" },
        { day: "17~28", content: "2025년 2학기 다전공 신청(복수,융합,연계,자기설계,부전공)", note: "" },
        { day: "19", content: "부처님오신날(공휴일)", note: "" }
      ]
    },
    {
      month: "2025년 6월",
      events: [
        { day: "6", content: "현충일(공휴일)", note: "" },
        { day: "15~21", content: "2025년 1학기 기말시험", note: "" },
        { day: "18~25", content: "2025년 1학기 성적입력", note: "" },
        { day: "22~8.31", content: "2025년 여름방학", note: "" },
        { day: "28~7.1", content: "2025년 1학기 성적조회", note: "" },
        { day: "30~7.1", content: "2025년 1학기 성적정정", note: "" }
      ]
    },
    {
      month: "2025년 7월",
      events: [
        { day: "2", content: "2025년 1학기 성적확정(보관성적이관)/2025년 2학기 전공개방모집희망전공정정", note: "" },
        { day: "5~9", content: "2025년 2학기 재입학 원서 접수", note: "" },
        { day: "26~8.1", content: "2025년 2학기 복학신청", note: "" },
        { day: "26~9.28", content: "2025년 2학기 휴학신청", note: "" }
      ]
    },
    {
      month: "2025년 8월",
      events: [
        { day: "3~5", content: "2025년 2학기 수강신청 장바구니", note: "" },
        { day: "15", content: "광복절(공휴일)", note: "" },
        { day: "17~19", content: "2025년 2학기 수강신청", note: "" },
        { day: "20", content: "2025년 8월 학위수여자 졸업기준일", note: "" },
        { day: "23~27", content: "2025년 2학기 재학생 등록", note: "" }
      ]
    },
    {
      month: "2025년 9월",
      events: [
        { day: "1", content: "2025년 2학기 개시일 / 개강일", note: "" },
        { day: "1~7", content: "2025년 2학기 수강신청 정정", note: "" },
        { day: "20~22", content: "추석(공휴일)", note: "" },
        { day: "22~28", content: "2025년 2학기 수강과목 취소(4주차)", note: "" },
        { day: "22~10.5", content: "2025년 2학기 강의 Feedback 실시", note: "" }
      ]
    },
    {
      month: "2025년 10월",
      events: [
        { day: "3", content: "개천절(공휴일)", note: "" },
        { day: "9", content: "한글날(공휴일)", note: "" },
        { day: "11", content: "개교 107주년", note: "" },
        { day: "20~26", content: "2025년 2학기 중간시험(8주차)", note: "" }
      ]
    },
    {
      month: "2025년 11월",
      events: [
        { day: "8~12", content: "졸업논문 제출", note: "" },
        { day: "15~26", content: "2026년 1학기 다전공 신청(복수,융합,연계,자기설계,부전공)", note: "" }
      ]
    },
    {
      month: "2025년 12월",
      events: [
        { day: "1~7", content: "2026년 1학기 전공개방모집희망전공신청", note: "" },
        { day: "1~28", content: "2025년 2학기 강의평가 실시", note: "" },
        { day: "15~21", content: "2025년 2학기 기말시험(16주차)", note: "" },
        { day: "20~28", content: "2025년 2학기 성적입력", note: "" },
        { day: "22~2026.2.28", content: "겨울방학", note: "" },
        { day: "25", content: "성탄절(공휴일)", note: "" },
        { day: "29~2026.1.3", content: "2025년 2학기 성적조회", note: "" },
        { day: "31~2026.1.3", content: "2025년 2학기 성적정정", note: "" }
      ]
    },
    {
      month: "2026년 1월",
      events: [
        { day: "1", content: "신정(공휴일)", note: "" },
        { day: "3~7", content: "2026년 1학기 재입학 원서접수", note: "" },
        { day: "10~12", content: "2026년 전과(부) 원서접수", note: "" },
        { day: "20~27", content: "2026년 1학기 복학신청", note: "" },
        { day: "20~3.29", content: "2026년 1학기 휴학신청", note: "" },
        { day: "31~2.2", content: "설날(공휴일)", note: "" },
        { day: "2025.12.29~2026.1.3", content: "2025년 2학기 성적조회", note: "" },
        { day: "2025.12.31~2026.1.3", content: "2025년 2학기 성적정정", note: "" }
      ]
    },
    {
      month: "2026년 2월",
      events: [
        { day: "8~10", content: "2026년 1학기 수강신청 장바구니 담기", note: "" },
        { day: "14~18", content: "2026년 2월 학위수여식", note: "" },
        { day: "15~17", content: "2026년 1학기 수강신청", note: "" },
        { day: "21~25", content: "2026년 1학기 재학생 등록", note: "" },
        { day: "24~25", content: "2026학년도 신편입학생 수강신청기간", note: "" },
        { day: "2025.12.22~2026.2.28", content: "겨울방학", note: "" }
      ]
    }
  ]

  return (
    <>
      <Helmet>
        <title>학사일정 - 중앙대학교 공연영상창작학부 영화전공</title>
        <meta
          name="description"
          content="중앙대학교 공연영상창작학부 영화전공의 학사일정을 안내합니다."
        />
      </Helmet>
      <div className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-indigo-700 mb-12 text-center">
              {t("nav.education.schedule")}
            </h1>
            
            <div className="space-y-8">
              {scheduleData.map((monthData, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="bg-indigo-600 text-white px-6 py-4">
                    <h2 className="text-xl font-bold">{monthData.month}</h2>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            일
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            학사내용
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            비고
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {monthData.events.map((event, eventIndex) => (
                          <tr key={eventIndex} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {event.day}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {event.content}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {event.note}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default EducationSchedule
