<template>
  <v-text-field
    v-bind="$props"
    :value="modelValue"
    @input="(newValue) => (modelValue = newValue)"
  ></v-text-field>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VTextField } from "vuetify/lib/components";
import IMask from "imask";

@Component({
  components: {
    VTextField,
  },
})
export default class FFooTextField extends VTextField {
  // MODEL VALUE - START
  masked: any = IMask.createMask({
    mask: "(91)000-000-00-00",
    // ...and other options
  });
  @Prop()
  value: string;

  mounted() {}


  get modelValue() {
    this.masked.resolve(this.value);
    return this.masked.value;
  }

  set modelValue(newModelValue: string) {
    this.masked.resolve(newModelValue);
    this.$emit("input", this.masked.unmaskedValue);
  }
  // MODEL VALUE - END
}
</script>
