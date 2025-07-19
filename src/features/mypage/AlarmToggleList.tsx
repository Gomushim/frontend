import { Switch } from "@/shared/ui/switch";
import { useNotificationQuery } from "../../entities/push_alarm";
import { useNotificationMutation } from "../../entities/push_alarm";
import { useState, useEffect } from "react";

const toggleItems = [
  { label: "앱 전체 알림", key: "app" },
  { label: "디데이 알림", key: "dday" },
  { label: "연인의 상태 알림", key: "partnerStatus" },
];

export const NotificationToggleList = () => {
  const { data: notificationData } = useNotificationQuery();
  const { mutate: updateNotification, isPending } = useNotificationMutation();
  const [localData, setLocalData] = useState(notificationData?.result);

  useEffect(() => {
    if (notificationData?.result) {
      setLocalData(notificationData.result);
    }
  }, [notificationData?.result]);

  const handleToggle = (key: string) => {
    if (!localData || isPending) return;

    const current = localData;

    if (key === "app") {
      const isAllEnabled = current.dday && current.partnerStatus;
      const newValue = !isAllEnabled;
      
      setLocalData({
        ...current,
        dday: newValue,
        partnerStatus: newValue,
      });

      updateNotification({
        dday: newValue,
        partnerStatus: newValue,
      });
    } else if (key === "dday") {
      const newValue = !current.dday;
      
      setLocalData({
        ...current,
        dday: newValue,
      });

      updateNotification({
        ...current,
        dday: newValue,
      });
    } else if (key === "partnerStatus") {
      const newValue = !current.partnerStatus;
      
      setLocalData({
        ...current,
        partnerStatus: newValue,
      });

      updateNotification({
        ...current,
        partnerStatus: newValue,
      });
    }
  };

  if (!localData) return null;

  const isAllNotificationsEnabled = localData.dday && localData.partnerStatus;

  return (
    <div className="mt-2 flex flex-col gap-4 px-4">
      {toggleItems.map(item => (
        <div key={item.label} className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-5">
          <span className="text-md font-medium text-gray-900">{item.label}</span>
          <Switch
            checked={
              item.key === "app"
                ? isAllNotificationsEnabled
                : item.key === "dday"
                  ? localData.dday
                  : localData.partnerStatus
            }
            onCheckedChange={() => handleToggle(item.key)}
            disabled={isPending}
            className="ml-2"
          />
        </div>
      ))}
    </div>
  );
};
