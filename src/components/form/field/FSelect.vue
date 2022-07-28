<template>
  <v-select v-model="modelValue" v-bind="$props" @change="onChange"></v-select>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VSelect } from "vuetify/lib";
@Component({
  components: {
    "v-select": VSelect,
  },
})
export default class FTextField extends VSelect {
  
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
