<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="center" class="home-nav-bar-center">购物街</div>
    </nav-bar>
    <tabControl :titles="['流行', '新款', '精选']"
                v-show="isShowTabControl"
                class="tab-control"
                @tabClick="tabClick"
                ref="tabControl1"/>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @positionScroll="positionScroll"
      :pull-up-load="true"
      @pullingUp="pullingUp"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommend="recommend"></recommend-view>
      <feature-view />
      <tabControl
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goodList="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="toTopBtn" v-show="isShowBackTop" />
  </div>
</template>

<script>
import { imageListenerMixin, backToTop } from 'common/mixin.js'

import NavBar from "components/common/nav-bar/NavBar";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/backTop/BackTop.vue";
import HomeSwiper from "./childrenComponents/HomeSwiper.vue";
import RecommendView from "./childrenComponents/RecommendView.vue";
import FeatureView from "./childrenComponents/FeatureView.vue";

import { getHomeMultidata, getHomeGoods } from "network/home";
export default {
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      tabControlOffsetTop: 0,
      isTabFixed: false,
      isShowTabControl: false,
      saveY: 0,

    };
  },
  mixins: [imageListenerMixin, backToTop],
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    positionScroll(position) {
      this.isShowBackTop = (-position.y) > 1000;
      this.isShowTabControl = (-position.y) > this.tabControlOffsetTop + 44
    },
    pullingUp() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      this.tabControlOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommend = res.data.recommend.list;
        this.$forceUpdate();
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page = page;
        this.$refs.scroll.pullingUpFinish();
      });
    },
  },
  created() {
    // 1、请求轮播图及精选数据
    this.getHomeMultidata();

    // 2、请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 组件销毁停止监听图片加载完成操作
    this.$bus.$off('itemImgUpLoad', this.imageLoad)

    // 组件缓存起来的时候记录一下当前滚动位置
    this.saveY = this.$refs.scroll.getScrollY();
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
}

#home .home-nav-bar {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
#home .tab-control{
  position:relative;
  z-index: 10;
  background: white;
}

#home .home-nav-bar {
  background: rgb(223, 95, 71);
}

#home .home-nav-bar-center {
  color: var(--color-background);
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/* .content{
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>
