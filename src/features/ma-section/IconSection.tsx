import HeartIcon from "@/assets/images/heart.svg";
import BootsIcon from "@/assets/images/boots.svg";
import HeelsIcon from "@/assets/images/heals.svg";

export const IconSection = () => {
  return (
    <div className="px-6 -mt-15 relative z-20">
      <section className="grid grid-cols-3 gap-5">
        <div className="flex flex-col items-center">
          <div className="w-full bg-white rounded-2xl flex flex-col items-center justify-center max-w-[300px]">
            <img src={HeartIcon} alt="하트" className="w-12 h-12 mb-2" />
            <span className="text-xs text-gray-900">-</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-full bg-white rounded-2xl flex flex-col items-center justify-center max-w-[300px]">
            <img src={BootsIcon} alt="부츠" className="w-12 h-12 mb-2" />
            <span className="text-xs text-gray-900">-</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-full bg-white rounded-2xl flex flex-col items-center justify-center max-w-[300px]">
            <img src={HeelsIcon} alt="힐" className="w-12 h-12 mb-2" />
            <span className="text-xs text-gray-900">-</span>
          </div>
        </div>
      </section>
    </div>
  );
};