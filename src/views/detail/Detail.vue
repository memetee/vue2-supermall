<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="navBar"/>
    <scroll class="content" ref="scroll" :probeType="3" @positionScroll="getScrollPosition">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @infoImageLoad="infoImageLoad" />
      <detail-param-info :goodsParam="goodsParam" ref="paramInfo"/>
      <detail-comment-info :commentInfo="commentInfo" ref="commentInfo" />
      <goods-list :goodList="recommendInfo" ref="goodListInfo"/>
    </scroll>
    <detail-bottom-bar @addToCart="addCart"/>
    <back-top  @click.native="toTopBtn" v-show="isShowBackTop"/>
    <!-- <toast :message="message" :showToast="showToast"/> -->
  </div>
</template>

<script>
import { getDetail, Goods, Shop, GoodsParam, getRecomend } from 'network/detail';
import { mapActions } from 'vuex';
import {ADD_CART} from 'store/action-type.js'

import { imageListenerMixin, backToTop } from 'common/mixin.js'
import Scroll from 'components/common/scroll/Scroll.vue'

import DetailNavBar from './childComponents/DetailNavBar.vue';
import DetailSwiper from './childComponents/DetailSwiper.vue';
import DetailBaseInfo from './childComponents/DetailBaseInfo.vue';
import DetailShopInfo from './childComponents/DetailShopInfo.vue';
import DetailGoodsInfo from './childComponents/DetailGoodsInfo.vue';
import DetailParamInfo from './childComponents/DetailParamInfo.vue';
import DetailCommentInfo from './childComponents/DetailCommentInfo.vue';
import GoodsList from 'components/content/goods/GoodsList';
import DetailBottomBar from './childComponents/DetailBottomBar.vue';

import BackTop from "components/content/backTop/BackTop.vue";
// import Toast from 'components/common/toast/Toast';
export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      goodsParam : {},
      commentInfo: {},
      recommendInfo: [],
      themeTopYs: [],  //详情商品参数
      navBarIndex: 0,
      message: '哈哈哈',
      // showToast: false
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    Scroll,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    // Toast
  },
  mixins: [imageListenerMixin, backToTop],
  created() {
    // 获取iid
    this.iid = this.$route.params.iid;

    // 请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result;

      // 取出轮播图信息
      this.topImages = data.itemInfo.topImages

      // 创建商品的对象
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

      // 取出商品店铺的信息
      this.shop = new Shop(data.shopInfo);

      // 取出商品详情的信息
      this.goodsParam = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 商品详情图片
      this.detailInfo = data.detailInfo;

      // 评论信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    })

    // 请求推荐数据
    getRecomend().then(res=> {
      this.recommendInfo = res.data.list;
    })
  },
  methods: {
    ...mapActions({
      ADD_CART
    }),
    // info组件中的所有图片加载完以后调用一次refresh
     infoImageLoad() {
      this.$refs.scroll.refresh();
      this.themeTopYs = [];

      // 商品的offsetTop
      this.themeTopYs.push(0)

      // 详情的offsetTop
      this.themeTopYs.push(this.$refs.paramInfo.$el.offsetTop)

      // 评论的offsetTop
      this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop)

      // 推荐的offsetTop
      this.themeTopYs.push(this.$refs.goodListInfo.$el.offsetTop)

      // 多增加一个最大的数，用来做下面的赋值判断
      this.themeTopYs.push(Number.MAX_VALUE);
    },

    // 监听顶部导航栏点击
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      // this.$refs.scroll.position(300)
    },

    // 监听滚动事件
    getScrollPosition(scrollPosition) {
      let top = Math.abs(scrollPosition.y)

      // 监听滚动距离对应顶部tabBar的位置
      let length = this.themeTopYs.length
      for(let i = 0; i < length - 1; i++) {
        // 这种方式比较麻烦
        // if(this.navBarIndex !== i && ((i < length - 1 && top >= this.themeTopYs[i] && top < this.themeTopYs[i+1]) ||( top > this.themeTopYs[i] && i === length - 1))){
        //   this.navBarIndex = i;
        //   this.$refs.navBar.$data.currentIndex = i;
        // }

        if(this.navBarIndex !== i && top >= this.themeTopYs[i] && top < this.themeTopYs[i+1]){
            this.navBarIndex = i;
            this.$refs.navBar.$data.currentIndex = i;

        }
      }

      // 监听是否回到顶部
      this.isShowBackTop = top > 1000;
    },

    // 添加进购物车
    addCart() {
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.newPrice;
      product.iid = this.iid;
      product.realPrice = this.goods.realPrice;
      this.ADD_CART(product).then(res => {
        this.$toast.show(res, 5000)
      })
    }

  }
};
</script>

<style scoped>
#detail {
  position:relative;
  z-index: 9;
  background: #fff;
  height: 100vh;
}
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
.content{
  height: calc(100% - 44px - 49px);
}
</style>
