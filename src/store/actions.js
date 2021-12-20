import { ADD_CART_PAYLOAD, PUSH_CART } from "./mutation-type";
import { ADD_CART } from "./action-type";
export default {
  [ADD_CART](context, payload) {
    return new Promise((resolve, reject) => {
      let oldCartList = context.state.cartList.find(
        (item) => item.iid === payload.iid
      );
      if (oldCartList) {
        context.commit(ADD_CART_PAYLOAD, payload);
        oldCartList.count++;
        resolve('商品数量+1');
      } else {
        payload.count = 1;
        context.commit(PUSH_CART, payload);
        resolve('新增一件商品');
      }
    });
  },
};
