<template>
  <v-text-field v-bind="$props" v-model="modelValue" ></v-text-field>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import {  VTextField } from "vuetify/lib/components";

@Component({
  components: {
    VTextField,
  },
})
export default class FDateField extends VTextField{
  

  // MODEL VALUE - START
  @Prop()
  value: string;

  get modelValue() {
    return this.value;
  }

  set modelValue(newModelValue: string) {
    this.$emit("input", newModelValue);
  }
  // MODEL VALUE - END
}
</script>
