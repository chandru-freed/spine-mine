<template>
  <v-text-field
    v-bind="$props"
    :value="modelValue"
    @input="(newValue) => (modelValue = newValue)"
  ></v-text-field>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VTextField } from "vuetify/lib/components";

@Component({
  components: {
    VTextField,
  },
})
export default class FTextField extends VTextField {
  @Prop()
  value: string;

  @Prop()
  mask: string;

  @Prop()
  unmask: string;

  /**
   * ***************DO NOT DELETE*************************
   * maxlength is not available in a VTextField props.
   * thats why we have added as a prop.
   * but it is passed to the built in html props.
   * ****************************************************
   */
  @Prop()
  maxlength: string;

  mounted() {}

  get modelValue() {
    return this.mask ? this.getMaskedValued(this.value) : this.value;
  }

  set modelValue(newModelValue: string) {
    const value = this.mask
      ? this.getUnMaskedValue(newModelValue)
      : newModelValue;
    this.$emit("input", value);
  }

  getMaskedValued(value: string): string {
    if (!value) {
      return "";
    }
    return this.formatDefault(value, this.mask);
  }

  getUnMaskedValue(value: string) {
    if (!value) {
      return "";
    }
    return this.formatDefault(value, this.unmask);
  }

  formatDefault(value: string, mask: string) {
    value = this.clearValue(value);
    let result = "";
    let count = 0;
    if (value) {
      let arrayValue = value.toString().split("");
      let arrayMask = mask.toString().split("");
      for (var i = 0; i < arrayMask.length; i++) {
        if (i < arrayValue.length + count) {
          if (arrayMask[i] === "#") {
            result = result + arrayValue[i - count];
          } else {
            result = result + arrayMask[i];
            count++;
          }
        }
      }
    }
    return result;
  }

  clearValue(value: string) {
    let result = "";
    if (value) {
      let arrayValue = value.toString().split("");
      for (var i = 0; i < arrayValue.length; i++) {
        if (this.isValid(arrayValue[i])) {
          result = result + arrayValue[i];
        }
      }
    }
    return result;
  }

  isValid(value: string) {
    return this.isInteger(value);
  }

  isInteger(value: string) {
    let result = false;
    if (Number.isInteger(parseInt(value))) {
      result = true;
    }
    return result;
  }
  // MODEL VALUE - END
}
</script>
