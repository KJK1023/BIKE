<template>
  <div class="card card-body">
    {{ users }}
    <br />
    {{ transactions }}
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useTransactionStore } from "@/stores/transaction-store";
import { useUserStore } from "@/stores/user-store";

const transactionStore = useTransactionStore();
const userStore = useUserStore();

const transactions = computed(() => transactionStore.transactionInfo);

const users = computed(() => userStore.userInfo);

const loadTransaction = async () => {
  await transactionStore.fetchTransaction();
};

const loadUser = async () => {
  await userStore.fetchUser();
};

onMounted(async () => {
  await loadUser();
  await loadTransaction();
});
</script>
