<template>
  <v-text-field v-model="modelValue" v-bind="$props" @change="onChange"></v-text-field>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VTextField } from "vuetify/lib";
@Component({
  components: {
    "v-text-field": VTextField,
  },
})
export default class FTextField extends VTextField {
  
  @Prop()
  onChange: () => void;









  

  // V-MODEL START
  @Prop()
  value!: string;

  get modelValue(): string {
    return this.value;
  }

  set modelValue(value) {
    this.$emit('input', value)
  }
  // V-MODEL END


}
</script>
