<template>
  <div class="goods-list">
    <good-list-item v-for="item in goodList" :key="item.iid + item.cfav" :goods-item="item" />
  </div>
</template>

<script>
import GoodListItem from "./GoodsListItem.vue";
export default {
  props: {
    goodList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  components: {
    GoodListItem,
  },
};
</script>

<style scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }
</style>
