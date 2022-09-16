<template>
  <div class="d-flex">
    <v-text-field
      v-bind="$props"
      :value="modelValue"
      @input="(newValue) => (modelValue = newValue)"
    ></v-text-field>
    <v-btn
      :disabled="!isValidIfscCode"
      class="mx-2"
      @click="getBankDetails()"
      color="primary"
      >Get Details</v-btn
    >
  </div>
</template>
<script lang="ts">
import axios from "axios";
import { Component, Prop } from "vue-property-decorator";
import { VTextField } from "vuetify/lib/components";
// const ifsc =require("ifsc");

@Component({
  components: {
    VTextField,
  },
})
export default class FIFSCCodeField extends VTextField {
  // MODEL VALUE - START
  @Prop()
  onSelect: (details: any) => void;
  @Prop()
  value: string;

  ifscCodeRegex = /^[A-Za-z]{4}\d{7}$/;

  get isValidIfscCode() {
    return this.modelValue.match(this.ifscCodeRegex);
  }
  get modelValue() {
    return this.value;
  }

  set modelValue(newModelValue: string) {
    this.$emit("input", newModelValue);
  }
  // MODEL VALUE - END

  async getBankDetails() {
    const razorpayUrl = `https://ifsc.razorpay.com/${this.modelValue}`;
    try {
      const axiosResponse = await axios.get(razorpayUrl);
      this.onSelect(axiosResponse.data);
    } catch (e) {
      console.log(e);
    }
  }
}
</script>
