import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { InitialDday } from "../model";

export const useInitializeDdayFormFromCache = (
  id: string,
  updateField: <K extends keyof InitialDday>(key: K, value: InitialDday[K]) => void
) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const cachedData = queryClient.getQueryData<{ result: InitialDday }>(["d-day", "detail", id]);

    if (cachedData && "result" in cachedData) {
      const { id, title, date, emoji } = (cachedData as any).result;
      updateField("id", id);
      updateField("title", title);
      updateField("date", date);
      updateField("emoji", emoji);
    }
  }, [id, queryClient, updateField]);
};
