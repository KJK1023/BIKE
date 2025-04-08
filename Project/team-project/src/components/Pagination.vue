<!-- Pagination.vue -->
<template>
    <div class="pagination-container d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <select 
          class="form-select form-select-sm me-2" 
          style="width: auto;" 
          v-model="localItemsPerPage" 
          @change="updateItemsPerPage"
        >
          <option value="10">10개씩 보기</option>
          <option value="20">20개씩 보기</option>
          <option value="50">50개씩 보기</option>
        </select>
        <span class="text-muted small">총 {{ totalItems }}개 항목</span>
      </div>
  
      <nav aria-label="Page navigation" v-if="totalPages > 1">
        <ul class="pagination pagination-sm mb-0">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a 
              class="page-link" 
              href="#" 
              @click.prevent="changePage(currentPage - 1)" 
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          
          <li 
            v-for="page in visiblePages" 
            :key="page" 
            class="page-item" 
            :class="{ active: page === currentPage }"
          >
            <a 
              class="page-link" 
              href="#" 
              @click.prevent="changePage(page)"
            >
              {{ page }}
            </a>
          </li>
          
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a 
              class="page-link" 
              href="#" 
              @click.prevent="changePage(currentPage + 1)" 
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Pagination',
    
    props: {
      totalItems: {
        type: Number,
        required: true
      },
      itemsPerPage: {
        type: Number,
        default: 10
      },
      currentPage: {
        type: Number,
        default: 1
      }
    },
    
    data() {
      return {
        localItemsPerPage: this.itemsPerPage
      };
    },
    
    computed: {
      totalPages() {
        return Math.ceil(this.totalItems / this.localItemsPerPage);
      },
      
      visiblePages() {
        const range = 5; // 보여줄 페이지 번호 개수
        let start = Math.max(1, this.currentPage - Math.floor(range / 2));
        let end = Math.min(this.totalPages, start + range - 1);
        
        // 시작점 조정
        start = Math.max(1, end - range + 1);
        
        return Array.from(
          { length: Math.min(range, this.totalPages) }, 
          (_, i) => start + i
        );
      }
    },
    
    methods: {
      changePage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.$emit('page-change', page);
        }
      },
      
      updateItemsPerPage() {
        this.$emit('items-per-page-change', Number(this.localItemsPerPage));
      }
    }
  };
  </script>
  
  <style scoped>
  .pagination-container {
    margin-top: 1rem;
  }
  
  .pagination .page-link {
    color: #212529;
    background-color: #fff;
    border: 1px solid #dee2e6;
  }
  
  .pagination .page-item.active .page-link {
    background-color: #212529;
    color: #fff;
    border-color: #212529;
  }
  
  .pagination .page-link:focus {
    box-shadow: none;
  }
  </style>