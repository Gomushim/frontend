import React from "react";
import { Switch } from "@/shared/ui/switch";
import { useNotificationQuery } from "../../entities/push_alarm";
import { useNotificationMutation } from "../../entities/push_alarm";

const toggleItems = [
  { label: "앱 전체 알림", key: "app" },
  { label: "디데이 알림", key: "dday" },
  { label: "연인의 상태 알림", key: "partnerStatus" },
];

export const NotificationToggleList: React.FC = () => {
  const { data: notificationData } = useNotificationQuery();
  const { mutate: updateNotification } = useNotificationMutation("post");

  const handleToggle = (key: string) => {
    if (!notificationData?.result) return;

    const newData = {
      dday: key === "app" 
        ? !notificationData.result.dday && !notificationData.result.partnerStatus
        : key === "dday" 
          ? !notificationData.result.dday 
          : notificationData.result.dday,
      partnerStatus: key === "app"
        ? !notificationData.result.dday && !notificationData.result.partnerStatus
        : key === "partnerStatus"
          ? !notificationData.result.partnerStatus
          : notificationData.result.partnerStatus,
    };

    updateNotification(newData);
  };

  if (!notificationData?.result) return null;

  const isAllNotificationsEnabled = notificationData.result.dday && notificationData.result.partnerStatus;

  return (
    <div className="flex flex-col gap-4 px-4 mt-2">
      {toggleItems.map((item) => (
        <div
          key={item.label}
          className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-5"
        >
          <span className="text-gray-900 text-md font-medium">{item.label}</span>
          <Switch
            checked={
              item.key === "app"
                ? isAllNotificationsEnabled
                : item.key === "dday"
                ? notificationData.result.dday
                : notificationData.result.partnerStatus
            }
            onCheckedChange={() => handleToggle(item.key)}
            className="ml-2"
          />
        </div>
      ))}
    </div>
  );
}; 