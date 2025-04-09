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
import { ref } from "vue";
import { formatDate } from "../utils/format-date";

const incomeExpenseMap = {
  "2025-04-08": { income: 20000, expense: 10000 },
  "2025-04-09": { income: 50000, expense: 32000 },
  "2025-04-10": { income: 40000, expense: 10000 },
};

const selectedDate = ref(formatDate(new Date()));

const selectDate = (dateStr) => {
  selectedDate.value = dateStr;
};

const isHighlighted = (dateStr) => {
  return selectedDate.value === dateStr;
};
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
  margin: 0;
}
.expense {
  color: #dc2626;
  margin: 0;
}
</style>
