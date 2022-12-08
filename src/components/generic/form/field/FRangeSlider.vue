<template>
  <div>
    <v-slider
      v-bind="$props"
      :value="modelValue"
      thumb-label="always"
      @input="(newValue) => (modelValue = newValue)"
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
  set modelValue(newModelValue: number) {
    this.$emit("input", newModelValue);
  }
  // MODEL VALUE - END
  
}
</script>
