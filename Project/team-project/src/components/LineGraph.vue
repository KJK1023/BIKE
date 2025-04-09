<script setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";
import { onMounted, computed } from "vue";
import { useTransactionStore } from "../stores/transaction-store";
import { sixMonthLabels } from "@/utils/chart-utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const transactionStore = useTransactionStore();
const transactions = computed(() => transactionStore.transactionInfo);

onMounted(async () => {
  await transactionStore.fetchTransaction();

  // 차트 데이터 갱신 예시
  config.data.labels = transactions.value.map((t) => t.date);
  config.data.datasets[0].data = transactions.value.map((t) =>
    t.type === "income" ? t.amount : 0
  );
  config.data.datasets[1].data = transactions.value.map((t) =>
    t.type === "expense" ? t.amount : 0
  );
});

const now = new Date();
const thisYear = now.getFullYear();
const thisMonth = String(now.getMonth() + 1);

// 이번 달 데이터만 필터링
const thisMonthData = computed(() => {
  return transactions.value.filter((item) => {
    const [year, month] = item.date.split("-");
    return year === String(thisYear) && month === thisMonth.padStart(2, "0");
  });
});

// 이번 달 수익 합
const totalIncome = computed(() =>
  thisMonthData.value?.reduce(
    (sum, t) => sum + (t.type === "income" ? t.amount : 0),
    0
  )
);
// 이번 달 지출 합
const totalExpense = computed(() =>
  thisMonthData.value?.reduce(
    (sum, t) => sum + (t.type === "expense" ? t.amount : 0),
    0
  )
);

const monthLabels = sixMonthLabels();

// 가져온 데이터에 맞게 값 넣기
const data = {
  labels: monthLabels,
  datasets: [
    {
      label: "수입",
      borderColor: "#4f48dc",
      backgroundColor: "#ffffff",
      data: [3100000, 3200000, 3150000, 3300000, 3150000, 3450000],
    },
    {
      label: "지출",
      borderColor: "#DC2626",
      backgroundColor: "#ffffff",
      data: [2800000, 2200000, 2600000, 2450000, 2300000, 2500000],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>

<template>
  <div class="line-chart-box">
    <div class="inner-box">
      <div class="income-box">
        <p id="this-month-text">이번 달 수익</p>
        <p id="income-amount">
          ₩{{ totalIncome ? totalIncome.toLocaleString() : 0 }}
        </p>
      </div>
      <div class="expense-box">
        <p id="this-month-text">이번 달 지출</p>
        <p id="expense-amount">
          ₩{{ totalExpense ? totalExpense.toLocaleString() : 0 }}
        </p>
      </div>
    </div>
    <div class="chart-wrapper">
      <Line :data="data" :options="options" />
    </div>
  </div>
</template>

<style scoped>
.line-chart-box {
  background-color: #fff;
  width: 780px;
  height: 456px;
  padding: 18px;
  border-radius: 8px;
  box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.1),
    0px 1px 3px 0px rgba(0, 0, 0, 0.1);
}
.inner-box {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}
.income-box {
  background-color: #eef2ff;
  border-radius: 8px;
  width: 100%;
  height: 84px;
  padding: 0 20px 0 20px;
  align-content: center;
}
.expense-box {
  background-color: #fef2f2;
  border-radius: 8px;
  width: 100%;
  height: 84px;
  padding: 0 20px 0 20px;
  align-content: center;
}
#income-amount {
  color: #4f46e5;
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  margin-top: 5px;
}
#expense-amount {
  color: #dc2626;
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  margin-top: 5px;
}
#this-month-text {
  color: #6b7280;
  font-size: 14px;
  margin: 0;
}
.chart-wrapper {
  height: 300px;
  margin: 0;
}
</style>
