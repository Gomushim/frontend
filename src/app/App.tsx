import { Outlet } from "react-router";
function App() {
  return (

    <div className="flex h-screen justify-center bg-gray-500">
      <div className="scrollbar-hide relative h-full w-full max-w-[375px] overflow-y-auto bg-white">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
