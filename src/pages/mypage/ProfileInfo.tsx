import EditInfoCard from "@/features/mypage/EditInfoCard";
import MyHeader from "@/features/mypage/MyHeader";

export const ProfileInfo = () => {
  return (
    <div className="min-h-screen bg-white px-5 py-6">
        <MyHeader title="프로필 정보" />
        <div className="max-w-md mx-auto">

        <EditInfoCard title="세린" onEdit={() => { /* 편집 로직 */ }} />
        <EditInfoCard title="2003.03.12" onEdit={() => { /* 편집 로직 */ }} />

        <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between mb-2">
          <div className="text-gray-500 text-md font-medium">
            산들
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between mb-2">
          <div className="text-gray-500 text-md font-medium">
            2001.01.02
          </div>
        </div>

        <EditInfoCard title="입대 및 전역일" onEdit={() => { /* 편집 로직 */ }} />
        <EditInfoCard title="처음 만난 날" onEdit={() => { /* 편집 로직 */ }} />
      </div>
    </div>
  );
};

