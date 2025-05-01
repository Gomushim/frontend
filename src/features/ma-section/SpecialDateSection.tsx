import HeartIcon from "@/assets/images/heart.svg";
import BootsIcon from "@/assets/images/boots.svg";
import HeelsIcon from "@/assets/images/heals.svg";
import { anniversaryQueries } from "@/entities/anniversary/service";
import { useCoupleStore } from "@/stores/coupleStore";
import { useEffect, useState } from "react";

export const SpecialDateSection = () => {
  const { coupleInfo, isInitialized, fetchInitializationStatus } = useCoupleStore();
  const [ddayInfo, setDdayInfo] = useState<{
    sinceLove: number;
    sinceMilitaryStart: number;
    militaryEndLeft: number;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (coupleInfo) {
        try {
          const [ddayResponse] = await Promise.all([
            anniversaryQueries.getDday(),
            fetchInitializationStatus()
          ]);
          setDdayInfo(ddayResponse.result);
        } catch (error) {
          console.error("데이터를 가져오는데 실패했습니다:", error);
        }
      }
    };

    fetchData();
  }, [coupleInfo, fetchInitializationStatus]);

  return (
    <>
        <div className="relative z-20 -mt-22 px-6">
          <section className="grid grid-cols-3 gap-5">
            <div className="flex flex-col items-center">
              <div className="flex w-full max-w-[300px] flex-col items-center justify-center rounded-2xl bg-white">
                <img src={HeartIcon} alt="하트" className=" h-12 w-12" />
                <span className="text-md font-medium text-gray-900 mb-2">
                  {coupleInfo && isInitialized ? `D+${ddayInfo?.sinceLove ?? "-"}` : "-"}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex w-full max-w-[300px] flex-col items-center justify-center rounded-2xl bg-white">
                <img src={BootsIcon} alt="부츠" className=" h-12 w-12" />
                <span className="text-md font-medium text-gray-900 mb-2">
                  {coupleInfo && isInitialized ? `D+${ddayInfo?.sinceMilitaryStart ?? "-"}` : "-"}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex w-full max-w-[300px] flex-col items-center justify-center rounded-2xl bg-white">
                <img src={HeelsIcon} alt="힐" className="h-12 w-12" />
                <span className="text-md font-medium text-gray-900 mb-2">
                  {coupleInfo && isInitialized ? `D-${ddayInfo?.militaryEndLeft ?? "-"}` : "-"}
                </span>
              </div>
            </div>
          </section>
        </div>
    </>
  );
};

