<template>
  <div class="PaymentOperation">
    <misreports-tab :value="2"></misreports-tab>
    <component
      v-if="!!poFilterFFormMetaData"
      :ref="poFilterFFormMetaData.myRefName"
      :is="poFilterFFormMetaData.componentName"
      :value="selectModel(paymentOperationFilter, undefined)"
      @input="
        (newValue) => updateModel(paymentOperationFilter, newValue, undefined)
      "
      v-bind="poFilterFFormMetaData.props"
    ></component>

    <component
      class="my-2"
      :is="poPaymentScheduleFDataTableMetaData.componentName"
      :ref="poPaymentScheduleFDataTableMetaData.myRefName"
      :value="psEntryList"
      v-bind="poPaymentScheduleFDataTableMetaData.props"
    ></component>

    <component
      class="my-2"
      :is="poMSFFDataTableMetaData.componentName"
      :ref="poMSFFDataTableMetaData.myRefName"
      :value="msfEntryList"
      v-bind="poMSFFDataTableMetaData.props"
    ></component>
    <component
      class="my-2"
      :is="poAllPaymentFDataTableMetaData.componentName"
      :ref="poAllPaymentFDataTableMetaData.myRefName"
      :value="allPaymentList"
      v-bind="poAllPaymentFDataTableMetaData.props"
    ></component>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
// import store, * as Store from '@/../src-gen/store';
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import moment from "moment";
import POFilterFFormMDP from "../paymentOperation/POFilterFFormMDP";
import FForm from "@/components/generic/form/FForm.vue";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import ModelVue from "@/components/generic/ModelVue";
import POMSFFDataTableMDP from "./POMSFFDataTableMDP";
import POPaymentScheduleFDataTableMDP from "./POPaymentScheduleFDataTableMDP";
import POAllPaymentFDataTableMDP from "./POAllPaymentFDataTableMDP";
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
  allPaymentList: any[] = [];

  fPaymentScheduleFDataTableRefName: string = "fPaymentScheduleFDataTableMDP";
  mounted() {
    this.paymentOperationFilter.scheduledDraftDate = moment().toISOString();
    this.searchPaymentOperations();
  }

  getAllPSEntryListScheduledOnDate() {
    Action.Spine.GetAllPSEntryListScheduledOnDate.execute(
      this.paymentOperationFilter,
      (output) => {
        this.psEntryList = output;
      }
    );
  }

  getAllPaymentListPresentedOnDate() {
    Action.Spine.GetAllPaymentListPresentedOnDate.execute1(
      this.paymentOperationFilter.scheduledDraftDate,
      (output) => {
        this.allPaymentList = output;
      }
    );
  }

  getAllMSFEntryListScheduledOnDate() {
    Action.Spine.GetAllMSFEntryListScheduledOnDate.execute(
      this.paymentOperationFilter,
      (output) => {
        this.msfEntryList = output;
      }
    );
  }

  searchPaymentOperations() {
    this.getAllPSEntryListScheduledOnDate();
    this.getAllPaymentListPresentedOnDate();
    this.getAllMSFEntryListScheduledOnDate();
  }

  get poFilterFFormMetaData() {
    return new POFilterFFormMDP({ parent: this }).getMetaData();
  }

  get poPaymentScheduleFDataTableMetaData() {
    return new POPaymentScheduleFDataTableMDP({
      parent: this,
      refName: this.fPaymentScheduleFDataTableRefName,
    }).getMetaData();
  }

  get poMSFFDataTableMetaData() {
    return new POMSFFDataTableMDP({ parent: this }).getMetaData();
  }

  get poAllPaymentFDataTableMetaData() {
    return new POAllPaymentFDataTableMDP({ parent: this }).getMetaData();
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
