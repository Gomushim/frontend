import { Button } from "@/shared/ui";
import backIcon from "@/assets/icons/back.svg";
import letterIcon from "@/assets/icons/letter.svg";
import blackHeart from "@/assets/icons/blackHeart.svg";
import { MonthlyLettersView, NoLetterMessage } from "@/features/letter";
import { useGetLetterList } from "@/entities/letter/query";
import useIntersect from "@/shared/hooks/useIntersect";
import { useCoupleNickname } from "@/entities/couple_nickname";

export const LetterListPage = () => {
  const { data: letterListData, fetchNextPage, isFetched } = useGetLetterList();
  const { getNickName } = useCoupleNickname();
  const { data: coupleNickname } = getNickName;

  const ref = useIntersect<HTMLDivElement>(() => {
    fetchNextPage();
  }, isFetched);

  if (!letterListData) {
    return;
  }

  return (
    <div className="px-[22px]">
      <header className="relative flex items-center justify-center">
        <Button variant="ghost" size="sIcon" className="absolute top-[70px] left-0">
          <img src={backIcon} alt="뒤로가기" />
        </Button>
        <h1 className="pt-[70px]">편지</h1>
      </header>
      <main className="mt-4.5">
        {letterListData.pages[0].data.length > 0 && (
          <section className="mb-6 flex items-center gap-2">
            <img className="h-5 w-5 pb-1" src={letterIcon} alt="캘린더 아이콘" />
            <h2 className="text-xl font-semibold text-gray-900">{coupleNickname?.result.userNickname}</h2>
            <img src={blackHeart} alt="캘린더 아이콘" />
            <h2 className="text-xl font-semibold text-gray-900">{coupleNickname?.result.coupleNickname}</h2>
            <h2 className="text-xl font-semibold text-gray-900">님의 편지</h2>
            <p className="text-md font-semibold text-gray-500">2</p>
          </section>
        )}
        {letterListData.pages.map(page => (
          <MonthlyLettersView key={page.after} {...page} />
        ))}
        {letterListData.pages[0].data.length === 0 && <NoLetterMessage />}
        <div ref={ref} style={{ width: "1px", height: "1px", marginTop: "10px" }} />
      </main>
    </div>
  );
};
