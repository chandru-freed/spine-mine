<template>
  <v-switch v-model="modelValue" v-bind="$props" ></v-switch>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VSwitch } from "vuetify/lib";
@Component({
  components: {
    "v-switch": VSwitch,
  },
})
export default class FSwitch extends VSwitch {
  










  
  // V-MODEL START
  @Prop({default: false})
  value!: boolean;

  get modelValue(): boolean {
    return this.value;
  }

  //WARNING:  v-switch does not have input event, so using change
  set modelValue(value) {
    this.$emit('change', value) 
  }
  // V-MODEL END


}
</script>
