<script>
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav class="navbar">
    <div class="navbar-left">
      <div class="logo-box"></div>
      <nav class="navbar-center">
        <RouterLink class="nav-item" to="/">대시보드</RouterLink>
        <RouterLink class="nav-item" to="/transactions"
          >전체 거래 내역</RouterLink
        >
        <RouterLink class="nav-item" to="/calander">캘린더</RouterLink>
      </nav>
    </div>

    <div class="navbar-right">
      <RouterLink to="/profile"
        ><i class="fas fa-solid fa-gear"></i
      ></RouterLink>
      <img src="@/assets/profile.png" alt="프로필" class="profile" />
      <!-- 나중에 server에서 가져오기 -->
      <span class="username">김민수</span>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  justify-content: space-between;
  align-items: center;

  padding: 0 5px;
  box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.1),
    0px 1px 3px 0px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-box {
  width: 160px;
  height: 64px;
  background-image: url(../assets/logo.svg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center left;
}

.navbar-center {
  display: flex;
  gap: 20px;
}

.nav-item {
  font-weight: 500;
  color: black;
  text-decoration: none;
  padding-left: 10px;
  transition: color 0.2s ease, font-weight 0.2s ease;
}

.nav-item:hover {
  color: #4f48dc;
  font-weight: bold;
  background-color: transparent;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
  margin-right: 30px;
}

.profile {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.username {
  font-size: 14px;
  font-weight: 500;
}
</style>
