// UI
import { Button } from "@/shared/ui";

// 아이콘
import backIcon from "@/assets/icons/back.svg";
import blackHeart from "@/assets/icons/blackHeart.svg";

// 도메인: letter
import { MonthlyLettersView, NoLetterMessage } from "@/features/letter";
import { useGetLetterList } from "@/entities/letter/query";

// 도메인: couple
import { useCoupleNickname } from "@/entities/couple_nickname";

// 훅
import { useIntersect } from "@/shared/hooks";
import { useLocation, useNavigate } from "react-router";

export const LetterListPage = () => {
  // 라우터 훅
  const location = useLocation();
  const navigate = useNavigate();

  // API 훅
  const { data: letterListData, fetchNextPage, isFetched } = useGetLetterList();
  const { getNickName } = useCoupleNickname();
  const { data: coupleNickname } = getNickName;

  // 무한 스크롤 훅
  const ref = useIntersect<HTMLDivElement>(() => {
    fetchNextPage();
  }, isFetched);

  if (!letterListData) {
    return;
  }

  const handleBack = () => {
    const previousPath = location.state?.previousPath;
    if (previousPath) {
      navigate(previousPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="px-[22px] pt-11">
      {/* 헤더 영역 */}
      <header className="relative flex items-center justify-center">
        <Button variant="ghost" size="sIcon" className="absolute top-5 left-0" onClick={handleBack}>
          <img src={backIcon} alt="뒤로가기" />
        </Button>
        <h1 className="pt-5 text-xl font-semibold text-gray-900">편지</h1>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="mt-4.5">
        {/* 커플 정보 섹션 */}
        {letterListData.pages[0].data.length > 0 && (
          <section className="mb-6 flex items-center gap-2">
            <h2 className="text-xl font-semibold text-gray-900">{coupleNickname?.result.userNickname}</h2>
            <img src={blackHeart} alt="캘린더 아이콘" />
            <h2 className="text-xl font-semibold text-gray-900">{coupleNickname?.result.coupleNickname}</h2>
            <h2 className="text-xl font-semibold text-gray-900">님의 편지</h2>
            <p className="text-md font-semibold text-gray-500">
              {letterListData.pages.reduce((total, page) => total + page.data.length, 0)}
            </p>
          </section>
        )}

        {/* 편지 리스트 */}
        {letterListData.pages.map(page => (
          <MonthlyLettersView key={page.after} {...page} />
        ))}

        {/* 빈 상태 메시지 */}
        {letterListData.pages[0].data.length === 0 && <NoLetterMessage />}

        {/* 무한 스크롤 트리거 */}
        <div ref={ref} style={{ width: "1px", height: "1px", marginTop: "10px" }} />
      </main>
    </div>
  );
};
