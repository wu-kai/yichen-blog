<template>
  <div class="wave">
    <div class="w4 fa fa-bars bar" @click="showMenu()"></div>
    <div class="w1"></div>
    <div class="w2"></div>
    <div class="w3"></div>
  </div>
</template>

<script>

  export default {
    name: 'NavigationBar',
    mounted() {
      document.querySelector(".bar").addEventListener("mouseover", function () {
        this.parentNode.classList.add("animate")
      });
      document.querySelector(".bar").addEventListener("mouseout", function () {
        this.parentNode.classList.remove("animate")
      })
    },
    methods: {
      showMenu() {
        this.$store.commit('switchMenu')
      }
    }
  }
</script>

<style scoped>
  .bar:hover {
    color: #5cb0f4;
    cursor: pointer;
  }

  .bar {
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 999;
    font-size: 30px;
    color: #dfdfdf;
  }

  @-webkit-keyframes opac {
    from {
      opacity: 1;
      width: 10px;
      height: 10px;
      top: calc(50% - 5px);
      left: calc(50% - 5px);
    }
    to {
      opacity: 0;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }

  .w1, .w2, .w3 {
    visibility: hidden;
  }

  .animate .w1 {
    visibility: visible;
    -webkit-animation: opac 1.3s infinite;
  }

  .animate .w2 {
    visibility: visible;
    -webkit-animation: opac 1.3s infinite;
    -webkit-animation-delay: .2s;
  }

  .animate .w3 {
    visibility: visible;
    -webkit-animation: opac 1.3s infinite;
    -webkit-animation-delay: .4s;
  }

  .wave {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
  }

  .wave * {
    border: 1px solid #42a5f5;
    position: absolute;
    border-radius: 50%;
  }

  .w4 {
    border-radius: 0;
    width: 30px;
    height: 30px;
    top: calc(50% - 15px);
    left: calc(50% - 15px);
    border: none
  }
</style>
