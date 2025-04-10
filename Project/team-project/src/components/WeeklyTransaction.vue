<template>
  <div class="weekly-box">
    <div class="title-wrapper">
      <h1 id="title-text">주간 수입/지출 현황</h1>
      <div class="view-all-wrapper">
        <a id="view-all" href="/calendar">전체 보기</a>
        <i id="chevron-right" class="fa-solid fa-chevron-right"></i>
      </div>
    </div>
    <div class="daily-list" v-if="filteredData.length > 0">
      <div class="daily-box" v-for="(data, index) in filteredData" :key="index">
        <p id="day">{{ data.day }}</p>
        <p id="date">{{ data.date }}</p>
        <p id="total-income">+{{ data.income?.toLocaleString() }}</p>
        <p id="total-expense">-{{ data.expense?.toLocaleString() }}</p>
      </div>
    </div>
    <div v-else>
      <p>데이터 불러오는 중</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useTransactionStore } from "../stores/transaction-store";
import { getThisWeekDates } from "@/utils/get-this-week-dates";
import { formatToMonthDay } from "@/utils/format-date";

const transactionStore = useTransactionStore();
const transactions = computed(() => transactionStore.transactionInfo);

// yyyy-mm-dd 포맷의 이번주 날짜
const weekDates = getThisWeekDates();
const dayMap = ["일", "월", "화", "수", "목", "금", "토"];

const filteredData = computed(() => {
  if (!transactions.value) return [];

  return weekDates.map((date) => {
    const day = dayMap[new Date(date).getDay()];
    const formattedDate = formatToMonthDay(date);

    const transaction = transactions.value.filter((item) => item.date === date);

    const totalIncome = transaction.reduce(
      (sum, t) => sum + (t.type === "income" ? t.amount : 0),
      0
    );

    const totalExpense = transaction.reduce(
      (sum, t) => sum + (t.type === "expense" ? t.amount : 0),
      0
    );

    return {
      day,
      date: formattedDate,
      income: transaction ? totalIncome : 0,
      expense: transaction ? totalExpense : 0,
    };
  });
});

onMounted(async () => {
  await transactionStore.fetchTransaction();
});
</script>

<style>
.weekly-box {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 100%;
  gap: 10px;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.1),
    0px 1px 3px 0px rgba(0, 0, 0, 0.1);
}
.title-wrapper {
  display: flex;
  align-items: center;
  gap: 18px;
}
#title-text {
  font-size: 18px;
}
.view-all-wrapper {
  display: flex;
  cursor: pointer;
  gap: 5px;
  align-items: center;
}
#view-all {
  color: #4f46e5;
  text-decoration: none;
  cursor: pointer;
}
#chevron-right {
  color: #4f46e5;
  margin-bottom: 2px;
}
#view-all:hover {
  text-decoration: underline;
}
.daily-list {
  display: flex;
  justify-content: space-between;
}
.daily-box {
  align-items: center;
  width: 135px;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  border-radius: 8px;
}
#day {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
}
#date {
  font-size: 14px;
  font-weight: 600;
  color: #4b5563;
  margin: 0;
}
#total-income {
  color: #16a34a;
  font-size: 14px;
  margin: 0;
}
#total-expense {
  color: #dc2626;
  font-size: 14px;
  margin: 0;
}
</style>
