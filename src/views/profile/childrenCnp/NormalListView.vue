<template>
  <div class="normal-list-view">
    <div class="normal-list-item" v-for="(item, index) in infoList" :key="item.icon" :class="{'border-line': index === 0 ? true: false }">
      <img :src=imgUrl(item.icon) alt="">
      <span>{{item.info}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    infoList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    imgUrl(icon) {
      return require('assets/img/profile/' + icon)
    }
  }
}
</script>

<style scoped>
  .normal-list-view{
    border-top: 20px solid rgb(242, 242, 242);
  }
  .normal-list-item{
    padding-left: 30px;
    height: 44px;
    display: flex;
    align-items: center;
    border-top: 1px solid #cecece;
  }
  .border-line{
    border-top: none;
  }
  .normal-list-view img{
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
</style>
