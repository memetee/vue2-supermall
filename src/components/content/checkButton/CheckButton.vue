<template>
  <div class="check-button" :class="{active: isActive}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  props:{
    isActive: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.check-button{
  border-radius: 50%;
  border: 1px solid #cecece;
}
.active{
   border: 1px solid crimson;
  background-color: crimson;
}
</style>
