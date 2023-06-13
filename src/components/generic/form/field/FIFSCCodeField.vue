<template>
  <div class="d-flex align-start">
    <v-text-field
      v-bind="$props"
      :value="modelValue"
      @input="(newValue) => (modelValue = newValue)"
    >
      <v-icon slot="append" :color="ifscCodeValid ? 'green' : 'warning'">
        {{ ifscCodeValid ? "mdi-check-circle" : "mdi-information" }}
      </v-icon>
    </v-text-field>
  </div>
</template>
<script lang="ts">
import FSnackbar from "@/fsnackbar";
import axios from "axios";
import { Component, Prop } from "vue-property-decorator";
import { VTextField } from "vuetify/lib/components";
import FBtn from "../../FBtn.vue";
import FTooltip from "../../FTooltip.vue";
// const ifsc =require("ifsc");

@Component({
  components: {
    VTextField,
    "f-btn": FBtn,
    sd: FTooltip,
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

  ifscCodeValid: boolean = false;

  get modelValue() {
    return this.value;
  }

  mounted() {
    this.getBankDetails(this.modelValue);
  }

  set modelValue(newModelValue: string) {
    this.getBankDetails(newModelValue);
    this.$emit("input", newModelValue);
  }
  // MODEL VALUE - END

  async getBankDetails(value: any) {
    const razorpayUrl = `https://ifsc.razorpay.com/${value}`;
    try {
      const axiosResponse = await axios.get(razorpayUrl);
      this.ifscCodeValid = true;
      if (this.onSelect) {
        this.onSelect(axiosResponse.data);
      }
    } catch (e) {
      this.ifscCodeValid = false;
      console.log("Ifsc-===========", e);
      // FSnackbar.error("Ifsc code not found")
    }
  }
}
</script>
