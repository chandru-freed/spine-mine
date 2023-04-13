<template>
  <v-card class="pa-0 ma-0" flat height="calc(100vh - 48px)">
    <!-- <MySettlementFTab /> -->
    <component
      :is="fiCreditorSettlementListMetaData.componentName"
      :ref="fiCreditorSettlementListMetaData.myRefName"
      :value="fiCreditorSettlementList"
      v-bind="fiCreditorSettlementListMetaData.props"
      :loading="showLoader"
    >
    <template v-slot:top-action>
      <v-select
              :items="savingPercentageList"
              v-model="savingPercentage"
              label="Saving %"
              hide-details
              outlined
              dense
              class="shrink"
              @input="handleSavingPercentageChange"
            ></v-select>
    </template>
    </component>

  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";

import FDataTable from "@/components/generic/table/FDataTable.vue";
// import MySettlementFTab from "../../components/tab/MySettlementFTab.vue";
import Helper from "@/section/spineapp/util/Helper";
import OPRCreditorSettlementFDataTableMDP from "./OPRCreditorSettlementFDataTableMDP";
@Component({
  components: {
    FDataTable,
    // MySettlementFTab
  },
})
export default class OPRCreditorSettlementList extends Vue {
  @Store.Getter.ClientFile.SettlementDetails.fiCreditorSettlementList
  fiCreditorSettlementList: Data.ClientFile.FiCreditorApprochingSettlement[];
  search: string = "";
  savingPercentage: number = 30;
  showLoader: boolean = false;



  public mounted() {
    this.getFiCreditorList();
  }

  //Metadata
  get fiCreditorSettlementListMetaData() {
    return new OPRCreditorSettlementFDataTableMDP({
      parent: this,
    }).getMetaData();
  }
  //Metadata

  get savingPercentageList() {
    const diff = 5;
    return [...Array(100 / diff + 1).keys()].map((i) => i * diff);
  }
  getFiCreditorList() {
    this.showLoader = true;
    Action.ClientFile.GetFiCreditorListForSettlement.execute1(
      this.savingPercentage,
      (output) => {
        this.showLoader = false;
      },
      (error) => {
        this.showLoader = false;
      }
    );
  }

  handleSavingPercentageChange(savingPercentage: number) {
    this.getFiCreditorList();
  }

  gotoFile(clientFileNumber: string) {
    Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: clientFileNumber,
    });
  }

  gotoClient(clientId: string) {
    this.$router.push({
      name: "Root.Client.ClientDetails",
      params: { clientId: clientId },
    });
  }
}
</script>

<style>
</style>
