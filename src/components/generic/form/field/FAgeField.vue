<template>
<div>
  <v-text-field
    v-bind="$props"
    :value="modelValue"
    @input="(newValue) => (modelValue = newValue)"
  ></v-text-field>
</div>
</template>
<script lang="ts">
import moment from "moment";
import { Component, Prop } from "vue-property-decorator";
import { VTextField } from "vuetify/lib/components";

@Component({
  components: {
    VTextField,
  },
})
export default class FAgeField extends VTextField {
  // MODEL VALUE - START
  @Prop()
  value: string;


  get modelValue() {
    const age = moment().year() - moment(new Date(this.value)).year()
    return age.toString() + ' years'
  }

  set modelValue(newModelValue: string) {
    this.$emit("input", newModelValue);
  }
  // MODEL VALUE - END
}
</script>
