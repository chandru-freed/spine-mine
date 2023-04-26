<template>
  <v-select
    v-bind="$props"
    :value="modelValue"
    @input="(newVal) => mandateSelectChanged(newVal)"
    :items="fiEMandateList"
  >
    <template v-slot:item="data">
      <v-list-item-content>
        <v-list-item-title>{{ data.item.nupayBankName }}</v-list-item-title>
        <v-list-item-subtitle>
          {{ data.item.amount | toRoundedINR }},
          {{ data.item.accountNumber | masked-account-number }}
          <span class="ml-3 green--text" >{{ data.item.isDefault? 'Default':'' }}</span>
          
        </v-list-item-subtitle>
      </v-list-item-content>
    </template>
  </v-select>
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

  @Prop()
  onSelect: (details: any) => void;

  clientFileId = this.$route.params.clientFileId;

  get modelValue() {
    return this.value;
  }

  mandateSelectChanged(newVal: any) {
    this.modelValue = newVal;
    if (this.onSelect) {
      this.onSelect(newVal);
    }
  }

  mounted() {
    this.getMandateList();
  }

  getMandateList() {
    Action.ClientFile.GetEMandateList.execute1(this.clientFileId, (output) => {
      const defaultEMandate: any = output.find(
        (item) => item.isDefault === true
      );
      if (defaultEMandate && !this.modelValue) {
        this.modelValue = defaultEMandate[this.$props.itemValue];
      }
    });
  }

  set modelValue(newModelValue: string) {
    this.$emit("input", newModelValue);
  }
  // MODEL VALUE - END
}
</script>
