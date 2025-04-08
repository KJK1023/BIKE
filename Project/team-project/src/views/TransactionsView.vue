<script>
import TransactionList from "../components/TransactionList.vue";
import FilterBar from "../components/FilterBar.vue";


export default {
  components: {
    TransactionList,
    FilterBar
  },
};
</script>

<template>
  <filter-bar/>
  <transaction-list />
</template>
