<template>
  <v-select
    v-bind="$props"
    :value="modelValue"
    @input="(newValue) => (modelValue = newValue)"
    :items="fiEMandateList"
  ></v-select>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VSelect } from "vuetify/lib";
import * as Action from "@/../src-gen/action";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";

@Component({
  components: {
    VSelect,
  },
})
export default class FEMandateSelectField extends VSelect {
  @Store.Getter.ClientFile.ClientFileSummary.fiEMandateList
  fiEMandateList: Data.ClientFile.FiEMandateList;

  // MODEL VALUE - START
  @Prop()
  value: any;

  clientFileId = this.$route.params.clientFileId;

  get modelValue() {
    return this.value;
  }

  mounted() {
    this.getMandateList();
  }

  getMandateList() {
    Action.ClientFile.GetEMandateList.execute1(
      this.clientFileId,
      (output) => {}
    );
  }

  set modelValue(newModelValue: string) {
    this.$emit("input", newModelValue);
  }
  // MODEL VALUE - END
}
</script>
