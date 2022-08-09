<template>
  <v-select v-bind="$props" v-model="modelValue" ></v-select>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VSelect } from "vuetify/lib";

@Component({
  components: {
    VSelect,
  },
})
export default class FSelectField extends VSelect {
  

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
