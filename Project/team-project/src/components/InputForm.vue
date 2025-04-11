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
              {{ isEditing ? "거래 수정" : "새 거래 등록" }}
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
                    <label class="form-check-label" for="income">수익</label>
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
                  <option value="salary">급여</option>
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
                <label class="form-label fw-bold">메모</label>
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
                  @click="isEditing ? modifyForm() : submitForm()"
                >
                  {{ isEditing ? "수정" : "등록" }}
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

<script setup>
import { ref, computed, watch } from "vue";
import { useTransactionStore } from "@/stores/transaction-store";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  initialData: {
    type: Object,
    default: null,
  },
});

console.log("inputform props", props);

const emit = defineEmits(["close"]);

const transactionStore = useTransactionStore();

// 오늘 날짜 기본값
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");
const formattedToday = `${yyyy}-${mm}-${dd}`;

// 폼 상태
const form = ref({
  type: "income",
  date: formattedToday,
  category: "",
  amount: "",
  content: "",
});

// 수정 모드인지 확인
const isEditing = computed(() => props.initialData !== null);

// initialData가 바뀌면 폼 초기화
watch(
  () => props.initialData,
  (newVal) => {
    if (newVal) {
      form.value = { ...newVal };
    } else {
      form.value = {
        type: "income",
        date: formattedToday,
        category: "",
        amount: "",
        content: "",
      };
    }
  },
  { immediate: true }
);

// 모달 닫기
const closeModal = () => {
  emit("close");
};

// 거래 등록
const submitForm = async () => {
  // 에러
  if (form.value.amount <= 0) {
    showToast("금액을 0보다 큰 값으로 입력하세요.");
    return;
  }

  // form data
  const transaction = {
    type: form.value.type,
    date: form.value.date,
    category: form.value.category,
    amount: form.value.amount,
    content: form.value.content,
  };

  try {
    await transactionStore.addTransaction(transaction);
    showToast("거래가 성공적으로 등록되었습니다.");
    closeModal();
  } catch (error) {
    console.error("[submitForm ERROR]", error);
    showToast("거래 등록에 실패했습니다.");
  }
};

const modifyForm = async () => {
  if (form.value.amount <= 0) {
    showToast("금액을 0보다 큰 값으로 입력하세요.");
    return;
  }

  // form data
  const transaction = {
    id: props.initialData.id,
    type: form.value.type,
    date: form.value.date,
    category: form.value.category,
    amount: form.value.amount,
    content: form.value.content,
  };

  try {
    await transactionStore.putTransaction(transaction);
    showToast("거래가 성공적으로 수정되었습니다.");
    closeModal();
  } catch (error) {
    console.error("[submitForm ERROR]", error);
    showToast("거래 수정에 실패했습니다.");
  }
};

// 토스트 메시지
const showToast = (message) => {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  toast.style.color = "#fff";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "8px";
  toast.style.zIndex = 9999;
  document.body.appendChild(toast);

  setTimeout(() => {
    document.body.removeChild(toast);
  }, 2000);
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
