<template>
  <v-text-field
    v-bind="$props"
    :value="modelValue"
    @input="(newValue) => (modelValue = newValue)"
    v-on:keypress="keyPress"
  ></v-text-field>
</template>
  <script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VTextField } from "vuetify/lib/components";
import FTextField from "./FTextField.vue";

@Component({
  components: {
    VTextField,
  },
})
export default class FNumberTextField extends FTextField {
  // Constraining only number if mask is provided
  keyPress(event: any) {
    console.log("calling");
    // console.log($event.keyCode); //keyCodes value
    if (this.mask) {
      let keyCode = event.keyCode ? event.keyCode : event.which;
      // if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
        event.preventDefault();
      }
    }
  }
}
</script>
  