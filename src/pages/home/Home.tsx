import { requestNotificationPermission } from "@/shared/firebase/setupFCM";

export const Home = () => {
  const onClick = async () => {
    const test = await requestNotificationPermission();
    console.log(test);
  };
  return <div onClick={onClick}>Home</div>;
};
