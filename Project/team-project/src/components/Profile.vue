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
      <button class="save-changes-button" @click="onSaveChanges">
        변경사항 저장
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user-store";
import * as userApi from "@/api/userAPI";

const userStore = useUserStore();

const name = ref("");
const email = ref("");
const phone = ref("");
const targetUserId = ref("");
const targetUserPw = ref("");

onMounted(async () => {
  await userStore.fetchUser();
  const targetUser = userStore.userInfo[0];

  if (targetUser) {
    name.value = targetUser.name;
    email.value = targetUser.email;
    phone.value = targetUser.tel;

    targetUserId.value = targetUser.id;
    targetUserPw.value = targetUser.pw;

    console.log("현재 로그인된 id ", targetUserId.value);
    console.log("현재 로그인된 pw ", targetUserPw.value);
  } else {
    console.warn("유저 정보가 없습니다.");
  }
});

const onChangeImage = () => {
  console.log("이미지 변경 버튼 클릭");
};

const onChangePassword = () => {
  console.log("비밀번호 변경 버튼 클릭");
};

const onSaveChanges = async () => {
  const modifyUser = {
    id: targetUserId.value,
    pw: targetUserPw.value,
    name: name.value,
    email: email.value,
    tel: phone.value,
  };

  const url = `/api/user/${targetUserId.value}`;

  try {
    const response = await userApi.put(url, modifyUser);
    console.log("✅ 수정 성공:", response);
    alert("변경사항이 저장되었습니다.");
  } catch (error) {
    console.error("❌ 수정 실패:", error);
    alert("변경에 실패했습니다.");
  }
};
</script>

<style scoped>
.profile-settings {
  padding: 20px;
  width: 850px;
  height: 690px;
  margin: 0 auto;
  background-color: #ffffff; /* 흰 배경 */
  border-radius: 10px; /* 모서리 둥글게 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 살짝 그림자 */
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

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="tel"] {
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
  background-color: #4f46e5;
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
