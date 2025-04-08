<template>
  <nav class="navbar">
    <div class="navbar-left">
      <div class="logo-box"></div>
      <div class="navbar-center">
        <a href="#" class="nav-item">대시보드</a>
        <a href="#" class="nav-item">전체 거래 내역</a>
        <a href="#" class="nav-item">예산 관리</a>
      </div>
    </div>

    <div class="navbar-right">
      <i class="fas fa-solid fa-gear"></i>
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
  height: 64px;
  justify-content: space-between;
  align-items: center;

  padding: 0 5px;
  box-shadow: 0 2px rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0);
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
