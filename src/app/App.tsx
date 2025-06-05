import { Outlet } from "react-router";
function App() {
  return (
    <div className="pc:flex h-screen justify-center overflow-hidden bg-gray-500">
      <div className="pc:max-w-[375px] relative h-screen w-full overflow-y-auto bg-white">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
