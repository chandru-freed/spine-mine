<template>
  <v-app-bar  flat dense  class="grey lighten-2"  >
    <v-spacer></v-spacer>
    <div class="mt-6 py-2">
      <v-text-field
        flat
        placeholder="Quick Search"
        outlined
        rounded
        dense
        append-icon="mdi-magnify"
      ></v-text-field>
    </div>
    <!-- <v-btn icon @click="$router.push({name: 'Root.Request.CreateRequest'})"><v-icon>mdi-plus-box</v-icon></v-btn> -->
    <v-btn icon @click="$router.push({name: 'Root.CreateClient'})"><v-icon>mdi-account-plus</v-icon></v-btn>
    <app-bar-notification-menu />
    <app-bar-user-menu />
  </v-app-bar>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld';
import AppBarUserMenu from '@/components/AppBarUserMenu';
import AppBarNotificationMenu from '@/components/AppBarNotificationMenu';

export default {
  name: 'AppBar',

  components: {
    AppBarUserMenu,
    AppBarNotificationMenu,
  },

  data: () => ({
    // drawer: true,
    // mini: true
  }),
};
</script>
<style scoped></style>
