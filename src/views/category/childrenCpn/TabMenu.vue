<template>
  <scroll id="tab-menu" ref="scroll">
    <div class="menu-list">
      <div  class="menu-list-item"
            v-for="(item, index) in categories"
            :key="item.maitKey"
            :class="{active: index === isActive}"
            @click="selectItem(index)">
        {{item.title}}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";
export default {
  props: {
    categories: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isActive: 0
    }
  },
  components: {
    Scroll,
  },
  created() {
  },
  mounted() {
    // 监听数据是否回来，回来以后对betterScroll进行刷新
    this.$bus.$on('categoryUpload', this.betterScrollRefresh)
  },
  methods: {
    betterScrollRefresh() {
      this.$nextTick(() => {
        this.$refs.scroll.refresh();
      })
    },
    selectItem(index) {
      this.isActive = index;
      this.$emit('selectItem', index)
    }
  }
};
</script>

<style scoped>
  #tab-menu{
    height: 100%;
    width: 100px;
    background-color: #f6f6f6;
    box-sizing: border-box;
    overflow: hidden;
  }
  .menu-list-item{
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }

  .menu-list-item.active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }

</style>
