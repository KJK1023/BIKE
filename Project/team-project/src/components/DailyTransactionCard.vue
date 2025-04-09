<template>
  <div class="card-box">
    <h1 id="title-text">거래 내역</h1>
    <ul>
      <li v-for="(day, index) in transactionData">
        <div class="text-wrapper">
          <p id="semititle-text">{{ day.category }}</p>
          <p id="date-text">{{ day.date }}</p>
        </div>
        <p v-if="day.type === 'income'" id="income-amount">
          +{{ day.amount.toLocaleString() }}원
        </p>
        <p v-if="day.type === 'expense'" id="expense-amount">
          -{{ day.amount.toLocaleString() }}원
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup>
const transactionData = [
  { category: "ietc", amount: 10000000, type: "income", date: "2024-05-01" },
  { category: "ietc", amount: 4000, type: "income", date: "2024-05-01" },
  { category: "ietc", amount: 9000, type: "expense", date: "2024-05-01" },
];
</script>

<style scoped>
.card-box {
  width: 384px;
  height: 270px;
  background-color: #fff;
  padding: 26px;
  border-radius: 8px;
  box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.1),
    0px 1px 3px 0px rgba(0, 0, 0, 0.1);
}
#title-text {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}
ul {
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
li {
  list-style: none;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 5px;
}
.text-wrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
#semititle-text {
  font-size: 14px;
  font-weight: 500;
  margin: 0;
}
#date-text {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}
#income-amount {
  font-size: 16px;
  color: #4f46e5;
  font-weight: 600;
}
#expense-amount {
  font-size: 16px;
  color: #dc2626;
  font-weight: 600;
}
</style>
