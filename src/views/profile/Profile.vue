<template>
  <div class="profile">
    <nav-bar><div slot="center">个人信息</div></nav-bar>
    <user-info />
    <account-info />
    <normal-list-view :infoList="orderList"></normal-list-view>
    <normal-list-view :infoList="serviceList"></normal-list-view>
  </div>
</template>

<script>
import NavBar from 'components/common/nav-bar/NavBar.vue';
import UserInfo from './childrenCnp/UserInfo.vue'
import AccountInfo from './childrenCnp/AccountInfo.vue';
import NormalListView from './childrenCnp/NormalListView.vue'
export default {
  data() {
    return {
      orderList: [
        {icon: 'message.svg', info: '我的消息'},
        {icon: 'pointer.svg', info: '积分商城'},
        {icon: 'vip.svg', info: '会员卡'},
      ],
      serviceList: [
        {icon: 'cart.svg', info: '我的购物车'},
        {icon: 'shopping.svg', info: '下载购物APP'},
      ]
    }
  },
  components: {
    NavBar,
    UserInfo,
    AccountInfo,
    NormalListView
  }
}
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
