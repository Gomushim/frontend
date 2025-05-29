import { Outlet } from "react-router";
function App() {
  return (
    <div className="pc:flex h-screen justify-center overflow-hidden bg-gray-500">
      <div className="pc:max-w-[375px] bg-whitept-[env(safe-area-inset-top)] relative h-screen w-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
