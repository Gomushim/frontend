import HeartIcon from "@/assets/images/heart.svg";
import BootsIcon from "@/assets/images/boots.svg";
import HeelsIcon from "@/assets/images/heals.svg";
import { anniversaryQueries } from "@/entities/anniversary/service";
import { useCoupleStore } from "@/stores/coupleStore";
import { useEffect, useState } from "react";

export const IconSection = () => {
  const { isConnected, isInitialized } = useCoupleStore();
  const [ddayInfo, setDdayInfo] = useState<{
    sinceLove: number;
    sinceMilitaryStart: number;
    militaryEndLeft: number;
  } | null>(null);

  useEffect(() => {
    const fetchDday = async () => {
      if (isConnected && isInitialized) {
        try {
          const response = await anniversaryQueries.getDday();
          setDdayInfo(response.result);
        } catch (error) {
          console.error("디데이 정보를 가져오는데 실패했습니다:", error);
        }
      }
    };

    fetchDday();
  }, [isConnected, isInitialized]);

  return (
    <>
        <div className="relative z-20 -mt-15 px-6">
          <section className="grid grid-cols-3 gap-5">
            <div className="flex flex-col items-center">
              <div className="flex w-full max-w-[300px] flex-col items-center justify-center rounded-2xl bg-white">
                <img src={HeartIcon} alt="하트" className="mb-2 h-12 w-12" />
                <span className="text-xs text-gray-900">{ddayInfo?.sinceLove ?? "-"}일 </span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex w-full max-w-[300px] flex-col items-center justify-center rounded-2xl bg-white">
                <img src={BootsIcon} alt="부츠" className="mb-2 h-12 w-12" />
                <span className="text-xs text-gray-900">{ddayInfo?.sinceMilitaryStart ?? "-"}일</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex w-full max-w-[300px] flex-col items-center justify-center rounded-2xl bg-white">
                <img src={HeelsIcon} alt="힐" className="mb-2 h-12 w-12" />
                <span className="text-xs text-gray-900">{ddayInfo?.militaryEndLeft ?? "-"}일</span>
              </div>
            </div>
          </section>
        </div>
    </>
  );
};

