import CakeIcon from "@/assets/images/cake.svg";
import { MainHeader } from "./ui/MainHeader";

export const DDaySection = () => {
  return (
    <>
      <MainHeader mainTitle="D-DAY" buttonText="더보기" onClick={() => console.log("D-DAY 더보기")} />
      <section className="rounded-2xl bg-white p-6">
        <div className="flex items-center text-sm font-semibold text-gray-500">
          <img src={CakeIcon} alt="하트" className="mr-2 h-5 w-5 opacity-50" />
          <span>상대방과의 소중한 디데이를 등록하세요</span>
        </div>
      </section>
    </>
  );
};
