import React from "react";
import { useNavigate } from "react-router";
import { ProgressHeader, Button } from "@/shared/ui/";

export const Alarm: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col bg-white">
      <ProgressHeader
        title="멀리 있어도, 마음은 늘 가까이"
        highlight="마음은 늘 가까이"
        subtitle="문득 생각날 때, 당신의 마음을 전해드릴게요."
        progress={1}
        onBack={() => navigate(-1)}
        onClose={() => navigate("/")}
      />

      <div className="flex-1" />

      <div className="p-4">
        <Button variant="active">알림을 받을게요</Button>
      </div>
    </div>
  );
};

export default Alarm;
