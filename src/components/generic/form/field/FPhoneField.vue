<template>
  <v-text-field v-bind="$props" :value="modelValue"  @input="(newValue) => modelValue = newValue" ></v-text-field>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VTextField } from "vuetify/lib/components";

@Component({
  components: {
    VTextField,
  },
})
export default class FPhoneField extends VTextField {

  // @Prop()
  // mask: (x:any) => {}

  mask = (value: string | number) => {
    const stringValue = value.toString();
    return stringValue
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{3})(\d{4})/, '$1-$2')
  };
  
  // MODEL VALUE - START
  @Prop()
  value: string;

  get modelValue() {
    // const x = this.mask(this.value)
    // return x;
    return this.value
  }

  set modelValue(newModelValue: string) {
    if(newModelValue) {
      this.$emit("input",newModelValue);
    } else {
      this.$emit("input", 0);
    }
    
  }
  // MODEL VALUE - END

}
</script>
