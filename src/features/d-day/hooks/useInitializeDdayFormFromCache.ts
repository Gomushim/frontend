import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { InitialDday } from "../model";
import type { Dday } from "@/entities/d-day";

const updateDdayFields = (
  dday: Dday,
  updateField: <K extends keyof InitialDday>(key: K, value: InitialDday[K]) => void
) => {
  const fields: Array<keyof InitialDday> = ["id", "title", "date", "emoji"];
  const values = {
    id: dday.id,
    title: dday.title,
    date: dday.anniversaryDate,
    emoji: dday.emoji,
  };

  fields.forEach(field => updateField(field, values[field]));
};

export const useInitializeDdayFormFromCache = (
  id: string,
  updateField: <K extends keyof InitialDday>(key: K, value: InitialDday[K]) => void,
  location: string
) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (location === "/") {
      const cachedData = queryClient.getQueryData<{ result: Dday[] }>(["dday", "main", "top3"]);
      if (!cachedData) return;

      const dday = cachedData.result.find((d: Dday) => String(d.id) === String(id));
      if (dday) {
        updateDdayFields(dday, updateField);
      }
    }
    if (location === "/calendar/dday") {
      const cachedData = queryClient.getQueryData<{ pages: any[] }>(["dday", "list", "all"]);
      if (!cachedData) return;

      const allDdays = cachedData.pages.flatMap((page: any) => page.data);
      const dday = allDdays.find((d: any) => String(d.id) === String(id));
      if (dday) {
        updateDdayFields(dday, updateField);
      }
    }
  }, [id, queryClient, updateField, location]);
};
