<script setup></script>

<template>
  <div class="graph-box">
    <div class="inner-box">
      <div class="income-box">
        <p id="this-month-text">이번 달 수익</p>
        <p id="income-amount">₩3,250,000</p>
      </div>
      <div class="expense-box">
        <p id="this-month-text">이번 달 지출</p>
        <p id="expense-amount">₩2,180,000</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.graph-box {
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
}
.income-box {
  background-color: #eef2ff;
  border-radius: 8px;
  width: 100%;
  height: 84px;
  padding: 10px;
  align-content: center;
}
.expense-box {
  background-color: #fef2f2;
  border-radius: 8px;
  width: 100%;
  height: 84px;
  padding: 10px;
  align-content: center;
}
#income-amount {
  color: #4f46e5;
  font-size: 24px;
  font-weight: bold;
}
#expense-amount {
  color: #dc2626;
  font-size: 24px;
  font-weight: bold;
}
#this-month-text {
  color: #6b7280;
  font-size: 14px;
}
</style>
