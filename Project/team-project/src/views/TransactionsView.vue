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
      editingTransaction: null,
      userData: {
        currentUser: {
          id: 'aaa', // 로그인된 사용자 ID
          name: '홍길동'
        }
      },
      data: {
        user: [
          {
            id: 'aaa',
            pw: 'bbb',
            name: 'human1',
            email: 'human1@gmail.com'
          },
          // 다른 사용자들...
        ],
        transaction: [
          {
            id: 'aaa',
            type: 'income',
            date: '2024-06-13',
            category: '형은빠져있어',
            amount: 3000,
            memo: '길에서 주웠다'
          },
          // 다른 트랜잭션들...
        ]
      }
    };
  },
  
  computed: {
    currentUserTransactions() {
      return this.data.transaction.filter(
        transaction => transaction.id === this.userData.currentUser.id
      );
    }
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
      this.currentPage = 1;
    },
    
    openInputModal() {
      this.showInputModal = true;
    },
    
    closeInputModal() {
      this.showInputModal = false;
      this.editingTransaction = null;
    },
    
    handleFormSubmit(formData) {
      if (!this.editingTransaction) {
        // 새 트랜잭션 추가
        const newTransaction = {
          id: this.userData.currentUser.id,
          type: formData.type,
          date: formData.date,
          category: formData.category,
          amount: Number(formData.amount),
          memo: formData.content
        };
        
        this.data.transaction.push(newTransaction);
      } else {
        // 기존 트랜잭션 수정
        const index = this.data.transaction.findIndex(
          t => 
            t.id === this.userData.currentUser.id &&
            t.date === this.editingTransaction.transaction.date &&
            t.category === this.editingTransaction.transaction.category &&
            t.amount === this.editingTransaction.transaction.amount
        );
        
        if (index !== -1) {
          this.data.transaction[index] = {
            id: this.userData.currentUser.id,
            type: formData.type,
            date: formData.date,
            category: formData.category,
            amount: Number(formData.amount),
            memo: formData.content
          };
        }
      }
      
      this.closeInputModal();
    },

    handleTransactionEdit(editData) {
      this.editingTransaction = editData;
      this.showInputModal = true;
    },

    handleTransactionDelete(deleteData) {
      const index = this.data.transaction.findIndex(
        t => 
          t.id === this.userData.currentUser.id &&
          t.date === deleteData.transaction.date &&
          t.category === deleteData.transaction.category &&
          t.amount === deleteData.transaction.amount
      );
      
      if (index !== -1) {
        this.data.transaction.splice(index, 1);
      }
    }
  }
};
</script>

<template>
  <div class="container">
    <div class="transaction-page">
      <div class="header-section">
        <filter-bar 
          class="filter-container" 
          @filters-applied="applyFilters"
        />
        <div class="button-wrapper">
          <transaction-button @click="openInputModal" />
        </div>
      </div>
      
      <div class="list-container">
        <transaction-list 
          :transactions="currentUserTransactions"
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
      
      <input-form 
        :visible="showInputModal" 
        :initialData="editingTransaction ? {
          type: editingTransaction.transaction.type,
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
/* 기존 스타일 유지 */
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
  margin-top: -5px;
  margin-left: 8px;
  display: flex;
}

:deep(.transaction-list) {
  width: 100%;
}

:deep(.table-responsive) {
  width: 100%;
  overflow-x: visible;
  border: none;
}
</style>