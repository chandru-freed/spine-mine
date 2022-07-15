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
    <router-view/>
  </v-app>

</template>

<script >
// import HelloWorld from '@/components/HelloWorld';
// import AppBar from '@/section/spineapp/views/bar/AppBar.vue';
// import LeftNavigationBar from '@/section/spineapp/views/bar/LeftNavigationBar.vue';

export default {
  name: 'App',

  components: {
    // LeftNavigationBar,
    // AppBar,
  },

  data: () => ({
    // drawer: true,
    // mini: true
  }),
};
</script>
<style scoped>

</style>

