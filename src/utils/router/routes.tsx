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
import { Birthday, FirstMeet, Nickname, MilitaryDay, CoupleContact, Alarm } from "@/pages/onboarding";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/onboarding", element: <Onboarding /> },
  {
    path: "/",
    element: <FirstMeet />,
    children: [
      { index: true, element: <Home /> },
      { path: "calendar", element: <CalendarRoot /> },
      { path: "mypage", element: <MyPage /> },
      { path: "calendar/schedule", element: <CalendarNewSchedule /> },
      { path: "calendar/:scheduleId", element: <CalendarScheduleDetail /> },
      { path: "calendar/dday", element: <CalendarDdayList /> },
    ],
  },
  {
    path: "/onboarding",
    children: [
      { path: "military-day", element: <MilitaryDay /> },
      { path: "couple-contact", element: <CoupleContact /> },
      { path: "nickname", element: <Nickname /> },
      { path: "birthday", element: <Birthday /> },
      { path: "alarm", element: <Alarm /> },
    ],
  },
]);

export default router;
