<script>
import TransactionList from "../components/TransactionList.vue";
import FilterBar from "../components/FilterBar.vue";
import TransactionButton from "../components/TransactionButton.vue";
import Pagination from "../components/Pagination.vue";
import InputForm from "../components/InputForm.vue";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default {
  components: {
    TransactionList,
    FilterBar,
    TransactionButton,
    Pagination,
    InputForm
  },
  
  data() {
    return {
      totalItems: 0,
      currentPage: 1,
      itemsPerPage: 10,
      showInputModal: false,
      editingTransaction: null, // 수정할 트랜잭션 정보 저장
      userData: {
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
      }
    };
  },
  
  methods: {
    updateTotalItems(count) {
      this.totalItems = count;
    },
    
    handlePageChange(page) {
      this.currentPage = page;
    },
    
    handleItemsPerPageChange(items) {
      this.itemsPerPage = items;
      this.currentPage = 1; // 페이지 크기가 변경되면 첫 페이지로 이동
    },
    
    openInputModal() {
      this.showInputModal = true;
    },
    
    closeInputModal() {
      this.showInputModal = false;
      this.editingTransaction = null;
    },
    
    handleFormSubmit(formData) {
      // 새 거래 추가 로직
      if (!this.editingTransaction) {
        if (formData.type === 'income') {
          this.userData.income.push({
            date: formData.date,
            category: formData.category,
            amount: Number(formData.amount),
            memo: formData.content
          });
        } else {
          this.userData.expense.push({
            date: formData.date,
            category: formData.category,
            amount: Number(formData.amount),
            memo: formData.content
          });
        }
      } 
      // 기존 거래 수정 로직
      else {
        const { type, index } = this.editingTransaction;
        const transactionList = type === 'income' ? this.userData.income : this.userData.expense;
        
        transactionList[index] = {
          date: formData.date,
          category: formData.category,
          amount: Number(formData.amount),
          memo: formData.content
        };
      }
      
      this.closeInputModal();
    },

    handleTransactionEdit(editData) {
      // 수정할 트랜잭션 정보 설정
      this.editingTransaction = editData;
      this.showInputModal = true;
    },

    handleTransactionDelete(deleteData) {
      // 실제 삭제 로직 구현
      if (deleteData.type === 'income') {
        this.userData.income.splice(deleteData.index, 1);
      } else {
        this.userData.expense.splice(deleteData.index, 1);
      }
    }
  }
};
</script>

<template>
  <div class="container">
    <div class="transaction-page">
      <div class="header-section">
        <filter-bar class="filter-container" />
        <div class="button-wrapper">
          <transaction-button @click="openInputModal" />
        </div>
      </div>
      
      <div class="list-container">
        <transaction-list 
          :userData="userData"
          :currentPage="currentPage"
          :itemsPerPage="itemsPerPage"
          @update:totalItems="updateTotalItems"
          @edit-transaction="handleTransactionEdit"
          @delete-transaction="handleTransactionDelete"
        />
      </div>
      
      <div class="pagination-container">
        <pagination
          :totalItems="totalItems"
          :currentPage="currentPage"
          :itemsPerPage="itemsPerPage"
          @page-change="handlePageChange"
          @items-per-page-change="handleItemsPerPageChange"
        />
      </div>
      
      <!-- 거래 입력/수정 모달 -->
      <input-form 
        :visible="showInputModal" 
        :initialData="editingTransaction ? {
          type: editingTransaction.type,
          date: editingTransaction.transaction.date,
          category: editingTransaction.transaction.category,
          amount: editingTransaction.transaction.amount,
          content: editingTransaction.transaction.memo
        } : null"
        @close="closeInputModal"
        @submit="handleFormSubmit"
      />
    </div>
  </div>
</template>

<style scoped>
/* 기존 스타일 그대로 유지 */
.container {
  display: flex;
  justify-content: center;
  width: 1400px;
  background-color: white;
  margin-top: 40px;
  box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.1),
  0px 1px 3px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
.transaction-page {
  position: relative;
  width: 100%;
  max-width: 1400px;
  margin: 20px 0;
  padding: 0;
}

.header-section {
  position: relative;
  margin-bottom: 10px;
  width: 100%;
}

.filter-container {
  width: 100%;
}

.button-wrapper {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
}

.list-container {
  width: 100%;
  overflow-x: auto;
}
.pagination-container {
  margin-top: -5px; /* 상단 간격 줄이기 */
  margin-left: 8px;
  display: flex;
}

/* 기존 deep 선택자 스타일 그대로 유지 */
:deep(.transaction-list) {
  width: 100%;
}

:deep(.table-responsive) {
  width: 100%;
  overflow-x: visible;
  border: none;
}

/* 나머지 스타일은 동일하게 유지 */
</style>