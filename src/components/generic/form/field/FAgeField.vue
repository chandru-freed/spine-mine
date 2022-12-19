<template>
  <v-text-field
    v-bind="$props"
    :value="modelValue"
    @input="(newValue) => (modelValue = newValue)"
  ></v-text-field>
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
    // return this.value;
    return moment
      .duration({
        years: moment(Date.now()).diff(this.value, "years", false),
      })
      .humanize();
  }

  set modelValue(newModelValue: string) {
    this.$emit("input", newModelValue);
  }

    get dobAge() {
    // return moment(this.modelValue).month(0).from(moment().month(0))
    return moment
      .duration({
        years: moment(Date.now()).diff(this.modelValue, "years", false),
      })
      .humanize();
  }


  // MODEL VALUE - END
}
</script>
