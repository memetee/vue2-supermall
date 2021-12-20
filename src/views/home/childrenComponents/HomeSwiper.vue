<template>
  <div class="home-swiper">
    <swiper>
      <swiper-item v-for="item in banners" :key="item.image">
        <a :href="item.link">
          <img :src="item.image" @load="swiperImageLoad"/>
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import Swiper from "components/common/swiper/Swiper.vue";
import SwiperItem from "components/common/swiper/SwiperItem.vue";
export default {
  data() {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    banners: {
      type: Array,
      default: [],
    }
  },
  methods: {
    swiperImageLoad() {
      if(!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true;
      }
    }
  }
};
</script>

<style>
</style>
