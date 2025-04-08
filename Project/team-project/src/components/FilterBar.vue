<!-- TransactionFilterBar.vue -->
<template>
    <div class="transaction-filter p-3">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="mb-0 fw-bold">전체 거래 내역</h5>
      </div>
  
      <div class="filter-row d-flex flex-wrap align-items-center">
        <!-- 기간 필터 -->
        <div class="filter-item me-2 position-relative">
          <label class="form-label mb-0 me-2">기간</label>
          <button 
            class="btn btn-outline-secondary btn-sm px-3 py-1 d-flex align-items-center"
            type="button" 
            @click="toggleDatePicker"
          >
            {{ selectedPeriod }} <i class="bi bi-calendar-event ms-2"></i>
          </button>
          
          <!-- 날짜 선택 캘린더 -->
          <div v-if="showDatePicker" class="date-picker-container position-absolute mt-1 p-3 bg-white rounded shadow">
            <div class="d-flex justify-content-between mb-3">
              <div></div> <!-- Empty div to maintain layout -->
              <button type="button" class="btn-close" @click="showDatePicker = false"></button>
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
  
        <!-- 유형 필터 -->
        <div class="filter-item me-2">
          <label class="form-label mb-0 me-2">유형</label>
          <div class="dropdown d-inline-block">
            <button class="btn btn-outline-secondary btn-sm dropdown-toggle px-3 py-1" type="button" id="typeDropdown" data-bs-toggle="dropdown" aria-expanded="false" ref="typeDropdownButton">
              {{ selectedType === 'income' ? '입금' : selectedType === 'expense' ? '출금' : selectedType }} <i class="bi bi-chevron-down ms-1"></i>
            </button>
            <ul class="dropdown-menu" aria-labelledby="typeDropdown">
              <li><a class="dropdown-item" href="#" @click.prevent="setType('전체')">전체</a></li>
              <li><a class="dropdown-item" href="#" @click.prevent="setType('income')">입금</a></li>
              <li><a class="dropdown-item" href="#" @click.prevent="setType('expense')">출금</a></li>
            </ul>
          </div>
        </div>
  
        <!-- 카테고리 필터 -->
        <div class="filter-item me-2">
          <label class="form-label mb-0 me-2">카테고리</label>
          <div class="dropdown d-inline-block">
            <button class="btn btn-outline-secondary btn-sm dropdown-toggle px-3 py-1" type="button" id="categoryDropdown" data-bs-toggle="dropdown" aria-expanded="false">
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
  export default {
    name: 'TransactionFilterBar',
    
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
      // 기간 필터 설정
      setPeriod(period) {
        this.selectedPeriod = period;
        
        const today = new Date();
        
        // 기간에 따른 날짜 설정
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
          // 전체 기간은 특정 날짜 없음
          this.startDate = '';
          this.endDate = '';
        }
        
        this.showDatePicker = false;
        this.applyFilters();
      },
      
      // 날짜 선택기 토글
      toggleDatePicker() {
        this.showDatePicker = !this.showDatePicker;
        if (this.showDatePicker && this.selectedPeriod === '전체') {
          // 날짜가 비어있으면 오늘 날짜와 한 달 전 날짜로 초기화
          const today = new Date();
          const lastMonth = new Date();
          lastMonth.setMonth(today.getMonth() - 1);
          
          this.startDate = this.formatDateForInput(lastMonth);
          this.endDate = this.formatDateForInput(today);
        }
      },
      
      // 사용자 지정 날짜 적용
      applyCustomDate() {
        if (this.startDate && this.endDate) {
          const start = new Date(this.startDate);
          const end = new Date(this.endDate);
          
          // 날짜 범위가 유효한지 확인
          if (start <= end) {
            this.selectedPeriod = `${this.formatDateDisplay(start)} ~ ${this.formatDateDisplay(end)}`;
            this.showDatePicker = false;
            this.applyFilters();
          } else {
            alert('시작일은 종료일보다 이전이어야 합니다.');
          }
        } else if (!this.startDate && !this.endDate) {
          // 둘 다 비어있으면 전체 기간으로 설정
          this.selectedPeriod = '전체';
          this.showDatePicker = false;
          this.applyFilters();
        } else {
          alert('시작일과 종료일을 모두 설정해주세요.');
        }
      },
      
      // 날짜를 input type="date"용 포맷으로 변환 (YYYY-MM-DD)
      formatDateForInput(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      },
      
      // 날짜를 표시용 포맷으로 변환 (YYYY-MM-DD)
      formatDateDisplay(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      },
      
      // 유형 필터 설정
      setType(type) {
        // 내부적으로는 영문 값을 사용하되, 화면에는 한글로 표시
        this.selectedType = type;
        // 화면에 표시되는 이름 변환
        if (this.$refs.typeDropdownButton) {
          if (type === 'income') {
            this.$refs.typeDropdownButton.innerText = '입금 ';
          } else if (type === 'expense') {
            this.$refs.typeDropdownButton.innerText = '출금 ';
          } else {
            this.$refs.typeDropdownButton.innerText = type + ' ';
          }
          // 아이콘 추가
          const icon = document.createElement('i');
          icon.className = 'bi bi-chevron-down ms-1';
          this.$refs.typeDropdownButton.appendChild(icon);
        }
        this.applyFilters();
      },
      
      // 카테고리 필터 설정
      setCategory(category) {
        this.selectedCategory = category;
        this.applyFilters();
      },
      

      
      // 필터 적용
      applyFilters() {
        // 내부 처리용 필터 객체
        const internalFilters = {
          period: this.selectedPeriod,
          dateRange: null,
          type: this.selectedType,
          category: this.selectedCategory
        };
        
        // 커스텀 날짜 범위인 경우
        if (this.selectedPeriod.includes('~')) {
          const dates = this.selectedPeriod.split('~').map(d => d.trim());
          internalFilters.dateRange = {
            start: dates[0],
            end: dates[1]
          };
        }

        // JSON 출력용 필터 객체 (실제 사용자 데이터 구조에 맞춤)
        const outputFilters = {
          // 날짜 범위는 필요시 내부에서만 활용하고 최종 출력에서는 생략
          // 그 외 필요한 필드만 포함
          type: this.selectedType, // 'income' 또는 'expense'로 설정됨
          category: this.selectedCategory
        };
        
        // 부모 컴포넌트에는 내부 처리용 필터만 전달
        this.$emit('filters-applied', internalFilters);
        
        // 실제 데이터 처리나 API 호출시에는 outputFilters 형식으로 처리하도록 구현
        // 여기에서는 콘솔에 출력만 함
        console.log('내부처리용 필터:', internalFilters);
        console.log('JSON 출력용 필터:', outputFilters);
      },
      

      
      // 외부 클릭 처리
      handleOutsideClick(e) {
        if (this.showDatePicker) {
          const datepicker = document.querySelector('.date-picker-container');
          const dateButton = document.querySelector('.filter-item .btn-outline-secondary');
          
          if (datepicker && !datepicker.contains(e.target) && 
              (!dateButton || !dateButton.contains(e.target))) {
            this.showDatePicker = false;
          }
        }
      }
    },
    
    created() {
      // 초기 로딩 시 기본 필터 적용
      this.applyFilters();
      
      // 날짜 선택기 외부 클릭 시 닫기
      document.addEventListener('click', this.handleOutsideClick);
    },
    
    beforeUnmount() {
      // 이벤트 리스너 정리
      document.removeEventListener('click', this.handleOutsideClick);
    }
  };
  </script>
  
  <style scoped>
  .transaction-filter {
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
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