import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useLocale } from "../../contexts/LocaleContext";

/* -------------------------------------------------------------------------- */
/*                               CURRICULUM DATA                              */
/* -------------------------------------------------------------------------- */
/**
 * category  : 전공기초 | 전공
 * year      : 1 - 4
 * firstSemester / secondSemester : { course, credit, hours } | null
 */
const curriculumData = [
  /* ------------------------------ 전공기초 ------------------------------ */
  {
    category: "전공기초",
    year: 1,
    rows: [
      {
        firstSemester: { course: "극장실습(1)", credit: 1, hours: 2 },
        secondSemester: { course: "극장실습(2)", credit: 1, hours: 2 },
      },
      {
        firstSemester: { course: "연극뮤지컬개론", credit: 2, hours: 3 },
        secondSemester: { course: "공연텍스트 분석", credit: 3, hours: 3 },
      },
      {
        firstSemester: { course: "연기1 - Storytelling", credit: 2, hours: 4 },
        secondSemester: null,
      },
    ],
  },
  {
    category: "전공기초",
    year: 2,
    rows: [
      {
        firstSemester: { course: "세계연극사", credit: 2, hours: 2 },
        secondSemester: null,
      },
    ],
  },

  /* -------------------------------- 전공 -------------------------------- */
  /* year 1 */
  {
    category: "전공",
    year: 1,
    rows: [
      {
        firstSemester: { course: "소리1-호흡과 발성", credit: 2, hours: 4 },
        secondSemester: { course: "뮤지컬실습2 - 초급가창", credit: 2, hours: 4 },
      },
      {
        firstSemester: { course: "공연기획기초", credit: 2, hours: 3 },
        secondSemester: { course: "뮤지컬실습2 - 초급가창", credit: 2, hours: 4 },
      },
      {
        firstSemester: { course: "소리1 - 호흡과 발성", credit: 2, hours: 4 },
        secondSemester: { course: "소리2 - 발음과 전달", credit: 2, hours: 4 },
      },
      {
        firstSemester: { course: "뮤지컬실습1 - 뮤지컬 기초", credit: 2, hours: 3 },
        secondSemester: { course: "연기2 - 5W Questions", credit: 2, hours: 4 },
      },
      {
        firstSemester: { course: "공연기획실무", credit: 2, hours: 3 },
        secondSemester: null,
      },
      {
        firstSemester: { course: "무대실습", credit: 2, hours: 4 },
        secondSemester: null,
      },
    ],
  },
  /* year 2 */
  {
    category: "전공",
    year: 2,
    rows: [
      {
        firstSemester: { course: "뮤지컬실습3 - 뮤지컬 안무", credit: 2, hours: 4 },
        secondSemester: { course: "뮤지컬실습4 - 중급가창", credit: 2, hours: 4 },
      },
      {
        firstSemester: { course: "연출법2", credit: 2, hours: 4 },
        secondSemester: { course: "아시아 연극연구", credit: 3, hours: 3 },
      },
      {
        firstSemester: { course: "연기3 - Stanislavsky System", credit: 2, hours: 4 },
        secondSemester: { course: "연기4 - Song Acting", credit: 2, hours: 3 },
      },
      {
        firstSemester: { course: "글로벌 크리에이터 워크숍", credit: 2, hours: 4 },
        secondSemester: { course: "프로젝트개발실습", credit: 2, hours: 4 },
      },
      {
        firstSemester: { course: "움직임(1)", credit: 2, hours: 3 },
        secondSemester: { course: "움직임(2)", credit: 2, hours: 4 },
      },
      {
        firstSemester: { course: "단막극실습", credit: 3, hours: 6 },
        secondSemester: { course: "장막극실습", credit: 3, hours: 6 },
      },
      {
        firstSemester: { course: "연출법3", credit: 2, hours: 4 },
        secondSemester: null,
      },
    ],
  },
  /* year 3 */
  {
    category: "전공",
    year: 3,
    rows: [
      {
        firstSemester: { course: "공연제작실습(1)", credit: 4, hours: 8 },
        secondSemester: { course: "공연제작실습(2)", credit: 4, hours: 8 },
      },
      {
        firstSemester: { course: "공연텍스트창작", credit: 2, hours: 4 },
        secondSemester: { course: "공연분석과 평론", credit: 3, hours: 3 },
      },
      {
        firstSemester: { course: "20세기 연극과 동시대연극", credit: 3, hours: 3 },
        secondSemester: { course: "실험극연출워크숍", credit: 3, hours: 4 },
      },
      {
        firstSemester: { course: "뮤지컬실습5 - 뮤지컬장면실습", credit: 2, hours: 3 },
        secondSemester: { course: "뮤지컬실습6 - 고급가창", credit: 2, hours: 4 },
      },
      {
        firstSemester: { course: "공연양식과 연출방법론", credit: 3, hours: 4 },
        secondSemester: { course: "콘텐츠창작워크숍", credit: 2, hours: 3 },
      },
      {
        firstSemester: { course: "콘텐츠개발과 무대형상화", credit: 3, hours: 4 },
        secondSemester: { course: "연기6 - Mask Acting", credit: 2, hours: 4 },
      },
      {
        firstSemester: { course: "연기5 - Style Acting", credit: 2, hours: 4 },
        secondSemester: { course: "움직임(4)", credit: 2, hours: 4 },
      },
      {
        firstSemester: { course: "움직임(3)", credit: 2, hours: 3 },
        secondSemester: null,
      },
    ],
  },
  /* year 4 */
  {
    category: "전공",
    year: 4,
    rows: [
      {
        firstSemester: { course: "공연제작실습(3)", credit: 4, hours: 8 },
        secondSemester: { course: "공연제작실습(4)", credit: 4, hours: 8 },
      },
      {
        firstSemester: { course: "공연트렌드와 관객개발", credit: 2, hours: 3 },
        secondSemester: { course: "연출세미나(2)", credit: 3, hours: 4 },
      },
      {
        firstSemester: { course: "연출세미나(1)", credit: 3, hours: 4 },
        secondSemester: { course: "연출세미나(4)", credit: 3, hours: 4 },
      },
      {
        firstSemester: { course: "연출세미나(3)", credit: 3, hours: 4 },
        secondSemester: { course: "연기7 - Acting for Camera (2)", credit: 3, hours: 6 },
      },
      {
        firstSemester: { course: "연기7 - Acting for Camera (1)", credit: 3, hours: 6 },
        secondSemester: { course: "졸업공연프랙티컴", credit: 2, hours: 3 },
      },
      {
        firstSemester: { course: "오디션(1)", credit: 1, hours: 2 },
        secondSemester: { course: "오디션(2)", credit: 1, hours: 2 },
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                               PRESENTATION                                 */
/* -------------------------------------------------------------------------- */
const Badge = ({ children }) => (
  <span className="inline-flex items-center rounded-full bg-indigo-100 text-indigo-800 px-2 py-0.5 text-xs font-medium">
    {children}
  </span>
);

const EducationCurriculum = () => {
  const { t } = useLocale();
  let globalRowIndex = 0;

  return (
    <>
      <Helmet>
        <title>교과과정 - 중앙대학교 공연영상창작학부 공연전공</title>
        <meta
          name="description"
          content="중앙대학교 공연영상창작학부 공연전공 교과과정 전체 목록"
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
              {t("nav.education.curriculum")}
            </h1>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse shadow-2xl rounded-3xl overflow-hidden text-sm md:text-base">
                {/* ----------------------------- THEAD ----------------------------- */}
                <thead>
                  <tr className="bg-indigo-600 text-white text-center">
                    <th rowSpan={2} className="px-4 py-3 font-semibold whitespace-nowrap">
                      구분
                    </th>
                    <th rowSpan={2} className="px-4 py-3 font-semibold whitespace-nowrap">
                      학년
                    </th>
                    <th colSpan={3} className="px-4 py-3 font-semibold whitespace-nowrap">
                      1학기
                    </th>
                    <th colSpan={3} className="px-4 py-3 font-semibold whitespace-nowrap">
                      2학기
                    </th>
                  </tr>
                  <tr className="bg-indigo-700 text-white text-center">
                    {[
                      "교과목",
                      "학점",
                      "시간",
                      "교과목",
                      "학점",
                      "시간",
                    ].map((h) => (
                      <th key={h} className="px-4 py-2 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* ----------------------------- TBODY ----------------------------- */}
                <tbody className="divide-y divide-gray-200">
                  {curriculumData.map((group, gIdx) =>
                    group.rows.map((row, rIdx) => {
                      globalRowIndex += 1;
                      const stripe = globalRowIndex % 2 === 0 ? "bg-gray-50" : "bg-white";

                      return (
                        <tr
                          key={`${gIdx}-${rIdx}`}
                          className={`${stripe} hover:bg-indigo-50 transition-colors text-center`}
                        >
                          {/* category & year rowspan 처리 */}
                          {rIdx === 0 && (
                            <>
                              <td
                                rowSpan={group.rows.length}
                                className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap bg-inherit"
                              >
                                {group.category}
                              </td>
                              <td
                                rowSpan={group.rows.length}
                                className="px-4 py-2 whitespace-nowrap bg-inherit"
                              >
                                {group.year}
                              </td>
                            </>
                          )}

                          {/* 1학기 */}
                          <td className="px-4 py-2 text-left">
                            {row.firstSemester?.course || "-"}
                          </td>
                          <td className="px-4 py-2 text-right font-mono tabular-nums">
                            {row.firstSemester ? <Badge>{row.firstSemester.credit}학점</Badge> : "-"}
                          </td>
                          <td className="px-4 py-2 text-right font-mono tabular-nums">
                            {row.firstSemester ? <Badge>{row.firstSemester.hours}시간</Badge> : "-"}
                          </td>

                          {/* 2학기 */}
                          <td className="px-4 py-2 text-left">
                            {row.secondSemester?.course || "-"}
                          </td>
                          <td className="px-4 py-2 text-right font-mono tabular-nums">
                            {row.secondSemester ? <Badge>{row.secondSemester.credit}학점</Badge> : "-"}
                          </td>
                          <td className="px-4 py-2 text-right font-mono tabular-nums">
                            {row.secondSemester ? <Badge>{row.secondSemester.hours}시간</Badge> : "-"}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default EducationCurriculum;
