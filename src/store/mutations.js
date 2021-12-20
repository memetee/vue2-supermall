
import { PUSH_CART, ADD_CART_PAYLOAD, ALL_SELECT } from './mutation-type'
export default {
  [PUSH_CART](state, payload) {
    payload.checked = true;
    state.cartList.push(payload);
  },
  [ADD_CART_PAYLOAD](state, payload) {
    payload.count++;
  },
  [ALL_SELECT](state, payload) {
    state.cartList.forEach(item => {
      item.checked = payload
    })
  }
};
