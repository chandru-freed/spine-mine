<template>
  <!-- <v-switch v-bind="$props" v-model="modelValue"></v-switch> -->
  <v-switch
    v-model="modelValue"
    :false-value="falseValue"
    :true-value="trueValue"
    :inset="inset"
    :label="label"
  ></v-switch>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { VSwitch } from "vuetify/lib/components";

@Component({
  components: {
    VSwitch,
  },
})
export default class FSwitch extends Vue {
  // MODEL VALUE - START
  @Prop()
  value: boolean;

  @Prop()
  falseValue: boolean;

  @Prop()
  trueValue: boolean;

  @Prop()
  label: boolean;

  @Prop()
  inset: boolean;

  get modelValue() {
    return this.value;
  }

  set modelValue(newModelValue: boolean) {
    this.$emit("input", newModelValue);
  }
 
  // MODEL VALUE - END
}
</script>
