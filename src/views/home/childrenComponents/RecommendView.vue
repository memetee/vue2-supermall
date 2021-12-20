<template>
  <div class="recommend-view">
    <div class="recommend-item" v-for="item in recommend" :key="item.sort">
      <a :href="item.link">
        <img v-lazy="item.image" alt="" />
        <p>{{ item.title }}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommend: {
      type: Array,
      default: [],
    }
  },
};
</script>

<style scoped>
  .recommend-view{
    /* width: 100%; */
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 30px;
    border-bottom: 15px solid #eee;
  }
  .recommend-view .recommend-item{
    text-align: center;
  }
  .recommend-view .recommend-item img{
    width: 60px;
  }
  .recommend-view .recommend-item p{
    color: #cecece;
    font-size: 14px;
    margin-top: 5px;
  }
</style>
