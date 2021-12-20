<template>
  <div class="tab-bar-item" @click="clickTabBar">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      default: "home",
    },

    // 默认红色，可传其他颜色
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {};
  },
  methods: {
    clickTabBar() {
      this.$router.push(this.path);
    },
  },
  computed: {

    // 选中图片及文字样式
    isActive() {
      return this.$route.path.indexOf(this.path) > -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-bottom: 2px;
}
.active {
  color: red;
}
</style>
