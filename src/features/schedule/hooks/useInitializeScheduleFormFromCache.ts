import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { InitialSchedule } from "../model";

export const useInitializeScheduleFormFromCache = (
  id: string,
  updateField: <K extends keyof InitialSchedule>(key: K, value: InitialSchedule[K]) => void
) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const cachedData = queryClient.getQueryData<{ result: InitialSchedule }>(["schedule", "detail", id]);

    if (cachedData && "result" in cachedData) {
      const { id, title, fatigue, startDate, endDate, isAllDay } = (cachedData as any).result;

      updateField("id", id);
      updateField("title", title);
      updateField("fatigue", fatigue);
      updateField("startDate", startDate);
      updateField("endDate", endDate);
      updateField("isAllDay", !!isAllDay);
    }
  }, [id, queryClient, updateField]);
};
