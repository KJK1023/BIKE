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
import { ref, onMounted, computed } from "vue";
import { useTransactionStore } from "../stores/transaction-store";
import { sixMonthLabels, totalDataPerMonth } from "@/utils/chart-utils";

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

const monthLabels = ref([]);
const thisMonthIncome = ref(0);
const thisMonthExpense = ref(0);
const sixMonthIncome = ref([]);
const sixMonthExpense = ref([]);

onMounted(async () => {
  await transactionStore.fetchTransaction();

  const now = new Date();
  const thisYear = now.getFullYear();
  const thisMonth = String(now.getMonth() + 1);

  const thisMonthData = totalDataPerMonth(transactions, thisYear, thisMonth);
  thisMonthIncome.value = thisMonthData.totalIncome.value;
  thisMonthExpense.value = thisMonthData.totalExpense.value;

  monthLabels.value = sixMonthLabels();

  sixMonthIncome.value = monthLabels.value.map(
    (month) =>
      totalDataPerMonth(transactions, thisYear, month).totalIncome.value
  );

  sixMonthExpense.value = monthLabels.value.map(
    (month) =>
      totalDataPerMonth(transactions, thisYear, month).totalExpense.value
  );

  // // 차트 데이터 갱신 예시
  // data.labels = transactions.value.map((t) => t.date);
  // data.datasets[0].data = transactions.value.map((t) =>
  //   t.type === "income" ? t.amount : 0
  // );
  // data.datasets[1].data = transactions.value.map((t) =>
  //   t.type === "expense" ? t.amount : 0
  // );
});

// 가져온 데이터에 맞게 값 넣기
const data = computed(() => ({
  labels: monthLabels?.value,
  datasets: [
    {
      label: "수익",
      borderColor: "#4f48dc",
      backgroundColor: "#ffffff",
      data: sixMonthIncome?.value,
    },
    {
      label: "지출",
      borderColor: "#DC2626",
      backgroundColor: "#ffffff",
      data: sixMonthExpense?.value,
    },
  ],
}));

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
          ₩{{ thisMonthIncome ? thisMonthIncome.toLocaleString() : 0 }}
        </p>
      </div>
      <div class="expense-box">
        <p id="this-month-text">이번 달 지출</p>
        <p id="expense-amount">
          ₩{{ thisMonthExpense ? thisMonthExpense.toLocaleString() : 0 }}
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
