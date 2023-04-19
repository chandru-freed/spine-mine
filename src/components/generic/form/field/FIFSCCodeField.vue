<template>
  <div class="d-flex">
    <v-text-field
      v-bind="$props"
      :value="modelValue"
      @input="(newValue) => (modelValue = newValue)"
    ></v-text-field>
    <f-btn
      label="Get Details"
      class="mx-2"
      :onClick="() => getBankDetails()"
      color="primary"
      v-if="btnCondition"
    ></f-btn>
  </div>
</template>
<script lang="ts">
import FSnackbar from "@/fsnackbar";
import axios from "axios";
import { Component, Prop } from "vue-property-decorator";
import { VTextField } from "vuetify/lib/components";
import FBtn from "../../FBtn.vue";
// const ifsc =require("ifsc");

@Component({
  components: {
    VTextField,
    "f-btn": FBtn,
  },
})
export default class FIFSCCodeField extends VTextField {
  // MODEL VALUE - START
  @Prop()
  onSelect: (details: any) => void;
  @Prop()
  value: string;

  @Prop()
  btnCondition: boolean;

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
      console.log("Ifsc-===========",e);
      FSnackbar.error("Ifsc code not found")
    }
  }
}
</script>
