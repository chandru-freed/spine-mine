<template>
  <v-text-field
    v-bind="$props"
    :value="modelValue"
    @input="(newValue) => (modelValue = newValue)"
    @keypress="keyPress"
  ></v-text-field>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VTextField } from "vuetify/lib/components";

@Component({
  components: {
    VTextField,
  },
})
export default class FNumberField extends VTextField {
  // MODEL VALUE - START
  @Prop()
  value: string;

  get modelValue() {
    return this.value;
  }

  set modelValue(newModelValue: string) {
    if (newModelValue) {
      this.$emit("input", Number.parseFloat(newModelValue));
    } else {
      this.$emit("input", 0);
    }
  }

  keyPress(event: any) {
    let keyCode = event.keyCode ? event.keyCode : event.which;
    // if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
    if (keyCode < 48 || keyCode > 57) {
      // 46 is dot
      event.preventDefault();
    }
  }
  // MODEL VALUE - END
}
</script>
