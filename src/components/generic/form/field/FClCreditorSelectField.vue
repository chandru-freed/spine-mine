<template>
  <v-autocomplete
    v-bind="$props"
    :value="modelValue"
    @input="(newVal) => mandateSelectChanged(newVal)"
    :items="clCreditorList"
    :clearable="true"
  >
    <template v-slot:item="data">
      <v-list-item-content>
        <v-list-item-title>{{ data.item.creditorName }}</v-list-item-title>
        <v-list-item-subtitle>
          {{ data.item.creditorBalance | toRoundedINR }},
          {{ data.item.accountNumber | masked-account-number }}
          <span class="ml-3 green--text" >{{ data.item.isDefault? 'Default':'' }}</span>
          
        </v-list-item-subtitle>
      </v-list-item-content>
    </template>
  </v-autocomplete>
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
export default class FClCreditorSelectField extends VSelect {
    @Store.Getter.ClientFile.ClientFileSummary.clCreditorList
  clCreditorList: Data.ClientFile.ClCreditor[];

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;


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
    this.getClientCreditorList();
  }

 getClientCreditorList() {
    Action.ClientFile.GetClCreditorList.execute1(this.clientFileBasicInfo.clientBasicInfo.clientId, output => {
      
    })
  }

  set modelValue(newModelValue: string) {
    this.$emit("input", newModelValue);
  }
  // MODEL VALUE - END
}
</script>
