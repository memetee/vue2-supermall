<template>
  <div class="account-item">
    <div>
      <span class="balance">{{accountInfo.accountContent}}</span><span>{{accountInfo.unit}}</span>
    </div>
    <span class="account-info">{{accountInfo.accountName}}</span>
  </div>
</template>

<script>
export default {
  props: {
    accountInfo: {
      type: Object,
      default (){
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .account-item{
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .balance{
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .account-info{
    margin-top: 6px;
  }
</style>
