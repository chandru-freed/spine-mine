<template>
  <v-container fluid>
    <router-view></router-view>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";


@Component({
  components: {
  },
})
export default class RequestLayout extends Vue {}
</script>
