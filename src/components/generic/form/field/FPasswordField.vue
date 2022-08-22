<template>
  <v-text-field
    v-bind="$props"
    :value="modelValue"
    @input="(newValue) => (modelValue = newValue)"
    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
    :type="show1 ? 'text' : 'password'"
    hint="At least 8 characters"
    counter
    @click:append="show1 = !show1"
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
export default class FPasswordField extends VTextField {
  show1 = false;
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
