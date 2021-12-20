<template>
  <div class="scroll" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
    dataList: {
      type: Array | Object,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      scroll: null,
    };
  },
  watch: {
    dataList() {
      this.refresh();
    }
  },
  mounted() {
    let wrapper = this.$refs.wrapper;
    this.scroll = new BScroll(wrapper, {
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad,
    });
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        this.$emit("positionScroll", position);
      });
    }
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    scrollTo(x, y, time = 0) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    pullingUpFinish() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    }
  },
};
</script>

<style scoped>
.scroll{
  overflow:hidden;
}
</style>
