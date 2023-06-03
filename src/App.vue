<template>
  <p class="center"><img alt="Vue logo" src="./assets/logo.png"></p>

  <ContentBlock/>
  <Footer/>
  <CreativeBtn/>
</template>

<script>
import ContentBlock from './components/ContentBlock.vue'
import Footer from "@/components/app/Footer.vue";
import CreativeBtn from "@/components/app/CreativeBtn.vue";

export default {
  name: 'App',
  components: {
    CreativeBtn,
    Footer,
    ContentBlock
  }
}
</script>

<style lang="scss">
html{
  height: 100%;
}

body{
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 17px;
  color: #2c3e50;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

:root{
  // bg
  --selct-hover-color: #b2d3f4;
  --red-color: #EF5350;
  // shadow
  --card-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  // fonts
  --h1-color: rgba(0, 0, 0, 0.87);
  --h2-color: rgba(0, 0, 0, 0.6);
  // border
  --border-solid: rgba(0, 0, 0, 0.12);
  // radius
  --b-radius: 1px;
  // icons
  --bs-accordion-icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23212529'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
  // transition
  --selct-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
</style>
