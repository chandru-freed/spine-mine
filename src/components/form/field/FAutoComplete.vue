<template>
  <v-autocomplete v-model="modelValue" v-bind="$props" @select="onSelect"></v-autocomplete>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VAutocomplete } from "vuetify/lib";
@Component({
  components: {
    "v-autocomplete": VAutocomplete,
  },
})
export default class FAutocomplete extends VAutocomplete {
  
  @Prop()
  onSelect: () => void;









  

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
