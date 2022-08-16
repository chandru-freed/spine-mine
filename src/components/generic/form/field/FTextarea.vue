<template>
  <v-textarea v-bind="$props" v-model="modelValue"></v-textarea>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VTextarea } from "vuetify/lib/components";

@Component({
  components: {
    VTextarea,
  },
})
export default class FTextarea extends VTextarea{
  

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
