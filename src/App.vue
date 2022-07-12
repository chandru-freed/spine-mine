<template>
  <v-app>

    <left-navigation-bar></left-navigation-bar>


    <!-- <v-app-bar app dense  flat class="grey lighten-2">
      <v-spacer></v-spacer>
      <div class="mt-6 py-2">
        <v-text-field  flat placeholder="Quick Search" outlined rounded  dense append-icon="mdi-magnify"></v-text-field>
      </div>
      <app-bar-notification-menu/>
      <app-bar-user-menu/>
    </v-app-bar> -->
    <app-bar></app-bar>

    <v-main class="grey lighten-4">

      <!-- Provides the application the proper gutter -->
      <v-container fluid class="pa-0" >

        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
      
    <!-- <v-footer app>
      
    </v-footer> -->
  </v-app>
</template>

<script >
// import HelloWorld from '@/components/HelloWorld';
import AppBar from '@/section/spineapp/views/bar/AppBar.vue';
import LeftNavigationBar from '@/section/spineapp/views/bar/LeftNavigationBar.vue';

export default {
  name: 'App',

  components: {
    LeftNavigationBar,
    AppBar,
  },

  data: () => ({
    // drawer: true,
    // mini: true
  }),
};
</script>
<style scoped>

</style>

