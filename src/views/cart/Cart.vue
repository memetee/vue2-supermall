<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物街（{{length}}）</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <cart-button-bar />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NavBar from 'components/common/nav-bar/NavBar.vue';
import Scroll from 'components/common/scroll/Scroll.vue';
import CartList from './childrenCpn/CartList.vue'
import CartButtonBar from './childrenCpn/CartButtonBar.vue';
export default {
  components: {
    NavBar,
    CartList,
    Scroll,
    CartButtonBar
  },
  computed: {
    // 两种方式都可以
    // ...mapGetters([
    //   'cartLength'
    // ]),
    ...mapGetters({
      length: 'cartLength'
    }),
    cartLength() {
      return this.$store.state.cartList.length;
    }
  },
  activated() {
    this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar{
    background: rgb(223, 95, 71);
    color: var(--color-background);
  }
  .content{
    height: calc(100vh - 44px - 49px - 44px);
    overflow: hidden;
  }
</style>
