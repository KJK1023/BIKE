<template>
  <div class="transaction-filter p-3">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="mb-0 fw-bold">전체 거래 내역</h5>
    </div>

    <div class="filter-row d-flex flex-wrap align-items-center">
      <div class="filter-item me-2 position-relative">
        <label class="form-label mb-0 me-2">기간</label>
        <button
          class="btn btn-outline-secondary btn-sm px-3 py-1 d-flex align-items-center"
          type="button"
          @click="toggleDatePicker"
        >
          {{ selectedPeriod }} <i class="bi bi-calendar-event ms-2"></i>
        </button>

        <div v-if="showDatePicker" class="date-picker-container position-absolute mt-1 p-3 bg-white rounded shadow">
          <div class="d-flex justify-content-between mb-3">
            <div></div> <button type="button" class="btn-close" @click="showDatePicker = false"></button>
          </div>

          <div class="d-flex align-items-center gap-3 mb-3">
            <div class="date-input-group">
              <label for="startDate" class="form-label small mb-1">시작일</label>
              <input
                type="date"
                id="startDate"
                class="form-control form-control-sm"
                v-model="startDate"
              >
            </div>
            <div class="date-range-separator">~</div>
            <div class="date-input-group">
              <label for="endDate" class="form-label small mb-1">종료일</label>
              <input
                type="date"
                id="endDate"
                class="form-control form-control-sm"
                v-model="endDate"
              >
            </div>
          </div>

          <div class="date-buttons-group d-flex gap-2 justify-content-end">
            <button class="btn btn-sm btn-outline-secondary" @click="showDatePicker = false">취소</button>
            <button class="btn btn-sm btn-primary" @click="applyCustomDate">적용</button>
          </div>
        </div>
      </div>

      <div class="filter-item me-2">
        <label class="form-label mb-0 me-2">유형</label>
        <div class="dropdown d-inline-block">
          <button
            class="btn btn-outline-secondary btn-sm dropdown-toggle px-3 py-1"
            type="button"
            id="typeDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            ref="typeDropdownButton"
          >
            {{ selectedType === 'income' ? '입금' : selectedType === 'expense' ? '출금' : selectedType }}
            <i class="bi bi-chevron-down ms-1"></i>
          </button>
          <ul class="dropdown-menu" aria-labelledby="typeDropdown">
            <li><a class="dropdown-item" href="#" @click.prevent="setType('전체')">전체</a></li>
            <li><a class="dropdown-item" href="#" @click.prevent="setType('income')">입금</a></li>
            <li><a class="dropdown-item" href="#" @click.prevent="setType('expense')">출금</a></li>
          </ul>
        </div>
      </div>

      <div class="filter-item me-2">
        <label class="form-label mb-0 me-2">카테고리</label>
        <div class="dropdown d-inline-block">
          <button
            class="btn btn-outline-secondary btn-sm dropdown-toggle px-3 py-1"
            type="button"
            id="categoryDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ selectedCategory }} <i class="bi bi-chevron-down ms-1"></i>
          </button>
          <ul class="dropdown-menu" aria-labelledby="categoryDropdown">
            <li><a class="dropdown-item" href="#" @click.prevent="setCategory('전체')">전체</a></li>
            <li><a class="dropdown-item" href="#" @click.prevent="setCategory('급여')">급여</a></li>
            <li><a class="dropdown-item" href="#" @click.prevent="setCategory('식비')">식비</a></li>
            <li><a class="dropdown-item" href="#" @click.prevent="setCategory('쇼핑')">쇼핑</a></li>
            <li><a class="dropdown-item" href="#" @click.prevent="setCategory('교통비')">교통비</a></li>
            <li><a class="dropdown-item" href="#" @click.prevent="setCategory('문화생활')">문화생활</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default {
  name: 'TransactionFilterBar',
  emits: ['filter-transactions', 'filters-applied'], // filters-applied 이벤트 추가

  data() {
    return {
      selectedPeriod: '전체',
      selectedType: '전체',
      selectedCategory: '전체',
      showDatePicker: false,
      startDate: this.formatDateForInput(new Date()),
      endDate: this.formatDateForInput(new Date())
    };
  },

  methods: {
    formatDateForInput(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    formatDateDisplay(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    setPeriod(period) {
      console.log('FilterBar: 기간 필터 변경:', period);
      this.selectedPeriod = period;
      const today = new Date();
      if (period === '오늘') {
        this.startDate = this.formatDateForInput(today);
        this.endDate = this.formatDateForInput(today);
      } else if (period === '이번 주') {
        const first = today.getDate() - today.getDay();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(first);
        this.startDate = this.formatDateForInput(startOfWeek);
        this.endDate = this.formatDateForInput(today);
      } else if (period === '이번 달') {
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        this.startDate = this.formatDateForInput(startOfMonth);
        this.endDate = this.formatDateForInput(today);
      } else if (period === '전체') {
        this.startDate = '';
        this.endDate = '';
      }
      this.showDatePicker = false;
      this.filterTransactions();
    },

    toggleDatePicker() {
      this.showDatePicker = !this.showDatePicker;
      if (this.showDatePicker && this.selectedPeriod === '전체') {
        const today = new Date();
        const lastMonth = new Date();
        lastMonth.setMonth(today.getMonth() - 1);
        this.startDate = this.formatDateForInput(lastMonth);
        this.endDate = this.formatDateForInput(today);
      }
    },

    applyCustomDate() {
      console.log('FilterBar: 사용자 지정 날짜 적용:', this.startDate, this.endDate);
      if (this.startDate && this.endDate) {
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        if (start <= end) {
          this.selectedPeriod = `${this.formatDateDisplay(start)} ~ ${this.formatDateDisplay(end)}`;
          this.showDatePicker = false;
          this.filterTransactions();
        } else {
          alert('시작일은 종료일보다 이전이어야 합니다.');
        }
      } else if (!this.startDate && !this.endDate) {
        this.selectedPeriod = '전체';
        this.showDatePicker = false;
        this.filterTransactions();
      } else {
        alert('시작일과 종료일을 모두 설정해주세요.');
      }
    },

    setType(type) {
      console.log('FilterBar: 유형 필터 변경:', type);
      this.selectedType = type;
      if (this.$refs.typeDropdownButton) {
        this.$refs.typeDropdownButton.innerText = (
          type === 'income' ? '입금 ' : type === 'expense' ? '출금 ' : type + ' '
        );
        const icon = document.createElement('i');
        icon.className = 'bi bi-chevron-down ms-1';
        this.$refs.typeDropdownButton.appendChild(icon);
      }
      this.filterTransactions();
    },

    setCategory(category) {
      console.log('FilterBar: 카테고리 필터 변경:', category);
      this.selectedCategory = category;
      this.filterTransactions();
    },

    filterTransactions() {
      const transactions = this.$root.$data.transaction || []; // "transaction" 배열 사용
      console.log('FilterBar: 필터링 시작, 전체 데이터:', transactions);

      const dateFilter = (transaction) => {
        if (this.selectedPeriod === '전체') return true;

        // JSON 데이터의 "date" 형식이 "YYYY-MM-DD"이므로 그대로 사용 가능
        const transactionDate = new Date(transaction.date);
        transactionDate.setHours(0, 0, 0, 0); // 시간 정보 제거

        if (this.selectedPeriod.includes('~')) {
          const [startStr, endStr] = this.selectedPeriod.split('~').map(d => d.trim());
          const start = new Date(startStr);
          const end = new Date(endStr);
          start.setHours(0, 0, 0, 0);
          end.setHours(23, 59, 59, 999);

          const result = transactionDate >= start && transactionDate <= end;
          console.log('FilterBar: 날짜 필터 - 거래일:', transactionDate, '시작:', start, '종료:', end, '결과:', result);
          return result;
        }

        if (this.selectedPeriod === '오늘') {
          const today = new Date();
          const result = (
            transactionDate.getFullYear() === today.getFullYear() &&
            transactionDate.getMonth() === today.getMonth() &&
            transactionDate.getDate() === today.getDate()
          );
          console.log('FilterBar: 오늘 필터 - 거래일:', transactionDate, '오늘:', today, '결과:', result);
          return result;
        }

        if (this.selectedPeriod === '이번 주') {
          const today = new Date();
          const firstDayOfWeek = new Date(today);
          firstDayOfWeek.setDate(today.getDate() - today.getDay());
          firstDayOfWeek.setHours(0, 0, 0, 0);

          const result = transactionDate >= firstDayOfWeek && transactionDate <= today;
          console.log('FilterBar: 이번 주 필터 - 거래일:', transactionDate, '시작:', firstDayOfWeek, '종료:', today, '결과:', result);
          return result;
        }

        if (this.selectedPeriod === '이번 달') {
          const today = new Date();
          const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

          const result = transactionDate >= firstDayOfMonth && transactionDate <= today;
          console.log('FilterBar: 이번 달 필터 - 거래일:', transactionDate, '시작:', firstDayOfMonth, '종료:', today, '결과:', result);
          return result;
        }

        return true;
      };

      const typeFilter = (transaction) => {
        const result = this.selectedType === '전체' || transaction.type === this.selectedType;
        console.log('FilterBar: 유형 필터 - 선택:', this.selectedType, '거래 유형:', transaction.type, '결과:', result);
        return result;
      };

      const categoryFilter = (transaction) => {
        const result = this.selectedCategory === '전체' || transaction.category === this.selectedCategory;
        console.log('FilterBar: 카테고리 필터 - 선택:', this.selectedCategory, '거래 카테고리:', transaction.category, '결과:', result);
        return result;
      };

      const filteredTransactions = transactions.filter(
        (transaction) => dateFilter(transaction) && typeFilter(transaction) && categoryFilter(transaction)
      );

      console.log('FilterBar: 필터링 완료, 결과:', filteredTransactions);
      this.$emit('filter-transactions', filteredTransactions);
      this.$emit('filters-applied', { // filters-applied 이벤트 발생
        period: this.selectedPeriod,
        type: this.selectedType === '전체' ? null : this.selectedType,
        category: this.selectedCategory === '전체' ? null : this.selectedCategory,
        dateRange: this.selectedPeriod.includes('~')
          ? { start: this.selectedPeriod.split('~')[0].trim(), end: this.selectedPeriod.split('~')[1].trim() }
          : null,
      });
    },

    handleOutsideClick(e) {
      if (this.showDatePicker) {
        const datepicker = document.querySelector('.date-picker-container');
        const dateButton = document.querySelector('.filter-item .btn-outline-secondary');

        if (
          datepicker &&
          !datepicker.contains(e.target) &&
          (!dateButton || !dateButton.contains(e.target))
        ) {
          this.showDatePicker = false;
        }
      }
    }
  },

  created() {
    this.filterTransactions();
    document.addEventListener('click', this.handleOutsideClick);
  },

  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  }
};
</script>

<style scoped>
/* 기존 스타일 그대로 유지 */
.transaction-filter {
  background: #fff;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.filter-row {
  margin-bottom: 0.5rem;
  position: relative;
}

.filter-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  position: relative;
}

.filter-search {
  width: 250px;
}

.dropdown-toggle::after {
  display: none;
}

.btn-outline-secondary {
  border-color: #ced4da;
  color: #212529;
  background-color: #fff;
}

.btn-outline-secondary:hover {
  background-color: #f8f9fa;
  color: #212529;
  border-color: #ced4da;
}

.date-picker-container {
  z-index: 1050;
  min-width: 400px;
  border: 1px solid #dee2e6;
}

.date-range-separator {
  font-weight: bold;
  align-self: flex-end;
  margin-bottom: 8px;
}

.date-input-group {
  flex: 1;
}

/* 모바일 최적화 */
@media (max-width: 768px) {
  .filter-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-item {
    width: 100%;
    margin-right: 0;
    margin-bottom: 0.75rem;
  }

  .filter-search {
    width: 100%;
    margin-top: 0.5rem;
  }

  .dropdown {
    width: 100%;
  }

  .dropdown-toggle {
    width: 100%;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .date-picker-container {
    min-width: 300px;
    width: calc(100vw - 30px);
    max-width: 400px;
    left: 0;
  }

  .date-input-group {
    flex: 1;
  }
}
</style>