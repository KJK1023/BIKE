<template>
  <tr class="border-bottom">
    <td class="text-secondary">{{ transaction.date }}</td>
    <td>
      <span :class="['category-badge-rounded', transaction.type === 'income' ? 'text-success-category' : 'text-danger-category']">
        {{ translateCategory(transaction.category) }}
      </span>
    </td>
    <td class="text-secondary">{{ transaction.description }}</td>
    <td :class="transaction.type === 'income' ? 'text-success-amount' : 'text-danger-amount'">
      {{ formatAmount(transaction.amount, transaction.type) }}
    </td>
    <td class="text-secondary">{{ transaction.memo || '-' }}</td>
    <td class="text-center">
      <button class="btn btn-sm btn-link text-primary p-0 me-2" @click="onEditTransaction">
        <img src="@/assets/EDIT_BUTTON.svg" alt="수정" style="width: 1em; height: 1em; vertical-align: middle;">
      </button>
      <button class="btn btn-sm btn-link text-danger p-0" @click="onDeleteTransaction">
        <img src="@/assets/BUTTON.svg" alt="삭제" style="width: 1em; height: 1em; vertical-align: middle;">
      </button>
    </td>
  </tr>
</template>

<script>
import { useTransactionStore } from '@/stores/transaction-store';
import { translateCategory } from '@/utils/translate-category'; // translateCategory 함수 import

export default {
  name: 'TransactionListItem',
  props: {
    transaction: {
      type: Object,
      required: true
    }
  },
  setup() {
    // Pinia store를 사용하기 위해 setup() 함수 내에서 호출
    const transactionStore = useTransactionStore();
    return {
      transactionStore
    };
  },
  methods: {
    translateCategory, // translateCategory 메서드 추가
    formatAmount(amount, type) {
      const formattedAmount = amount.toLocaleString();
      return type === 'income' ? `+${formattedAmount}원` : `-${formattedAmount}원`;
    },
    onEditTransaction() {
      // Pinia store의 데이터를 업데이트하고 싶다면 여기서 사용할 수 있습니다
      this.$emit('edit-transaction', {
        type: this.transaction.type,
        transaction: this.transaction
      });
    },
    onDeleteTransaction() {
      // Pinia store의 데이터를 업데이트하고 싶다면 여기서 사용할 수 있습니다
      this.$emit('delete-transaction', {
        type: this.transaction.type,
        transaction: this.transaction
      });
    }
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