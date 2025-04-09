<script setup>
import LineGraph from "../components/LineGraph.vue";
import CircleGraph from "../components/CircleGraph.vue";
import WeeklyTransaction from "../components/WeeklyTransaction.vue";
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px">
    <div style="display: flex">
      <LineGraph />
      <CircleGraph />
    </div>
    <WeeklyTransaction />
  </div>
</template>
