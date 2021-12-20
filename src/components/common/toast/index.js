import Toast from './Toast.vue';
let plugin = {};
plugin.install = function(Vue){
  let toastConstructor = Vue.extend(Toast);
  const toast = new toastConstructor()
  toast.$mount(document.createElement('div'))
  document.body.appendChild(toast.$el);
  Vue.prototype.$toast = toast;
}


export default plugin;
