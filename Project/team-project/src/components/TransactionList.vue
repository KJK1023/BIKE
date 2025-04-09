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
          <tr v-if="paginatedTransactions.length === 0">
            <td colspan="6" class="text-center py-4 text-muted">
              거래 내역이 없습니다.
            </td>
          </tr>
          <TransactionListItem
            v-for="(transaction, index) in paginatedTransactions"
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
    userData: {
      type: Object,
      default: () => ({
        id: 'user123',
        name: '홍길동',
        email: 'user@example.com',
        income: [],
        expense: []
      })
    },
    currentPage: {
      type: Number,
      default: 1
    },
    itemsPerPage: {
      type: Number,
      default: 10
    }
  },

  computed: {
    transactions() {
      const incomeTransactions = this.userData.income.map(item => ({
        ...item,
        type: 'income',
        description: item.memo
      }));

      const expenseTransactions = this.userData.expense.map(item => ({
        ...item,
        type: 'expense',
        description: item.memo
      }));

      return [...incomeTransactions, ...expenseTransactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    
    totalItems() {
      return this.transactions.length;
    },
    
    paginatedTransactions() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.transactions.slice(start, end);
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
    formatAmount(amount, type) {
      const formattedAmount = amount.toLocaleString();
      return type === 'income' ? `+${formattedAmount}원` : `-${formattedAmount}원`;
    },

    editTransaction(transactionData) {
      const { type, transaction } = transactionData;
      const transactionList = type === 'income' ? this.userData.income : this.userData.expense;
      const actualIndex = transactionList.findIndex(item => 
        item.date === transaction.date &&
        item.category === transaction.category &&
        item.amount === transaction.amount
      );

      this.$emit('edit-transaction', {
        type,
        index: actualIndex,
        transaction
      });
    },

    deleteTransaction(transactionData) {
      const { type, transaction } = transactionData;
      const transactionList = type === 'income' ? this.userData.income : this.userData.expense;
      const actualIndex = transactionList.findIndex(item => 
        item.date === transaction.date &&
        item.category === transaction.category &&
        item.amount === transaction.amount
      );

      this.$emit('delete-transaction', {
        type,
        index: actualIndex
      });
    }
  }
};
</script>

<style scoped>
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