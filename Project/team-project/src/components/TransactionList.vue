<template>
  <div class="transaction-list">
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr class="table-header">
            <th scope="col" class="text-secondary">날짜</th>
            <th scope="col" class="text-secondary">카테고리</th>
            <th scope="col" class="text-secondary">내용</th>
            <th scope="col" class="text-secondary">금액</th>
            <th scope="col" class="text-secondary">메모</th>
            <th scope="col" class="text-center text-secondary">작업</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="displayedTransactions.length === 0">
            <td colspan="6" class="text-center py-4 text-muted">
              거래 내역이 없습니다.
            </td>
          </tr>
          <TransactionListItem
            v-for="(transaction, index) in displayedTransactions"
            :key="`${transaction.type}-${transaction.date}-${transaction.amount}`"
            :transaction="transaction"
            @edit-transaction="editTransaction"
            @delete-transaction="deleteTransaction"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import TransactionListItem from './TransactionListItem.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default {
  name: 'TransactionList',
  components: {
    TransactionListItem
  },
  props: {
    transactions: {
      type: Array,
      default: () => []
    },
    currentPage: {
      type: Number,
      default: 1
    },
    itemsPerPage: {
      type: Number,
      default: 10
    },
    isCompactView: {
      type: Boolean,
      default: false
    },
    compactItemCount: {
      type: Number,
      default: 3
    }
  },
  computed: {
    sortedTransactions() {
      return this.transactions
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    totalItems() {
      return this.sortedTransactions.length;
    },
    paginatedTransactions() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.sortedTransactions.slice(start, end);
    },
    displayedTransactions() {
      // 컴팩트 뷰인 경우 정해진 개수만 표시
      if (this.isCompactView) {
        return this.sortedTransactions.slice(0, this.compactItemCount);
      }
      // 아닌 경우 페이지네이션 적용
      return this.paginatedTransactions;
    }
  },
  watch: {
    totalItems: {
      immediate: true,
      handler(value) {
        this.$emit('update:totalItems', value);
      }
    }
  },
  methods: {
    editTransaction(transactionData) {
      this.$emit('edit-transaction', transactionData);
    },
    deleteTransaction(transactionData) {
      this.$emit('delete-transaction', transactionData);
    }
  }
};
</script>

<style scoped>
/* 기존 스타일 유지 */
.transaction-list {
  margin-bottom: 1.5rem;
  width: 100%;
}
.text-primary {
  color: #4f48dc !important;
}
.text-secondary {
  color: #6c757d !important;
  background-color: #f5f5f5 !important;
}
.table {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
}
.table-responsive {
  width: 100%;
  overflow-x: auto;
}
.table-header {
  border-top: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
  background-color: #f8f9fa;
}
.table th {
  padding: 0.75rem;
  font-weight: 500;
  color: #6c757d;
}
.table td {
  padding: 0.75rem;
  vertical-align: middle;
  border-bottom: 1px solid #dee2e6;
}
.border-bottom {
  border-bottom: 1px solid #dee2e6;
}
tr:hover {
  background-color: rgba(0, 0, 0, 0.01);
}
tr.selected {
  background-color: rgba(13, 110, 253, 0.08);
}
</style>