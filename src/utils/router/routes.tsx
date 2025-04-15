import App from "@/App";
import { Calender, Home } from "@/pages";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "calender",
        element: <Calender />,
      },
    ],
  },
]);
export default router;
