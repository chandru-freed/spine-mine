<template>
  <v-card outlined height="1000px">
    <v-card flat min-height="600">
      <router-view></router-view>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CFPaymentLayout extends Vue {}
</script>
