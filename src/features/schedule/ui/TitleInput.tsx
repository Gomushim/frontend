import { useScheduleStore } from "@/entities/schedule";
import { SInput } from "@/shared/ui";
import { memo } from "react";
import { useShallow } from "zustand/shallow";

export const TitleInput = memo(() => {
  const { title, setTitle } = useScheduleStore(
    useShallow(state => ({
      title: state.schedule.title,
      setTitle: state.setTitle,
    }))
  );

  return (
    <>
      <label htmlFor="title" className="text-gary-900 text-xl font-semibold">
        제목
      </label>
      <SInput
        id="title"
        className="h-12 w-full border"
        type="text"
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
    </>
  );
});
