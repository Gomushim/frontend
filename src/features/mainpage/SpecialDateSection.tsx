import HeartIcon from "@/assets/images/heart.svg";
import BootsIcon from "@/assets/images/boots.svg";
import HeelsIcon from "@/assets/images/heals.svg";
import { useAnniversary } from "@/entities/main_anniversary";

interface SpecialDateSectionProps {
  isConnected: boolean;
  isInitialized: boolean;
}

export const SpecialDateSection = ({
  isConnected,
  isInitialized,
}: SpecialDateSectionProps) => {
  const { getDday } = useAnniversary({
    enabled: isConnected && isInitialized,
  });

  const ddayInfo = getDday.data?.result;

  return (
    <div className="relative z-20 -mt-22 px-6">
      <section className="grid grid-cols-3 gap-5">
        <div className="flex flex-col items-center">
          <div className="flex w-full max-w-[300px] flex-col items-center justify-center rounded-2xl bg-white">
            <img src={HeartIcon} alt="하트" className="h-12 w-12" />
            <span className="text-md font-medium text-gray-900 mb-2">
              {isConnected && isInitialized
                ? `D${ddayInfo?.sinceLove ?? "-"}`
                : "-"}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex w-full max-w-[300px] flex-col items-center justify-center rounded-2xl bg-white">
            <img src={BootsIcon} alt="부츠" className="h-12 w-12" />
            <span className="text-md font-medium text-gray-900 mb-2">
              {isConnected && isInitialized
                ? `D${ddayInfo?.sinceMilitaryStart ?? "-"}`
                : "-"}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex w-full max-w-[300px] flex-col items-center justify-center rounded-2xl bg-white">
            <img src={HeelsIcon} alt="힐" className="h-12 w-12" />
            <span className="text-md font-medium text-gray-900 mb-2">
              {isConnected && isInitialized
                ? `D${ddayInfo?.militaryEndLeft ?? "-"}`
                : "-"}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
