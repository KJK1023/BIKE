<template>
  <div v-if="visible">
    <div
      class="modal fade show"
      tabindex="-1"
      role="dialog"
      style="display: block"
      aria-modal="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <!-- 모달 헤더 -->
          <div class="modal-header">
            <h5 class="modal-title">
              {{ isEditing ? '거래 수정' : '새 거래 등록' }}
            </h5>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              @click="closeModal"
            ></button>
          </div>
          <!-- 모달 본문 -->
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <!-- 거래 유형 -->
              <div class="mb-3">
                <label class="form-label fw-bold">거래 유형</label>
                <div class="radio-box">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      id="income"
                      value="income"
                      v-model="form.type"
                    />
                    <label class="form-check-label" for="income">수입</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      id="expense"
                      value="expense"
                      v-model="form.type"
                    />
                    <label class="form-check-label" for="expense">지출</label>
                  </div>
                </div>
              </div>

              <!-- 날짜 -->
              <div class="mb-3">
                <label class="form-label fw-bold">날짜</label>
                <br />
                <input type="date" v-model="form.date" class="form-control" />
              </div>

              <!-- 카테고리 -->
              <div class="mb-3">
                <label class="form-label fw-bold">카테고리</label>
                <br />
                <select v-model="form.category" class="form-select">
                  <option value="salary\">급여</option>
                  <option value="allowance">용돈</option>
                  <option value="food">식비</option>
                  <option value="transportation">교통비</option>
                  <option value="team_dinner">회식</option>
                  <option value="shopping">쇼핑</option>
                  <option value="culture">문화생활</option>
                  <option value="etc">기타</option>
                </select>
              </div>

              <!-- 금액 -->
              <div class="mb-3">
                <label class="form-label fw-bold">금액</label>
                <br />
                <input
                  type="number"
                  v-model="form.amount"
                  class="form-control"
                  placeholder="0"
                />
              </div>

              <!-- 내용 -->
              <div class="mb-3">
                <label class="form-label fw-bold">내용</label>
                <br />
                <input
                  type="text"
                  v-model="form.content"
                  class="form-control"
                  placeholder="거래 내용을 입력하세요"
                />
              </div>

              <!-- 버튼들 -->
              <div class="modal-footer px-0">
                <button
                  type="button"
                  class="btn btn-custom-secondary"
                  @click="closeModal"
                >
                  취소
                </button>
                <button
                  type="button"
                  class="btn btn-custom-primary"
                  @click="submitForm"
                >
                  {{ isEditing ? '수정' : '등록' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import { postTransaction, getTransactionsByUserId } from '@/api/userAPI'; // userAPI.js에서 함수 가져오기

export default {
  name: 'InputForm',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    initialData: {
      type: Object,
      default: null,
    },
  },
  computed: {
    isEditing() {
      return this.initialData !== null;
    },
  },
  watch: {
    initialData: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          // 수정 모드일 때 초기 데이터로 폼 채우기
          this.form = { ...newVal };
        } else {
          // 새 거래 등록 모드일 때 폼 초기화
          this.form = {
            type: 'income',
            date: '',
            category: '',
            amount: 0,
            content: '',
          };
        }
      },
    },
  },
  data() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작
    const dd = String(today.getDate()).padStart(2, '0');
    return {
      form: {
        type: 'income',
        date: `${yyyy}-${mm}-${dd}`, // 백틱을 사용하여 템플릿 리터럴로 수정
        category: '급여',
        amount: 0,
        content: '',
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    // InputForm.vue에서 submitForm 함수 수정
    async submitForm() {
      if (this.form.amount <= 0) {
        this.showToast('금액을 0보다 큰 값으로 입력하세요.');
        return;
      }

      // 거래 등록
      const transaction = {
        type: this.form.type,
        date: this.form.date,
        category: this.form.category,
        amount: this.form.amount,
        content: this.form.content, // 내용은 'memo'로 변환하여 서버로 보냄
      };

      try {
        // 거래 데이터 db.json에 저장
        const response = await postTransaction(transaction);

        if (response) {
          // 거래 등록 후 최신 거래 내역을 가져옴
          const userId = 'aaa'; // 예시로 고정된 유저 ID
          const transactions = await getTransactionsByUserId(userId);
          console.log('Updated Transactions:', transactions);

          this.showToast('거래가 성공적으로 등록되었습니다.');
          this.closeModal();

          // 부모 컴포넌트로 최신 거래 내역을 전달
          this.$emit('update-transactions', transactions);
        } else {
          this.showToast('거래 등록에 실패했습니다.');
        }
      } catch (error) {
        console.error('[submitForm ERROR]', error);
        this.showToast('거래 등록에 실패했습니다.');
      }
    },
    showToast(message) {
      const toast = document.createElement('div');
      toast.textContent = message;
      toast.style.position = 'fixed';
      toast.style.bottom = '20px';
      toast.style.left = '50%';
      toast.style.transform = 'translateX(-50%)';
      toast.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      toast.style.color = '#fff';
      toast.style.padding = '10px 20px';
      toast.style.borderRadius = '8px';
      toast.style.zIndex = 9999;
      document.body.appendChild(toast);

      setTimeout(() => {
        document.body.removeChild(toast);
      }, 2000);
    },
  },
};
</script>

<style scoped>
.modal-backdrop.show {
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  width: 448px;
  padding-top: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
}
.btn-custom-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
  color: #fff;
}

.btn-custom-primary:hover {
  background-color: #0b5ed7;
  border-color: #0a58ca;
}

.btn-custom-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
  color: #fff;
}
.radio-box {
  display: flex;
}
.btn-custom-secondary:hover {
  background-color: #5c636a;
  border-color: #545b62;
}
</style>
