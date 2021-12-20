<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div slot="left" class="title-left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title-center">
        <div  v-for="(item, index) in titles"
              :key="item"
              :class="[currentIndex === index ? isShowActive : false, 'title-center-item']"
              @click="btnControl(index)">
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/nav-bar/NavBar.vue";
export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
      isShowActive: 'active'
    };
  },
  components: {
    NavBar,
  },
  methods: {
    btnControl(index) {
      this.currentIndex = index;
      this.$emit('titleClick', index);
    },
    backClick() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
  .title-center{
    display: flex;
    /* justify-content: space-between; */
    font-size: 14px;
  }
  .title-center-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .title-left{
    margin-top: 6px;
  }
</style>
