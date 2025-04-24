import {MainHeader} from "./MainHeader";

export const ScheduleSection = () => {
  return (
    <>
      <MainHeader 
        mainTitle="우리의 일정" 
        buttonText="더보기"
        onClick={() => console.log('일정 더보기')}
      />
      <section className="bg-white rounded-2xl p-6 mb-4">
        <div></div>
      </section>
    </>
  );
};
