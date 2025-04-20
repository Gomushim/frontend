import App from "@/App";
import {
  CalendarDdayList,
  CalendarNewSchedule,
  CalendarRoot,
  CalendarScheduleDetail,
  Home,
  Login,
  MyPage,
  Onboarding,
  ProtectedLayout,
} from "@/pages";
import { createBrowserRouter } from "react-router";
import { FirstMeet } from "@/pages/onboarding";
import { MilitaryDay } from "@/pages/onboarding";
import { CoupleContact } from "@/pages/mainPage/CoupleContact/CoupleContact";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> }, // 로그인 페이지
  { path: "/onboarding", element: <Onboarding /> }, // 온보딩(회원가입) 페이지
  {
    path: "/",
    children: [
      {
        path: "",
        element: <FirstMeet />, // 공통 레이아웃
        children: [
          { index: true, element: <Home /> }, // 메인 홈 화면
          { path: "calendar", element: <CalendarRoot /> }, // 캘린더 메인 화면
          { path: "mypage", element: <MyPage /> }, // 마이페이지
        ],
      },
      { path: "calendar/schedule", element: <CalendarNewSchedule /> }, // 일정 생성 페이지
      { path: "calendar/:scheduleId", element: <CalendarScheduleDetail /> }, // 특정 일정 상세 페이지 (동적 라우팅)
      { path: "calendar/dday", element: <CalendarDdayList /> }, //D-Day 일정 리스트 페이지 
      { path: "/onboarding/military-day", element: <MilitaryDay /> }, //D-Day 일정 리스트 페이지
      { path: "/onboarding/couple-contact", element: <CoupleContact /> }, //D-Day 일정 리스트 페이지
    ],
   
  },
]);
export default router;
