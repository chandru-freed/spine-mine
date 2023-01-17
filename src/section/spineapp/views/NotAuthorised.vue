<template>
  <v-card flat class="text-center pa-5">
    <h1 class="error--text">403</h1>
    <v-card-text>YOU DONT HAVE THE ACCESS TO VIEW THIS PAGE</v-card-text>
    <v-btn color="primary" @click="gotoHomepage()"> Go to Homepage </v-btn>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
@Component
export default class NotAuthorised extends Vue {
  gotoHomepage() {
    this.$router.push({ name: "Root.Home" });
  }
}
</script>