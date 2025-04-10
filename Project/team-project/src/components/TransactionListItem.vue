<template>
  <tr class="border-bottom">
    <td class="text-secondary">{{ transaction.date }}</td>
    <td>
      <span
        :class="[
          'category-badge-rounded',
          transaction.type === 'income'
            ? 'text-success-category'
            : 'text-danger-category',
        ]"
      >
        {{ translateCategory(transaction.category) }}
      </span>
    </td>
    <td class="text-secondary">{{ transaction.description }}</td>
    <td
      :class="
        transaction.type === 'income'
          ? 'text-success-amount'
          : 'text-danger-amount'
      "
    >
      {{ formatAmount(transaction.amount, transaction.type) }}
    </td>
    <td class="text-secondary">{{ transaction.memo || "-" }}</td>
    <td class="text-center">
      <button
        class="btn btn-sm btn-link text-primary p-0 me-2"
        @click="onEditTransaction"
      >
        <img
          src="@/assets/EDIT_BUTTON.svg"
          alt="수정"
          style="width: 1em; height: 1em; vertical-align: middle"
        />
      </button>
      <button
        class="btn btn-sm btn-link text-danger p-0"
        @click="
          () => {
            console.log('click');
            onDeleteTransaction(transaction.id);
          }
        "
      >
        <img
          src="@/assets/BUTTON.svg"
          alt="삭제"
          style="width: 1em; height: 1em; vertical-align: middle"
        />
      </button>
    </td>
  </tr>
</template>

<script setup>
import { useTransactionStore } from "@/stores/transaction-store";
import { translateCategory } from "@/utils/translate-category";
import { toRefs } from "vue";

const props = defineProps({
  transaction: {
    type: Object,
    required: true,
  },
});

console.log(props.transaction);

const transactionStore = useTransactionStore();

const emit = defineEmits(["edit-transaction", "delete-transaction"]);

const formatAmount = (amount, type) => {
  const formattedAmount = amount.toLocaleString();
  return type === "income" ? `+${formattedAmount}원` : `-${formattedAmount}원`;
};

const onEditTransaction = () => {
  emit("edit-transaction", {
    type: props.transaction.type,
    transaction: props.transaction,
  });
};

const onDeleteTransaction = (id) => {
  const confirmed = window.confirm("정말로 삭제하시겠습니까?");
  if (confirmed) {
    transactionStore.deleteTransaction(id);
  }
};
</script>

<style scoped>
.category-badge-rounded {
  display: inline-block;
  padding: 0.2em 0.6em;
  font-size: 0.8em;
  border-radius: 1rem;
  white-space: nowrap;
}
.text-success-category {
  color: #198754 !important;
  background-color: #d1e7dd;
}
.text-danger-category {
  color: #dc3545 !important;
  background-color: #f8d7da;
}
.text-success-amount {
  color: #198754 !important;
}
.text-danger-amount {
  color: #dc3545 !important;
}
</style>
