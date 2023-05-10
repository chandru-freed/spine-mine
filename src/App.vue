<template>
  <!-- <v-app>

    <left-navigation-bar></left-navigation-bar>

    <app-bar></app-bar>

    <v-main class="grey lighten-4">

      <v-container fluid class="pa-0" >

        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app> -->
  <v-app>
    <!-- <div style="visibility: hidden; height: 0">
      <AmeyoToolbarDialog />
    </div> -->
    <!-- <div >
      <AmeyoToolbarDialog />
    </div> -->
    <router-view />
  </v-app>
</template>

<script >
// import AmeyoToolbarDialog from "./components/generic/ameyo/AmeyoToolbarDialog.vue";
// import HelloWorld from '@/components/HelloWorld';
// import AppBar from '@/section/spineapp/views/bar/AppBar.vue';
// import LeftNavigationBar from '@/section/spineapp/views/bar/LeftNavigationBar.vue';

export default {
  name: "App",

  components: {
    // LeftNavigationBar,
    // AppBar,
    // AmeyoToolbarDialog
  },

  data: () => ({
    // drawer: true,
    // mini: true
  }),
};
</script>
<style scoped>
</style>

