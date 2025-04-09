export const sixMonthLabels = () => {
  const now = new Date();
  const labels = [];

  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = date.getMonth() + 1; // 0부터 시작이므로 +1
    labels.push(`${month}월`);
  }

  return labels;
};
