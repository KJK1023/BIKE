<!-- NewTransactionButton.vue -->
<template>
  <button 
    class="btn btn-primary btn-sm d-flex align-items-center" 
    @click="$emit('click')"
  >
    <span class="me-1">+</span> 새 거래 등록
  </button>
</template>

<script>
// 부트스트랩 임포트 추가
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default {
  name: 'NewTransactionButton'
}
</script>

<style scoped>
.btn-primary {
  background-color: #000;
  border-color: #000;
}
.btn-primary:hover, .btn-primary:focus {
  background-color: #333;
  border-color: #333;
}
</style>