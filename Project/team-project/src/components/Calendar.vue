<template>
  <div class="calendar-wrapper">
    <VCalendar borderless>
      <template #day-content="{ day }">
        <div
          class="custom-day"
          :class="{ highlight: isHighlighted(formatDate(day.date)) }"
          @click="() => selectDate(formatDate(day.date))"
        >
          <div>{{ day.day }}</div>
          <div v-if="incomeExpenseMap[formatDate(day.date)]">
            <p class="income">
              +
              {{
                incomeExpenseMap[formatDate(day.date)]?.income?.toLocaleString()
              }}
            </p>
            <p class="expense">
              -
              {{
                incomeExpenseMap[
                  formatDate(day.date)
                ]?.expense?.toLocaleString()
              }}
            </p>
          </div>
        </div>
      </template>
    </VCalendar>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useTransactionStore } from "@/stores/transaction-store";
import { formatDate } from "../utils/format-date";
import { useCalendarStore } from "@/stores/calendar-store";

const transactionStore = useTransactionStore();
const selectedDate = ref(formatDate(new Date()));
const incomeExpenseMap = ref({});
const calendarStore = useCalendarStore();

const selectDate = (dateStr) => {
  calendarStore.selectedDate = dateStr;
};

const isHighlighted = (dateStr) => {
  return selectedDate.value === dateStr;
};

//데이터 가져오기
onMounted(async () => {
  await transactionStore.fetchTransaction();
  const transactions = transactionStore.transactionInfo;

  // 잘 찍힘
  console.log(transactions);

  const map = {};

  // 날짜별로 수입/지출 정리
  transactions.forEach((item) => {
    const date = formatDate(new Date(item.date));
    // console.log(`날짜 데이터 : ${date}`);
    if (!map[date]) {
      map[date] = { income: 0, expense: 0 };
    }
    if (item.type === "income") {
      map[date].income += item.amount;
    } else if (item.type === "expense") {
      map[date].expense += item.amount;
    }

    // console.log(`map[date].income : ${map[date].income}`);
    // console.log(`map[date].expense : ${map[date].expense}`);
  });

  incomeExpenseMap.value = map;
  console.log(
    "incomeExpenseMap.value = ",
    JSON.stringify(incomeExpenseMap.value, null, 2)
  );
});
</script>

<style scoped>
:deep(.vc-container) {
  width: 790px;
  height: 680px;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.1),
    0px 1px 3px 0px rgba(0, 0, 0, 0.1);
}
:deep(.vc-header),
:deep(.vc-weekday) {
  margin-bottom: 15px !important;
}
:deep(.vc-title) {
  border-radius: 8px !important;
  font-size: 20px !important;
}
:deep(button) {
  background-color: transparent !important;
  border-radius: 100% !important;
}
:deep(button:hover) {
  background-color: hsla(211, 25%, 84%, 0.3) !important;
}
:deep(.vc-day) {
  height: 110px;
}
.custom-day {
  display: flex;
  height: 80%;
  flex-direction: column;
  font-size: 12px;
  border-radius: 8px;
  margin: 4px;
  padding: 8px;
  cursor: pointer;
}
.custom-day:hover {
  background-color: hsla(211, 25%, 84%, 0.3) !important;
}
.highlight {
  background-color: #e0e7ff;
}
.highlight:hover {
  background-color: #e0e7ff !important;
}
.income {
  color: #16a34a;
  background-color: rgba(22, 163, 74, 0.1);
  padding: auto 8px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 13px;
  margin-top: 2px;
}

.expense {
  color: #dc2626;
  background-color: rgba(220, 38, 38, 0.1);
  padding: auto 8px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 13px;
}
</style>
