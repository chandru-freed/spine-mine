<template>
  <div>
    <v-navigation-drawer
      absolute
      permanent
      right
      :width="rightFocused ? '100%' : '49%'"
      v-if="!leftFocused"
    >
      <router-view />
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class RequestLayout extends Vue {
  leftFocused = false;
  rightFocused = true;
}
</script>
