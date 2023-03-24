<template>
  <v-file-input
    prepend-inner-icon="mdi-attachment"
    prepend-icon=""
    v-bind="$props"
    :value="modelValue"
    @change="(newValue) => (modelValue = newValue)"
    :id="id"
    :label="label"
    :disabled="disabled"
    :outlined="outlined"
    :dense="dense"
  ></v-file-input>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
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

  @Prop()
  dense: boolean;

  get modelValue() {
    return this.value;
  }

  set modelValue(newModelValue: File) {
    this.$emit("input", newModelValue);
  }
  // MODEL VALUE - END
}
</script>

<style>
.v-text-field--outlined > .v-input__control > .v-input__slot {
  min-height: 42px !important;
}
</style>
