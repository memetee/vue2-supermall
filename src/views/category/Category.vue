<template>
  <div class="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"/>
      <scroll id="tab-content" ref="scroll" :dataList="categoryItems">
        <tab-content-category :subcategories="showSubcategory"></tab-content-category>
           <tab-control :titles="['综合', '新品', '销量']"
                       @tabClick="tabClick"/>
            <goods-list :goodList="showCategoryDetail"/>
      </scroll>
    </div>
  </div>
</template>

<script>
import { getCategory, getSubcategory, getCategoryDetail } from "network/category.js";
import {NEW, POP, SELL} from 'common/const.js';
import Scroll from 'components/common/scroll/Scroll.vue';

import NavBar from "components/common/nav-bar/NavBar.vue";
import TabMenu from './childrenCpn/TabMenu.vue'
import TabContentCategory from './childrenCpn/TabContentCategory.vue';
import TabControl from 'components/content/tabControl/TabControl.vue';
import GoodsList from 'components/content/goods/GoodsList.vue';
export default {
  data() {
    return {
      categories: [],
      categoryItems: {},
      currentIndex: -1,
      currentType: POP
    }
  },
  components: {
    NavBar,
    TabMenu,
    Scroll,
    TabContentCategory,
    TabControl,
    GoodsList
  },
  created() {
    // 请求分类数据
    this._getCategory();

    // 通知子组件需要对BetterScroll进行刷新；
    this.$bus.$on('categoryUpdateImg', this.updateImg)
  },
  computed: {
    showSubcategory() {
      if(this.currentIndex === -1) return {};
      return this.categoryItems[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];

      return this.categoryItems[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  methods: {
    _getCategory() {
      getCategory().then((res) => {
        // 分类数据
        this.categories = res.data.category.list;

        // 初始化每个分类的子数据
        for(let i = 0; i < this.categories.length; i++) {
          this.categoryItems[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }

        // 请求第一个分类的数据
        this._getSubcategories(0)

        // 通知子组件需要对BetterScroll进行刷新；
        this.$bus.$emit('categoryUpload')
      });
    },

    // 获取分类的子分类数据
    _getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then(res => {
      this.categoryItems[index].subcategories = res.data

      // 这里必须要这样做，否则会没有值
      this.categoryItems = {...this.categoryItems};

      // 将分类下的子分类（流行，热卖，新款）的所有数据进行请求
      this._getCategoryDetail(POP);
      this._getCategoryDetail(NEW);
      this._getCategoryDetail(SELL);
      })
    },

    // 获取分类数据详情
    _getCategoryDetail(type) {
      // 获取请求的miniWallKey
      const miniWallKey = this.categories[this.currentIndex].miniWallkey;

      // 通过miniWallkey获取分类详情数据
      getCategoryDetail(miniWallKey, type).then(res => {
        this.categoryItems[this.currentIndex].categoryDetail[type] = res
        this.categoryItems = {...this.categoryItems}
      })
    },

    // tab切换
    tabClick(index) {
			switch (index) {
				case 0:
					this.currentType = POP
					break
				case 1:
					this.currentType = NEW
					break
				case 2:
					this.currentType = SELL
					break
			}
		},

    updateImg() {
      this.$refs.scroll.refresh();
    },

    // 左侧菜单选择
    selectItem(index) {
      this._getSubcategories(index);
    }
  },
};
</script>

<style scoped>
  .category{
    height: 100vh;
    overflow: hidden;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #ffffff;
    font-weight: 700;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
    height: calc(100% - 44px - 49px)
  }
  #tab-content{
    flex: 1;
    height: 100%;
  }
</style>
