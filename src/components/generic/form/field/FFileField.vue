<template>
  <v-file-input v-bind="$props" v-model="modelValue"></v-file-input>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VFileInput } from "vuetify/lib/components";

@Component({
  components: {
    VFileInput,
  },
})
export default class FFileField extends VFileInput{
  

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
