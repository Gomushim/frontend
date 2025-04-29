import { Outlet } from "react-router";
function App() {
  return (

    <div className="flex h-screen justify-center bg-gray-500">
      <div className="relative w-full bg-white shadow-md">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
