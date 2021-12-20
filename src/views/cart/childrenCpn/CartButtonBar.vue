<template>
  <div class="cart-button-bar">
    <div class="left">
      <check-button class="check-content"
                    :isActive="selectAll"></check-button>
      <span class="check-all" @click="allSelectBtn">全选</span>
    </div>
    <div class="center">
      <span>合计：￥{{totalPrice}}</span>
    </div>
    <div class="calculate right" @click="settlement">去结算({{checkedLength}})</div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import { ALL_SELECT } from 'store/mutation-type.js'
import CheckButton from 'components/content/checkButton/CheckButton.vue';
export default {
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters({
      cartList: 'cartList'
    }),
    totalPrice() {
      return this.cartList.filter(item => item.checked)
            .reduce((priv, item) => priv += item.count * item.realPrice, 0).toFixed(2)
    },
    checkedLength() {
      return this.cartList.filter(item => item.checked).length;
    },
    selectAll() {
      return this.cartList.every(item => item.checked)
    }
  },
  methods: {
    allSelectBtn() {
      this.$store.commit(ALL_SELECT, !this.selectAll)
    },
    settlement() {
      let selectGood = this.cartList.some(item => item.checked)
      if(!selectGood) {
        this.$toast.show('请至少选择一件商品', 2700)
      }
    }
  }
}
</script>

<style scoped>
  .cart-button-bar{
    height: 44px;
    background-color: #f5f4f4;
    position:relative;
    bottom: 0px;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
  }
  .left{
    width: 80px;
    display: flex;
    margin-left: 10px;
  }
  .check-content{
    height: 19px;
    width: 19px;
    margin-right: 10px;
  }
  .center{
    flex: 1
  }
  .right{
    width: 90px;
    height: 100%;
    line-height: 44px;
    text-align: center;
    background-color: rgb(253, 66, 66);
    color:azure
  }
  .icon-selector {
    position: relative;
    margin: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid rgb(243, 241, 241);
    cursor: pointer;
  }

  .selector-active {
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>
