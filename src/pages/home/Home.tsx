import { requestNotificationPermission } from "@/shared/firebase/setupFCM";
import { useState } from "react";

export const Home = () => {
  const [text, setText] = useState<string | null>("");

  const onClick = async () => {
    const test = await requestNotificationPermission();
    setText(test);
    console.log(test);
  };
  return (
    <div>
      <button onClick={onClick}>토큰 생성</button>
      <p>{text}</p>
    </div>
  );
};
