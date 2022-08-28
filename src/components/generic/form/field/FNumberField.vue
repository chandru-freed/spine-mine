<template>
  <v-text-field v-bind="$props" :value="modelValue"  @input="(newValue) => modelValue = newValue" type="number"></v-text-field>
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
    if(newModelValue) {
      this.$emit("input", Number.parseFloat(newModelValue));
    } else {
      this.$emit("input", 0);
    }
    
  }
  // MODEL VALUE - END

}
</script>
