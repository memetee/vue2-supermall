<template>
  <div class="user-info">
    <img class="user-left" src="~assets/img/profile/avatar.svg" alt="">
    <div class="user-center">
      <div class="login">登录/注册</div>
      <div class="not-phone-num">
        <img src="~assets/img/profile/phone.svg" alt="">
        <span>暂无绑定手机号</span>
      </div>
    </div>
    <div class="user-right">
      <img src="~assets/img/common/arrow-left.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .user-info{
    display: flex;
    height: 85px;
    background-color: var(--color-tint);
    color: #ffffff;
    padding: 6px 15px;
  }
  .user-left{
    width: 70px;
    height: 70px;
  }

  .user-center {
    padding-left: 15px;
    flex: 1;
  }
  .user-center .login {
    margin-top: 15px;
  }
  .user-center .not-phone-num img{
    width: 20px;
    height: 30px;
    vertical-align: middle;
    margin-left: -5px;
  }

  .user-right {
    width: 20px;
    line-height: 85px;
  }

  .user-right img {
    width: 20px;
  }
</style>
