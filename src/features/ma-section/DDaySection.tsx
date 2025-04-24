import CakeIcon from "@/assets/images/cake.svg";
import { MainHeader } from "./MainHeader";

export const DDaySection = () => {
  return (
    <>
      <MainHeader 
        mainTitle="D-DAY" 
        buttonText="더보기"
        onClick={() => console.log('D-DAY 더보기')}
      />
      <section className="bg-white rounded-2xl p-6">
        <div className="flex items-center font-semibold text-sm text-gray-500">
          <img src={CakeIcon} alt="하트" className="w-5 h-5 mr-2 opacity-50" />
          <span>상대방과의 소중한 디데이를 등록하세요</span>
        </div>
      </section>
    </>
  );
};

