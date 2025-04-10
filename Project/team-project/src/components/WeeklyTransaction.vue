<template>
  <div class="weekly-box">
    <div class="title-wrapper">
      <h1 id="title-text">주간 수입/지출 현황</h1>
      <div class="view-all-wrapper">
        <a id="view-all" href="/calendar">전체 보기</a>
        <i id="chevron-right" class="fa-solid fa-chevron-right"></i>
      </div>
    </div>
    <div class="daily-list">
      <div class="daily-box" v-for="(day, index) in weekData" :key="index">
        <p id="day">{{ day.day }}</p>
        <p id="date">{{ day.date }}</p>
        <p id="total-income">+{{ day.income.toLocaleString() }}</p>
        <p id="total-expense">-{{ day.expense.toLocaleString() }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const weekData = [
  { day: "월", date: "4/8", income: 500000, expense: 32000 },
  { day: "화", date: "4/9", income: 240000, expense: 78000 },
  { day: "수", date: "4/10", income: 190000, expense: 120000 },
  { day: "목", date: "4/11", income: 220000, expense: 65000 },
  { day: "금", date: "4/12", income: 330000, expense: 90000 },
  { day: "토", date: "4/13", income: 100000, expense: 23000 },
  { day: "일", date: "4/14", income: 180000, expense: 45000 },
];
</script>

<style>
.weekly-box {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 1140px;
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
