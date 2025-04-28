import App from "@/app/App";
import {
  CalendarDdayList,
  CalendarNewSchedule,
  CalendarRoot,
  CalendarScheduleDetail,
  Home,
  Login,
  MyPage,
  Birthday,
  FirstMeet,
  Nickname,
  MilitaryDay,
  CoupleContact,
  Alarm,
  LetterListPage,
} from "@/pages";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <App />, // 공통 레이아웃
    children: [
      { index: true, element: <Home /> }, // 메인 홈 화면
      { path: "calendar", element: <CalendarRoot /> }, // 캘린더 메인 화면
      { path: "calendar/schedule", element: <CalendarNewSchedule /> }, // 일정 생성 페이지
      { path: "calendar/schedule/:scheduleId", element: <CalendarScheduleDetail /> }, // 특정 일정 상세 페이지 (동적 라우팅)
      { path: "calendar/dday", element: <CalendarDdayList /> }, //D-Day 일정 리스트 페이지
      { path: "calendar/letter", element: <LetterListPage /> }, //편지 리스트 페이지
      { path: "calendar/letter/:letter", element: <LetterListPage /> }, //편지 상세 보기 페이지
      { path: "mypage", element: <MyPage /> }, // 마이페이지
      {
        path: "/onboarding",
        children: [
          { path: "firstmeet", element: <FirstMeet /> },
          { path: "military-day", element: <MilitaryDay /> },
          { path: "couple-contact", element: <CoupleContact /> },
          { path: "nickname", element: <Nickname /> },
          { path: "birthday", element: <Birthday /> },
          { path: "alarm", element: <Alarm /> },
        ],
      },
    ],
  },
]);

export default router;
