<template>
  <div class="tab-content-category">
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategories.list">
      <div class="item" v-for="item in subcategories.list" :key="item.acm">
        <a :href="item.link">
          <img :src="item.image" alt="" class="item-img" @load="updateImg">
          <div class="item-text">{{item.title}}</div>
        </a>
      </div>
    </grid-view>
  </div>
</template>

<script>
import GridView from 'components/common/grid-view/GridView.vue';
export default {
  props: {
    subcategories: {
      type: Object,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      count: 0
    }
  },
  components: {
    GridView
  },
  methods: {
    updateImg() {
      this.count++
      if(this.count === this.subcategories.list.length) {
        this.$bus.$emit('categoryUpdateImg')
      }
    }
  }
}
</script>

<style scoped>
  .item{
    text-align: center;
    font-size: 12px;
  }

  .item-img{
    width: 80%;
  }

  .item-text{
    margin-top: 15px;
  }
</style>
