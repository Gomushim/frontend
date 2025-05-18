import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { InitialDday } from "../model";

export const useInitializeDdayFormFromCache = (
  id: string,
  updateField: <K extends keyof InitialDday>(key: K, value: InitialDday[K]) => void
) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const cachedData = queryClient.getQueryData<{ pages: any[] }>(["dday", "list", "all"]);
    if (!cachedData) return;

    // 모든 페이지를 flat하게 합치고, id가 일치하는 첫 D-day만 찾음
    const allDdays = cachedData.pages.flatMap((page: any) => page.data);
    const dday = allDdays.find((d: any) => String(d.id) === String(id));

    if (dday) {
      updateField("id", dday.id);
      updateField("title", dday.title);
      updateField("date", dday.anniversaryDate);
      updateField("emoji", dday.emoji);
    }
  }, [id, queryClient, updateField]);
};
