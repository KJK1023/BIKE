<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h2 class="modal-title">비밀번호 변경</h2>

      <div class="form-group">
        <label for="currentPw">현재 비밀번호</label>
        <input type="password" id="currentPw" v-model="currentPw" />
      </div>

      <div class="form-group">
        <label for="newPw">새 비밀번호</label>
        <input type="password" id="newPw" v-model="newPw" />
      </div>

      <div class="form-group">
        <label for="confirmPw">새 비밀번호 확인</label>
        <input type="password" id="confirmPw" v-model="confirmPw" />
      </div>

      <div class="button-group">
        <button class="confirm-btn" @click="submit">확인</button>
        <button class="cancel-btn" @click="close">취소</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["close", "submit"]);

const currentPw = ref("");
const newPw = ref("");
const confirmPw = ref("");

const submit = () => {
  if (newPw.value !== confirmPw.value) {
    alert("새 비밀번호가 일치하지 않습니다.");
    return;
  }

  if (!currentPw.value || !newPw.value) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  emit("submit", {
    currentPw: currentPw.value,
    newPw: newPw.value,
  });
};

const close = () => {
  emit("close");
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #ffffff;
  padding: 30px 24px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.modal-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 6px;
  display: block;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 5px;
  box-sizing: border-box;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.confirm-btn {
  padding: 8px 16px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
}

.cancel-btn {
  padding: 8px 16px;
  background-color: #e5e7eb;
  color: #374151;
  border: none;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
}
</style>
