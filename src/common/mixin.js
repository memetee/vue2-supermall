import { debounce } from "./utils.js";

export const imageListenerMixin = {
  data() {
    return {
      imageLoad:null
    }
  },
  mounted() {
    // 这里要延迟一下才能拿到dom
    setTimeout(() => {
      this.$refs.scroll.refresh();
    }, 500);

    // 当所有的推荐图片加载完以后执行refresh方法
    let refreshDebounce = debounce(this.$refs.scroll.refresh, 200);
    this.imageLoad = () => {
      refreshDebounce();
    };
    this.$bus.$on("itemImgUpLoad", this.imageLoad);
  },
};

// 使用回到顶部组件的mixin
export const backToTop = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    // 回到顶部
    toTopBtn() {
      this.$refs.scroll.scrollTo(0, 0, 1000);
    },
  }
}
