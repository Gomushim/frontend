import { useState } from "react";
import reactLogo from "./assets/react.svg";
import appLogo from "/favicon.svg";
import PWABadge from "./PWABadge.tsx";
import "./App.css";
import { requestNotificationPermission } from "./firebase/setupFCM.ts";

function App() {
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  const handleRequestPermission = async () => {
    const token = await requestNotificationPermission();
    if (token) {
      setFcmToken(token);
    } else {
      setFcmToken("토큰을 가져오지 못했습니다.");
    }
  };

  return (
    <>
      <div className="flex justify-between rounded bg-blue-500 px-4 py-2 text-sm text-white">
        <a href="https://vite.dev" target="_blank">
          <img src={appLogo} className="logo" alt="sarang-mate logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>sarang-mate</h1>
      <div className="card">
        <button onClick={handleRequestPermission}>FCM 알림 권한 요청</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      {fcmToken && (
        <div className="mt-4 rounded border bg-gray-100 p-2 text-xs break-all">
          <strong>FCM Token:</strong>
          <p>{fcmToken}</p>
        </div>
      )}
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      <PWABadge />
    </>
  );
}

export default App;
