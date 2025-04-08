<template>
  <div class="profile-settings">
    <h2 class="setting-text">계정 설정</h2>
    <br />
    <div class="profile-info">
      <h5>프로필 정보</h5>
      <div class="profile-image">
        <img src="@/assets/default-profile.svg" alt="프로필 이미지" />
        <button class="change-image-button">이미지 변경</button>
      </div>
      <div class="form-group">
        <label for="name">이름</label>
        <input type="text" id="name" v-model="name" />
      </div>
      <div class="form-group">
        <label for="email">이메일</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div class="form-group">
        <label for="phone">전화번호</label>
        <input type="tel" id="phone" v-model="phone" />
      </div>
    </div>

    <div class="security-settings">
      <h5>보안</h5>
      <button class="change-password-button">비밀번호 변경</button>
    </div>
    <div class="button-wrapper">
      <button class="save-changes-button">변경사항 저장</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      name: '김민수', // 초기값 설정
      email: 'minsu.kim@example.com', // 초기값 설정
      phone: '010-1234-5678', // 초기값 설정
    };
  },
  methods: {
    // 이미지 변경 버튼 클릭 시 동작
    onChangeImage() {
      // 이미지 변경 로직 구현
      console.log('이미지 변경 버튼 클릭');
    },
    // 비밀번호 변경 버튼 클릭 시 동작
    onChangePassword() {
      // 비밀번호 변경 로직 구현 (모달 또는 페이지 이동)
      console.log('비밀번호 변경 버튼 클릭');
    },
    // 변경사항 저장 버튼 클릭 시 동작
    onSaveChanges() {
      // 변경된 프로필 정보 저장 로직 구현
      console.log('변경사항 저장:', this.name, this.email, this.phone);
    },
  },
};
</script>

<style scoped>
.profile-settings {
  padding: 20px;
}

h5 {
  font-size: 18px; /* 크기 (px 단위, 예: 24px) */
  line-height: 28px;
  font-weight: 600;
}

h3 {
  margin-bottom: 15px;
}

.setting-text {
  font-size: 24px; /* 크기 (px 단위, 예: 24px) */
  font-weight: 700; /* 굵기: normal, bold, 숫자(100~900) 가능 */
  line-height: 32px;
}
.profile-image {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.profile-image img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 15px;
  border: 1px solid #ccc;
  object-fit: cover;
}
.button-wrapper {
  display: flex;
  justify-content: flex-end;
}

.change-image-button {
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0);
  border: 1px solid #4f46e5;
  border-radius: 6px;
  cursor: pointer;
  color: #4f46e5;
}

.change-image-button:hover {
  background-color: #e0e0e0;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input[type='text'],
.form-group input[type='email'],
.form-group input[type='tel'] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.security-settings {
  margin-top: 30px;
  margin-bottom: 20px;
}

.change-password-button {
  padding: 10px 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 400;
  font-size: 14px;
}

.change-password-button:hover {
  background-color: #e0e0e0;
}

.save-changes-button {
  padding: 12px 25px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.save-changes-button:hover {
  background-color: #0056b3;
}
</style>
