<template>
  <v-card class="pa-0 ma-0" flat height="calc(100vh - 48px)">
    <!-- <MySettlementFTab /> -->
    <component
      :is="fiCreditorSettlementListMetaData.componentName"
      :ref="fiCreditorSettlementListMetaData.myRefName"
      :value="getSpaSavingPercentageOutput.spaSavingPercentageList"
      v-bind="fiCreditorSettlementListMetaData.props"
      :loading="showLoader"
    >
    </component>

    <f-pagination 
      :paginationLength="paginationLength"
      :count="getSpaSavingPercentageInput.count"
      :value="getSpaSavingPercentageInput.offset"
      @input="handlePaginationChange"
    />

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
import FPagination from "@/components/generic/FPagination.vue";
import ErrorResponse from "@/error-response";
@Component({
  components: {
    FDataTable,
    // MySettlementFTab,
    FPagination
  },
})
export default class OPRCreditorSettlementList extends Vue {
  // @Store.Getter.ClientFile.SettlementDetails.fiCreditorSettlementList
  // fiCreditorSettlementList: Data.ClientFile.FiCreditorApprochingSettlement[];
  search: string = "";
  savingPercentage: number = 30;
  showLoader: boolean = false;
  getSpaSavingPercentageInput: Data.Spine.GetSpaSavingPercentageInput = new Data.Spine.GetSpaSavingPercentageInput();
  getSpaSavingPercentageOutput: Data.Spine.GetSpaSavingPercentageOutput = new Data.Spine.GetSpaSavingPercentageOutput();



  public mounted() {
    this.getSpaSavingPercentageInput.count = 10;
    this.getSpaSavingPercentageList();
  }

  //Metadata
  get fiCreditorSettlementListMetaData() {
    return new OPRCreditorSettlementFDataTableMDP({
      parent: this,
    }).getMetaData();
  }
  //Metadata

  getSpaSavingPercentageList() {
    this.showLoader = true;
    Action.Spine.GetSpaSavingPercentage.execute(
      this.getSpaSavingPercentageInput,
      (output) => {
        this.getSpaSavingPercentageOutput = output;
        this.showLoader = false;
      },
      (error) => {
        ErrorResponse.handle(error);
        this.showLoader = false;
      }
    );
  }

    handlePaginationChange(newVal: any) {
      console.log(newVal)
    this.getSpaSavingPercentageInput.offset = newVal;
    this.getSpaSavingPercentageList();
  }

    get paginationLength() {
    return Math.ceil(this.getSpaSavingPercentageOutput.totalRecordCount / this.getSpaSavingPercentageInput.count);
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
