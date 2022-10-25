<template>
  <v-btn v-bind="$props" @click="buttonClicked()" :loading="buttonLoading">{{
    label
  }}</v-btn>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VBtn } from "vuetify/lib/components";

@Component({
  components: {
    VBtn,
  },
})
export default class FBtn extends VBtn {
  @Prop()
  label: string;

  @Prop()
  onClick: () => void;

  buttonLoading: boolean = false;

  buttonClicked() {
    this.buttonLoading = true;
    this.onClick();
    setTimeout(() => {
      this.buttonLoading = false;
    }, 500);
  }
}
</script>
