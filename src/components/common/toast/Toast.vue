<template>
  <div class="toast" v-show="isShowToast">
    <div class="message">
      {{message}}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowToast: false,
      message: ''
    }
  },
  methods: {
    show(message, duration = 1700) {
      this.isShowToast = true;
      this.message = message;
      setTimeout(() => {
        this.isShowToast = false;
        this.message = message;
      }, duration)
    }
  }
}
</script>

<style scoped>
  .toast{
    position:fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }
  .message{
    border-radius: 10%;
    padding: 10px 8px;
    font-size: 20px;
    background: rgba(0, 0, 0, 0.78);
    color: azure;
  }
</style>
