<template>
  <div>
    <v-text-field
      v-bind="$props"
      outlined
      :value="modelValue"
      @input="(newValue) => (modelValue = newValue)"
      v-bind:maxlength="mask.length"
      v-on:keypress="keyPress"
    ></v-text-field>
  </div>
</template>
  <script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VTextField } from "vuetify/lib/components";

@Component({
  components: {
    VTextField,
  },
})
export default class FTimeField extends VTextField {
  @Prop()
  value: string;

  @Prop({ default: "##:##:##" })
  mask: string;

  @Prop({ default: "##:##:##" })
  unmask: string;

  mounted() {}

  get modelValue() {
    return this.getMaskedValued(this.value);
  }

  set modelValue(newModelValue: string) {
    this.$emit("input", this.getUnMaskedValue(newModelValue));
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

  keyPress(event: any) {
    // console.log($event.keyCode); //keyCodes value
    let keyCode = event.keyCode ? event.keyCode : event.which;
    // if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
    if (keyCode < 48 || keyCode > 57) {
      // 46 is dot
      event.preventDefault();
    }
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
}
</script>
  