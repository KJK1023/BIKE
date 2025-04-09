<script>
import LineGraph from "../components/LineGraph.vue";
import WeeklyTransaction from "../components/WeeklyTransaction.vue";

export default {
  components: {
    LineGraph,
    WeeklyTransaction,
  },
};
</script>

<template>
  <line-graph />
  <weekly-transaction />
</template>
