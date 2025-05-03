import { useMutation } from "@tanstack/react-query";
import { createSchedule } from "./service";
import { ScheduleRequst } from "./type";
import { mutationMethodType } from "../types/mutationMethod.type";

export const useScheduleMutation = (data: ScheduleRequst, mutationMethod: mutationMethodType) => {
  return useMutation({
    mutationFn: async () => {
      switch (mutationMethod) {
        case "delete":
          return await createSchedule(data);
        case "post":
          return await createSchedule(data);
        case "update":
          return await createSchedule(data);
        default:
          throw new Error("Invalid mutation method");
      }
    },
    onSuccess: () => {},
    onError: error => {
      console.error("Error:", error);
    },
  });
};
