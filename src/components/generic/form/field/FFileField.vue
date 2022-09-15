<template>
  <v-file-input
    v-bind="$props"
    :value="modelValue"
    @change="(newValue) => (modelValue = newValue)"
    :id="id"
    :label="label"
    :disabled="disabled"
    :outlined="outlined"
  ></v-file-input>
</template>
<script lang="ts">
import { Component, Prop,Vue } from "vue-property-decorator";
import { VFileInput } from "vuetify/lib/components";

@Component({
  components: {
    VFileInput,
  },
})
export default class FFileField extends Vue {
  // MODEL VALUE - START
  @Prop()
  value: File;

  @Prop()
  id: string;

  @Prop()
  label: string;

  @Prop()
  disabled: File;

  @Prop()
  outlined: boolean;

  get modelValue() {
    return this.value;
  }

  set modelValue(newModelValue: File) {
    console.log(newModelValue)
    this.$emit("input", newModelValue);
  }
  // MODEL VALUE - END
}
</script>

<style>
::v-deep .v-input__slot{
  min-height: 42px !important;
}
</style>
