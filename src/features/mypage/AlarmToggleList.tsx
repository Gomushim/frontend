import { Switch } from "@/shared/ui/switch";
import { useNotificationQuery } from "../../entities/push_alarm";
import { useNotificationMutation } from "../../entities/push_alarm";

const toggleItems = [
  { label: "앱 전체 알림", key: "app" },
  { label: "디데이 알림", key: "dday" },
  { label: "연인의 상태 알림", key: "partnerStatus" },
];

export const NotificationToggleList = () => {
  const { data: notificationData } = useNotificationQuery();
  const { mutate: updateNotification } = useNotificationMutation();

  const handleToggle = (key: string) => {
    if (!notificationData?.result) return;

    const current = notificationData.result;

    if (key === "app") {
      const isAllEnabled = current.dday && current.partnerStatus;

      updateNotification({
        dday: !isAllEnabled,
        partnerStatus: !isAllEnabled,
      });
    } else if (key === "dday") {
      updateNotification({
        ...current,
        dday: !current.dday,
      });
    } else if (key === "partnerStatus") {
      updateNotification({
        ...current,
        partnerStatus: !current.partnerStatus,
      });
    }
  };

  if (!notificationData?.result) return null;

  const isAllNotificationsEnabled = notificationData.result.dday && notificationData.result.partnerStatus;

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
