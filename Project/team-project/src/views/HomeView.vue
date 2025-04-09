import LineGraph from "../components/LineGraph.vue";
import CircleGraph from "../components/CircleGraph.vue";
import WeeklyTransaction from "../components/WeeklyTransaction.vue";
import TransactionList from "../components/TransactionList.vue";
import PiniaTest from "@/components/PiniaTest.vue";

</script>
<template>
<div style="display: flex; flex-direction: column; gap: 20px">
  <div style="display: flex">
    <LineGraph />
    <CircleGraph />
  </div>
  <WeeklyTransaction />
  <div class="weekly-box">
    <div class="title-wrapper">
      <h1 class="title-text">거래 내역</h1>
      <div class="view-all-wrapper">
        <a id="view-all" href="/transactions">전체 보기</a>
        <i id="chevron-right" class="fa-solid fa-chevron-right"></i>
      </div>
    </div>
    <TransactionList />
  </div>
  <div>
    <PiniaTest />
  </div>
</div>
</template>

<style scoped>
.title-text {
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>