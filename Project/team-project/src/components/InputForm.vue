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
            <h5 class="modal-title">새 거래 등록</h5>
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
                  <option value="">선택하세요</option>
                  <option value="급여">급여</option>
                  <option value="용돈">용돈</option>
                  <option value="식비">식비</option>
                  <option value="교통비">교통비</option>
                  <option value="기타">기타</option>
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
                <button type="submit" class="btn btn-custom-primary">
                  등록
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
export default {
  name: 'InputForm',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        type: 'income',
        date: '',
        category: '',
        amount: 0,
        content: '',
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    submitForm() {
      console.log('Form submit:', this.form);
      this.closeModal();
    },
  },
};
</script>

<style scoped>
/* 원하는 버튼 색상으로 커스텀 */
/* 모달 배경 스타일 */
.modal-backdrop.show {
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 검정색 */
}
/* 모달 내용 스타일 (흰색 배경) */
.modal-content {
  background-color: #fff;
  width: 448px;
  padding-top: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
}
.btn-custom-primary {
  background-color: #0d6efd; /* 기본 Bootstrap primary 색상: 필요에 따라 변경 */
  border-color: #0d6efd;
  color: #fff;
}

.btn-custom-primary:hover {
  background-color: #0b5ed7;
  border-color: #0a58ca;
}

.btn-custom-secondary {
  background-color: #6c757d; /* 기본 Bootstrap secondary 색상: 필요에 따라 변경 */
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
