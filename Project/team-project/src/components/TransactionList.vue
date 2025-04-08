<template>
  <div class="transaction-list">
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr class="table-header">
            <th scope="col">날짜</th>
            <th scope="col">카테고리</th>
            <th scope="col">내용</th>
            <th scope="col">금액</th>
            <th scope="col">메모</th>
            <th scope="col" class="text-center">작업</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="transactions.length === 0">
            <td colspan="6" class="text-center py-4 text-muted">
              거래 내역이 없습니다.
            </td>
          </tr>
          <tr v-for="(transaction, index) in transactions"
              :key="index"
              class="border-bottom">
            <td>{{ transaction.date }}</td>
            <td>
              <span :class="['category-badge-rounded', transaction.type === 'income' ? 'text-success-category' : 'text-danger-category']">
                {{ transaction.category }}
              </span>
            </td>
            <td>{{ transaction.description }}</td>
            <td :class="transaction.type === 'income' ? 'text-success-amount' : 'text-danger-amount'">
              {{ formatAmount(transaction.amount, transaction.type) }}
            </td>
            <td>{{ transaction.memo || '-' }}</td>
            <td class="text-center">
              <button class="btn btn-sm btn-link text-primary p-0 me-2" @click="editTransaction(transaction, index)">
                <img src="@/assets/EDIT_BUTTON.svg" alt="수정" style="width: 1em; height: 1em; vertical-align: middle;">
              </button>
              <button class="btn btn-sm btn-link text-danger p-0" @click="deleteTransaction(transaction, index)">
                <img src="@/assets/BUTTON.svg" alt="삭제" style="width: 1em; height: 1em; vertical-align: middle;">
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionList',

  props: {
    userData: {
      type: Object,
      default: () => ({
        id: 'user123',
        name: '홍길동',
        email: 'user@example.com',
        income: [
          {
            date: '2024-02-15',
            category: '급여',
            amount: 3200000,
            memo: '2월 급여'
          }
        ],
        expense: [
          {
            date: '2024-02-14',
            category: '식비',
            amount: 12000,
            memo: '점심식사'
          },
          {
            date: '2024-02-13',
            category: '쇼핑',
            amount: 89000,
            memo: '겨울 옷'
          },
          {
            date: '2024-02-13',
            category: '교통비',
            amount: 1500,
            memo: '출근'
          },
          {
            date: '2024-02-12',
            category: '문화생활',
            amount: 15000,
            memo: '주말 영화'
          }
        ]
      })
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
    }
  },

  methods: {
    formatAmount(amount, type) {
      const formattedAmount = amount.toLocaleString();
      return type === 'income' ? `+${formattedAmount}원` : `-${formattedAmount}원`;
    },

    getCategoryClass(category, type) {
      return type === 'income' ? 'text-success' : 'text-danger';
    },

    editTransaction(transaction, index) {
      const actualIndex = transaction.type === 'income'
        ? this.userData.income.findIndex(item =>
            item.date === transaction.date &&
            item.category === transaction.category &&
            item.amount === transaction.amount)
        : this.userData.expense.findIndex(item =>
            item.date === transaction.date &&
            item.category === transaction.category &&
            item.amount === transaction.amount);

      this.$emit('edit-transaction', {
        type: transaction.type,
        index: actualIndex,
        transaction
      });
    },

    deleteTransaction(transaction, index) {
      if (confirm('이 거래 내역을 삭제하시겠습니까?')) {
        const actualIndex = transaction.type === 'income'
          ? this.userData.income.findIndex(item =>
              item.date === transaction.date &&
              item.category === transaction.category &&
              item.amount === transaction.amount)
          : this.userData.expense.findIndex(item =>
              item.date === transaction.date &&
              item.category === transaction.category &&
              item.amount === transaction.amount);

        this.$emit('delete-transaction', {
          type: transaction.type,
          index: actualIndex
        });
      }
    }
  }
};
</script>

<style scoped>
.transaction-list {
  margin-bottom: 1.5rem;
}

.text-primary {
  color: #4f48dc !important;
}

.table {
  border-collapse: separate;
  border-spacing: 0;
}

.table-header {
  border-top: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
  background-color: #f8f9fa;
}

.table th {
  padding: 0.75rem;
  font-weight: 500;
  color: #495057;
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