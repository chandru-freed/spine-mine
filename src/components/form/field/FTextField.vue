<template>
  <v-text-field v-mask="mask" v-model="modelValue" v-bind="$props" ></v-text-field>
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
  

  @Prop({default: ""})
  mask: string;


  

  // V-MODEL START
  @Prop()
  value!: string;

  get modelValue(): string {
    return this.value;
  }

  set modelValue(newValue) {
    this.$emit('input', newValue)
  }
  // V-MODEL END


}
</script>
<style scoped>

</style>
