import { Outlet } from "react-router";
function App() {
  return (
    <div className="pc:flex min-h-screen justify-center bg-gray-500">
      <div className="scrollbar-hide pc:max-w-[375px] relative w-full bg-white">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
