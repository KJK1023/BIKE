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
import { computed, onMounted, watch } from 'vue';
import TransactionListItem from './TransactionListItem.vue';
import { useTransactionStore } from '@/stores/transaction-store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default {
  name: 'TransactionList',
  components: {
    TransactionListItem
  },
  props: {
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
  setup(props, { emit }) {
    // Pinia store 사용
    const transactionStore = useTransactionStore();
    
    // 컴포넌트가 마운트될 때 거래 내역 데이터 가져오기
    onMounted(async () => {
      await transactionStore.fetchTransaction();
    });
    
    // 정렬된 트랜잭션
    const sortedTransactions = computed(() => {
      return transactionStore.transactionInfo
        .slice() // 원본 배열을 변경하지 않도록 복사
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    });
    
    // 총 아이템 수
    const totalItems = computed(() => sortedTransactions.value.length);
    
    // 페이지네이션 적용된 트랜잭션
    const paginatedTransactions = computed(() => {
      const start = (props.currentPage - 1) * props.itemsPerPage;
      const end = start + props.itemsPerPage;
      return sortedTransactions.value.slice(start, end);
    });
    
    // 화면에 표시될 트랜잭션
    const displayedTransactions = computed(() => {
      // 컴팩트 뷰인 경우 정해진 개수만 표시
      if (props.isCompactView) {
        return sortedTransactions.value.slice(0, props.compactItemCount);
      }
      // 아닌 경우 페이지네이션 적용
      return paginatedTransactions.value;
    });
    
    // totalItems 값이 변경될 때마다 이벤트 발생
    watch(totalItems, (value) => {
      emit('update:totalItems', value);
    }, { immediate: true });
    
    // 트랜잭션 편집 이벤트 핸들러
    const editTransaction = (transactionData) => {
      emit('edit-transaction', transactionData);
    };
    
    // 트랜잭션 삭제 이벤트 핸들러
    const deleteTransaction = (transactionData) => {
      emit('delete-transaction', transactionData);
    };
    
    return {
      transactionStore,
      sortedTransactions,
      totalItems,
      paginatedTransactions,
      displayedTransactions,
      editTransaction,
      deleteTransaction
    };
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