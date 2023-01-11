<template>
  <div v-if="nupayBankMasterList.length > 0">
    <v-select
      :items="nupayBankMasterList"
      v-bind="$props"
      :value="modelValue"
      @input="(newValue) => (modelValue = newValue)"
    ></v-select>
  </div>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VSelect } from "vuetify/lib";
import * as Action from "@/../src-gen/action";

@Component({
  components: {
    VSelect,
  },
})
export default class FNupayBankSelectField extends VSelect {
  // MODEL VALUE - START
  @Prop()
  value: any;

  get modelValue() {
    return this.value;
  }

  set modelValue(newModelValue: string) {
    this.$emit("input", newModelValue);
  }
  // MODEL VALUE - END

  nupayBankMasterList: any[] = [""];
  //nupayBankLoading = true
  mounted() {
    this.getNupayBankMasterList();
  }

  getNupayBankMasterList() {
    Action.ClientFile.GetNupayBankMasterList.execute((output) => {
      this.nupayBankMasterList = output.nupayBankMasterList;
      //this.nupayBankLoading = false
    });
  }
}
</script>

<style>
.v-input--is-readonly input,
.v-input--is-readonly .v-select__selection,
.v-input--is-readonly textarea {
  color: #000 !important;
  cursor: default !important;
}
</style>
