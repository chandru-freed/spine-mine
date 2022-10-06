<template>
  <v-navigation-drawer
    absolute
    permanent
    right
    :width="rightFocused ? '100%' : '49%'"
    v-if="!leftFocused"
  >
    <h1>Payment Details</h1>
  </v-navigation-drawer>
</template>

<script>
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";

@Component
export default class PaymentDetails extends Vue {
  leftFocused = false;
  rightFocused = true;
}
</script>

<style></style>
