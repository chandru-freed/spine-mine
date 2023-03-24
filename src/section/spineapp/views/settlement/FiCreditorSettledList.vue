<template>
  <v-card class="pa-0 ma-0" flat height="calc(100vh - 48px)">
    <MySettlementFTab />
    <component
      :is="fiCreditorSettledListFDataTableMDP.componentName"
      :ref="fiCreditorSettledListFDataTableMDP.myRefName"
      :value="settledCreditorList"
      v-bind="fiCreditorSettledListFDataTableMDP.props"
      :loading="showLoader"
    ></component>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import Helper from "../../util/Helper";
import FiCreditorSettledListFDataTableMDP from "./FiCreditorSettledListFDataTableMDP";

import MySettlementFTab from "../../components/tab/MySettlementFTab.vue";
import FDataTable from "@/components/generic/table/FDataTable.vue";
@Component({
  components:{
    FDataTable,
    MySettlementFTab
  }
})
export default class FiCreditorSettledList extends Vue {
  settledCreditorList: Data.ClientFile.SettledFiCreditor[] = [];
  showLoader: boolean = false;

  public mounted() {
    this.getFiCreditorList();
  }

  get savingPercentageList() {
    const diff = 5;
    return [...Array(100 / diff + 1).keys()].map((i) => i * diff);
  }
  getFiCreditorList() {
    this.showLoader = true;
    Action.ClientFile.GetSettledFiCreditorList.execute(
      (output) => {
        this.settledCreditorList = output;
        this.showLoader = false;
      },
      (error) => {
        this.showLoader = false;
      }
    );
  }

  // Meta Data

  get fiCreditorSettledListFDataTableMDP() {
    return new FiCreditorSettledListFDataTableMDP({
      parent: this,
    }).getMetaData();
  }

  // Meta Data
}
</script>

<style>
</style>
