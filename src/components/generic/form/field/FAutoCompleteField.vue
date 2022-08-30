<template>
  <v-autocomplete
    :value="modelValue"
    @input="(newValue) => modelValue = newValue"
    v-bind="$props"
    :items="options"
  ></v-autocomplete>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VAutocomplete, VSelect } from "vuetify/lib";

@Component({
  components: {
    VAutocomplete,
  },
})
export default class FAutoCompleteField extends VAutocomplete {
  // MODEL VALUE - START
  @Prop()
  options: any[];
  @Prop()
  value: any;

  get modelValue() {
    return this.value;
  }

  set modelValue(newModelValue: any) {
    this.$emit("input", newModelValue);
  }
  // MODEL VALUE - END
}
</script>
