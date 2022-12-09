<template>
  <div>
    <v-slider
      v-bind="$props"
      :value="modelValue.tenure"
      :rules="rules"
      thumb-label="always"
      @input="(newValue) => (modelValue.tenure = newValue)"
    />
  </div>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VSlider } from "vuetify/lib";

@Component({
  components: {
    VSlider,
  },
})
export default class FRangeSlider extends VSlider {
  // MODEL VALUE - START
  @Prop()
  value: number;

  get modelValue() {
    return this.value;
  }
  set modelValue(newModelValue: any) {
    this.$emit("input", newModelValue);
  }
  // MODEL VALUE - END

  get rules() {
    return [
      (v: number) => this.modelValue.tenure <= this.modelValue.tenureApproval,
      (v: number) =>
        Math.round(this.modelValue.monthlyObligation) <=
        Math.round(this.modelValue.affordability),
    ];
  }
}
</script>

