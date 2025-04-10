export const getThisWeekDates = () => {
  const today = new Date();
  const day = today.getDay(); // 0(일) ~ 6(토)
  const diffToMonday = day === 0 ? -6 : 1 - day; // 일요일은 -6, 나머진 (1 - day)

  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);

  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);

    // yyyy-mm-dd 형식으로 포맷
    const formatted = date.toISOString().split("T")[0];
    weekDates.push(formatted);
  }

  return weekDates;
};
