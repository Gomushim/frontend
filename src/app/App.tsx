import { Outlet } from "react-router";
function App() {
  return (
    <div className="flex h-screen justify-center bg-gray-50">
      <div className="relative w-full max-w-[375px] bg-white shadow-md">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
