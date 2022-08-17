<template>
  <!-- <v-switch v-bind="$props" v-model="modelValue"></v-switch> -->
  <v-switch
      :value="modelValue"
      @change="updateModel"
      inset
      :label="`Switch 1: ${modelValue}`"
      :false-value="false"
      :true-value="true"
    ></v-switch>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VSwitch } from "vuetify/lib/components";

@Component({
  components: {
    VSwitch,
  },
})
export default class FSwitch extends VSwitch {
    switch1 = true
  // MODEL VALUE - START
  @Prop()
  value: boolean;

  get modelValue() {
    return this.value;
  }

  // set modelValue(newModelValue: boolean) {
  //   this.$emit("input", newModelValue);
  // }
  updateModel(newModelValue: boolean) {
    console.log("FSwitch updateModel");
    this.$emit("input", newModelValue);
  }
  // MODEL VALUE - END

}
</script>
