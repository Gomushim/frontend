import { LoginButton } from "@/features/login";
import loginImage from "@/assets/images/login.svg";

export const Login = () => {
  return (
    <div className="pc:flex mx-auto min-h-screen pt-11 items-center justify-center bg-gray-500">
      <div className="scrollbar-hide pc:max-w-[375px] relative flex h-screen w-full flex-col items-center bg-white p-5">
        <h1 className="mt-30 mb-25 text-3xl font-bold text-gray-900">
          곰신 커플을 위한 공유 캘린더,
          <br />
          <span className="text-red-400">사랑꾼</span>에 오신 걸 환영합니다!
        </h1>
        <img src={loginImage} alt="로그인 페이지" />
        <LoginButton />
      </div>
    </div>
  );
};
