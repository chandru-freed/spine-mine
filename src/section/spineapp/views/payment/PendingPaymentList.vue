<template>
  <div class="UpcomingPaymentList">
    <!-- <misreports-tab :value="2"></misreports-tab> -->
    <component
      class="my-2"
      :is="poPendingPaymentFDataTableMetaData.componentName"
      :ref="poPendingPaymentFDataTableMetaData.myRefName"
      :value="pendingPaymentList"
      v-bind="poPendingPaymentFDataTableMetaData.props"
    ></component>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
// import store, * as Store from '@/../src-gen/store';
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import FForm from "@/components/generic/form/FForm.vue";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import ModelVue from "@/components/generic/ModelVue";

import PendingPaymentListFDataTable from "./PendingPaymentListFDataTable";
import MISReportsTab from "@/section/spineapp/components/tab/MISReportsTab.vue";
import Helper from "@/section/spineapp/util/Helper";
@Component({
  components: {
    FForm,
    FDataTable,
    "misreports-tab": MISReportsTab,
  },
})
export default class PaymentOperation extends ModelVue {
  paymentOperationFilter: Data.Spine.PaymentOperationFilter =
    new Data.Spine.PaymentOperationFilter();
  paymentScheduleTab: number = 0;

  psEntryList: Data.Spine.FiPSPlanEntryWithClientFile[] = [];
  msfEntryList: Data.Spine.FiPSPlanFeeEntry[] = [];
  pendingPaymentList: any[] = [];

  fPendingPaymentFDataTableRefName: string = "fPendingPaymentFDataTableMDP";
  mounted() {
    
    this.getPendingPaymentList();
  }


  getPendingPaymentList(){
    Action.Spine.GetPendingPaymentList.execute(output => {
      this.pendingPaymentList = output;
    });
  }

  


  get poPendingPaymentFDataTableMetaData() {
    return new PendingPaymentListFDataTable({ parent: this }).getMetaData();
  }

  gotoFile(item: any) {
    Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: item,
    });
  }
  gotoClient(clientId: string) {
    this.$router.push({
      name: "Root.Client.ClientDetails",
      params: { clientId: clientId },
    });
  }


  openPaymentDetails(item: any) {
    if (item.paymentId) {
      this.$router.push({
        name: "Root.CFile.CFPayment.CFPaymentDetails.CFPaymentDetails",
        params: {
          clientFileNumber: item.clientFileNumber,
          clientFileId:item.clientFileBasicInfo.clientFileId,
          paymentId: item.paymentId,
        },
      });
    }
  }
}
</script>

<style>
</style>
