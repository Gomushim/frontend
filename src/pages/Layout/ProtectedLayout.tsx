import { useState } from "react";

export const ProtectedLayout = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h2>📅 날짜 선택 (년/월/일)</h2>
      <input
        type="date"
        value={date}
        inputMode="numeric"
        onChange={e => setDate(e.target.value)}
        style={{ padding: "0.5rem", fontSize: "1rem" }}
      />

      <h2 style={{ marginTop: "2rem" }}>⏰ 시간 선택 (시:분)</h2>
      <input
        type="time"
        value={time}
        onChange={e => setTime(e.target.value)}
        style={{ padding: "0.5rem", fontSize: "1rem" }}
      />

      <div style={{ marginTop: "2rem" }}>
        <strong>선택한 날짜:</strong> {date || "없음"}
        <br />
        <strong>선택한 시간:</strong> {time || "없음"}
      </div>
    </div>
  );
};
