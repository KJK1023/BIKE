import { computed } from "vue";

export const sixMonthLabels = () => {
  const now = new Date();
  const labels = [];

  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = date.getMonth() + 1; // 0부터 시작이므로 +1
    labels.push(`${month}`);
  }

  return labels;
};

export const totalDataPerMonth = (data, thisYear, thisMonth) => {
  if (!data) return;

  const filteredData = computed(() => {
    return data.value.filter((item) => {
      const [year, month] = item.date.split("-");
      return year === String(thisYear) && month === thisMonth.padStart(2, "0");
    });
  });

  // 이번 달 수익 합
  const totalIncome = computed(() =>
    filteredData.value?.reduce(
      (sum, t) => sum + (t.type === "income" ? t.amount : 0),
      0
    )
  );
  // 이번 달 지출 합
  const totalExpense = computed(() =>
    filteredData.value?.reduce(
      (sum, t) => sum + (t.type === "expense" ? t.amount : 0),
      0
    )
  );

  return { totalIncome, totalExpense };
};
