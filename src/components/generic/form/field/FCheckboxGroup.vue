<template>
  <div >
    <v-toolbar-title>{{label}}</v-toolbar-title>
    <v-checkbox v-for="option of options"
    :value="getOptionValue(option)"
    :key="getOptionValue(option)"
    v-model="modelValue"
    :label="getOptionLabel(option)" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { VSwitch } from "vuetify/lib/components";

/**
 * -----------------------------------------------------------------------------------------------------
 * NOTE: 
 * 1. FSwitch extends Vue and NOT VSwitch as VSwitch $emits does not emit the right value.
 * 2. @change is used instead of @input
 * -----------------------------------------------------------------------------------------------------
 */

@Component({
})
export default class FCheckboxGroup extends Vue {



  @Prop()
  label: boolean;

  
  @Prop()
  disabled: boolean;
  // MODEL VALUE - START
  @Prop()
  value: any[];

    @Prop({default: () => []})
    options: string[];

  @Prop()
  optionValue: string;
  
  @Prop() 
  optionLabel: string;

  getOptionValue(option: any) {
    return this.optionValue?option[this.optionValue]:option
  }

  getOptionLabel(option: any) {
    return this.optionLabel?option[this.optionLabel]:option
  }
  

  get modelValue() {
    return this.value;
  }

  set modelValue(newModelValue: any[]) {
    this.$emit("input", newModelValue);
  }
 
  // MODEL VALUE - END
}
</script>
