export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 0부터 시작하니까 +1
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatToMonthDay = (date) => {
  const [year, month, day] = date.split("-");
  const monthNumber = parseInt(month, 10); // 앞의 0 제거
  const dayNumber = parseInt(day, 10); // 앞의 0 제거
  return `${monthNumber}/${dayNumber}`;
};
