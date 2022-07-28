<template>
  <v-textarea v-model="modelValue" v-bind="$props" @change="onChange"></v-textarea>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VTextarea } from "vuetify/lib";
@Component({
  components: {
    "v-textarea": VTextarea,
  },
})
export default class FTextarea extends VTextarea {
  
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
