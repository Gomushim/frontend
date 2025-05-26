import noDday from "@/assets/images/noDday.svg";
import { Button } from "@/shared/ui";
import { useNavigate } from "react-router";

export const NoDdayMessage = () => {
  const navigate = useNavigate();

  const goCreateDdayPage = () => {
    navigate("/calendar/dday/new", { state: { from: "/calendar/dday" } });
  };

  return (
    <div className="mt-[170px] flex flex-col items-center">
      <img src={noDday} alt="Day 없음" />
      <h2 className="mt-7 text-2xl font-semibold text-gray-900">등록된 디데이가 없네요!</h2>
      <p className="mt-2 text-center text-xl font-medium text-gray-500">
        기다리는 연인을 위해
        <br />
        편지를 작성해보는 건 어떨까요?
      </p>
      <Button variant="square" size="2xs" className="mt-8" onClick={goCreateDdayPage}>
        디데이 추가
      </Button>
    </div>
  );
};
