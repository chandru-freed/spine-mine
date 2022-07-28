<template>
  <v-text-field v-mask="mask"  type="number" v-model="modelValue" v-bind="$props" @change="onChange"></v-text-field>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VTextField } from "vuetify/lib";
@Component({
  components: {
    "v-text-field": VTextField,
  },
})
export default class FNumberField extends VTextField {
  
  @Prop()
  onChange: () => void;

   @Prop({default: ""})
  mask: string;








  

  // V-MODEL START
  @Prop()
  value!: number;

  get modelValue(): number {
    return this.value;
  }

  set modelValue(value) {
    this.$emit('input', Number(value))
  }
  // V-MODEL END


}
</script>
