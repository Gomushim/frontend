import { MainHeader } from "./ui/MainHeader";

export const ScheduleSection = () => {
  return (
    <>
      <MainHeader mainTitle="우리의 일정" onClick={() => console.log("일정 더보기")} />
      <section className="mb-4 rounded-2xl bg-white p-6">
        <div />
      </section>
    </>
  );
};
