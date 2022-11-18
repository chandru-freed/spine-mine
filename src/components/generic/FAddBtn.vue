<template>
  <v-btn
    outlined
    v-bind="$props"
    color="primary"
    small
    class="elevation-0 ml-3"
    @click="buttonClicked()"
  >
    <v-icon small class="pr-1">mdi-plus-circle</v-icon>
    {{ label }}</v-btn
  >
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VBtn } from "vuetify/lib/components";

@Component({
  components: {
    VBtn,
  },
})
export default class FAddBtn extends VBtn {
  @Prop({
    default: "Create",
  })
  label: string;

  @Prop()
  onClick: () => void;

  buttonLoading: boolean = false;

  buttonClicked() {
    this.$emit("click");
  }
}
</script>
