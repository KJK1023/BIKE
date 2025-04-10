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
import { computed, onMounted, ref, watch } from 'vue';
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
  emits: ['edit-transaction', 'delete-transaction', 'update:totalItems'],
  setup(props, { emit }) {
    const transactionStore = useTransactionStore();
    const filteredTransactions = ref([]);

    onMounted(async () => {
      console.log('List: TransactionList 마운트됨');
      await transactionStore.fetchTransaction();
      console.log('List: 초기 데이터 로딩 완료:', transactionStore.transactionInfo);
      // 초기에는 전체 데이터를 필터링된 데이터로 설정
      filteredTransactions.value = [...transactionStore.transactionInfo];
      console.log('List: filteredTransactions 초기화:', filteredTransactions.value);
    });

    // 필터링된 거래 내역 (날짜 기준 내림차순 정렬)
    const sortedFilteredTransactions = computed(() => {
      return filteredTransactions.value.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    });

    // 화면에 표시될 트랜잭션 (페이지네이션 및 컴팩트 뷰 적용)
    const displayedTransactions = computed(() => {
      if (props.isCompactView) {
        const compactData = sortedFilteredTransactions.value.slice(0, props.compactItemCount);
        console.log('List: 표시할 (컴팩트):', compactData);
        return compactData;
      }
      const start = (props.currentPage - 1) * props.itemsPerPage;
      const end = start + props.itemsPerPage;
      const pagedData = sortedFilteredTransactions.value.slice(start, end);
      console.log('List: 표시할 (페이지):', pagedData, '시작:', start, '끝:', end, '총 필터링된 항목:', sortedFilteredTransactions.value.length);
      return pagedData;
    });

    // 총 아이템 수 (필터링된 데이터 기준)
    const totalItems = computed(() => {
      console.log('List: 총 필터링된 아이템 수:', filteredTransactions.value.length);
      return filteredTransactions.value.length;
    });

    // totalItems 값이 변경될 때마다 이벤트 발생
    watch(totalItems, (value) => {
      emit('update:totalItems', value);
    }, { immediate: true });

    // 트랜잭션 편집 이벤트 핸들러 (자식 컴포넌트에서 발생)
    const editTransaction = (transactionData) => {
      emit('edit-transaction', transactionData);
    };

    // 트랜잭션 삭제 이벤트 핸들러 (자식 컴포넌트에서 발생)
    const deleteTransaction = (transactionData) => {
      emit('delete-transaction', transactionData);
    };

    // 외부 컴포넌트(TransactionFilterBar)로부터 필터링된 데이터를 받는 메서드
    const handleFilterTransactions = (newFilteredTransactions) => {
      console.log('List: 필터링된 데이터 받음:', newFilteredTransactions);
      filteredTransactions.value = newFilteredTransactions;
      console.log('List: filteredTransactions 업데이트됨:', filteredTransactions.value);
      // emit('update:currentPage', 1); // 필요하다면 페이지를 1로 초기화
    };

    // Pinia store에서 전체 거래 데이터를 가져오는 getter 추가
    const getAllTransactions = () => {
      return transactionStore.transactionInfo;
    };

    return {
      transactionStore,
      filteredTransactions,
      sortedFilteredTransactions,
      displayedTransactions,
      totalItems,
      editTransaction,
      deleteTransaction,
      handleFilterTransactions,
      getAllTransactions // 추가된 메서드: 전체 거래 데이터 반환
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