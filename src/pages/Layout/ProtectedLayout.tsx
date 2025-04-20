import { Outlet } from "react-router";

export const ProtectedLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
