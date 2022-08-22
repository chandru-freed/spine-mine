<template>
  <!-- <v-switch v-bind="$props" v-model="modelValue"></v-switch> -->
  <v-switch
    :value='modelValue'
    @change="(newValue) => modelValue = newValue"
    :false-value="falseValue"
    :true-value="trueValue"
    :inset="inset"
    :label="label"
  ></v-switch>
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
  components: {
    VSwitch,
  },
})
export default class FSwitch extends Vue {

  @Prop()
  falseValue: boolean;

  @Prop()
  trueValue: boolean;

  @Prop()
  label: boolean;

  @Prop()
  inset: boolean;
  
  // MODEL VALUE - START
  @Prop()
  value: boolean;

  

  get modelValue() {
    return this.value;
  }

  set modelValue(newModelValue: boolean) {
    this.$emit("input", newModelValue);
  }
 
  // MODEL VALUE - END
}
</script>
