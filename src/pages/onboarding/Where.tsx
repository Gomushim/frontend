import React, { useState } from "react";
import { Button, ProgressHeader } from "@/shared/ui";

export const Where: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const locations = [
    { id: "army", label: "육군" },
    { id: "navy", label: "해군" },
    { id: "airforce", label: "공군" },
    { id: "marine", label: "해병대" },
  ];

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
  };

  return (
    <div className="min-h-screen bg-white">
      <ProgressHeader
        title="어느 군에서 복무중이신가요?"
        highlight="어느 군"
        subtitle="나 또는 상대의 소속을 선택해주세요."
        progress={0.4}
      />

      <div className="mt-6 space-y-2 px-4">
        {locations.map(location => (
          <button
            key={location.id}
            className={`text-medium text-regular w-full rounded-xl border bg-gray-50 p-4 text-left ${
              selectedLocation === location.id ? "border-green-500" : "border-gray-50"
            }`}
            onClick={() => handleLocationSelect(location.id)}>
            {location.label}
          </button>
        ))}
      </div>

      <div className="fixed right-0 bottom-0 left-0 p-4">
        <Button variant={selectedLocation ? "active" : "inactive"} disabled={!selectedLocation}>
          확인
        </Button>
      </div>
    </div>
  );
};
