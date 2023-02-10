<template>
  <div class="d-flex">
    <v-text-field
      v-bind="$props"
      :value="modelValue"
      @input="(newValue) => (modelValue = newValue)"
    ></v-text-field>
    <f-btn
      label="Get LeadSquare Id"
      class="mx-2"
      :onClick="() => getLeadSquareId()"
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
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";

@Component({
  components: {
    VTextField,
    "f-btn": FBtn,
  },
})
export default class FGenLeadSquareIdField extends VTextField {
  // MODEL VALUE - START
  @Prop()
  onSelect: (details: any) => void;
  @Prop()
  value: string;

  @Prop()
  btnCondition: boolean;

  get modelValue() {
    return this.value;
  }

  set modelValue(newModelValue: string) {
    this.$emit("input", newModelValue);
  }
  // MODEL VALUE - END

  async getLeadSquareId() {
    Action.Spine.GetLeadSquareId.execute1(this.modelValue, output => {
      this.onSelect(output.leadSquareId);
    })
  }
}
</script>
