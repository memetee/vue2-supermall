<template>
  <div class="account-info">
    <account-info-item  class="account-info-item"
                        v-for="item in accountInfo"
                        :accountInfo="item"
                        :key="item.accountName"/>
  </div>
</template>

<script>
import AccountInfoItem from './AccountInfoItem.vue';
export default {
  data() {
    return {
      accountInfo: [
        {
          accountContent: '0.00',
          unit: '元',
          accountName: '我的余额'
        },
        {
          accountContent: '0',
          unit: '个',
          accountName: '我的优惠'
        },
        {
          accountContent: '0',
          unit: '分',
          accountName: '我的积分'
        }
      ]
    }
  },
  components: {
    AccountInfoItem
  }
}
</script>

<style scoped>
  .account-info{
    display: flex;
    justify-content: space-between;
    height: 85px;
    margin-top: 18px;
  }
  .account-info-item{
    flex: 1;
  }
</style>
