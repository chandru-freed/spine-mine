<template>
  <div v-if="stateList.length > 0">
    <v-select
      :items="stateList"
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
export default class FStateSelectField extends VSelect {
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

  
  stateList:  any[] = [""];
  
  mounted() {
    this.getStateList();
  }


  getStateList(){
    Action.ClientFile.GetStateList.execute((output) => {
      this.stateList = output.stateNameList;
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
