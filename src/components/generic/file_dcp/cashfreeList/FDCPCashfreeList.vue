<template>
  <div class="col-12">
    <component
      v-if="!!showViewPaymentForm"
      :ref="paymentDetailsFFormMetaData.myRefName"
      :is="paymentDetailsFFormMetaData.componentName"
      :value="selectModel(selectedPaymentSummaryToView, undefined)"
      @input="
        (newValue) =>
          updateModel(selectedPaymentSummaryToView, newValue, undefined)
      "
      v-bind="paymentDetailsFFormMetaData.props"
    ></component>

    <component
      :ref="dcpCashfreeListMetaData.myRefName"
      :is="dcpCashfreeListMetaData.componentName"
      :value="selectModel(fiCashfreeLinkList, undefined)"
      v-bind="dcpCashfreeListMetaData.props"
    ></component>

    <div v-for="formMetaData in formMetaDataList" :key="formMetaData.myRefName">
      <component
        :ref="formMetaData.myRefName"
        :is="formMetaData.componentName"
        :value="selectModel(modelValue, formMetaData.dataSelectorKey)"
        @input="
          (newValue) =>
            updateModel(modelValue, newValue, formMetaData.dataSelectorKey)
        "
        v-bind="formMetaData.props"
      ></component>
    </div>

    <div
      class="d-flex flex-row align-start flex-wrap justify-space-around pa-2 my-5"
      v-if="!disabled"
    >
      <component
        v-for="(actionMetaData, index) of actionMetaDataListFiltered"
        :key="'action' + index"
        :is="actionMetaData.componentName"
        :ref="actionMetaData.myRefName"
        v-bind="actionMetaData.props"
      ></component>
    </div>
  </div>
</template>

<script lang="ts">
import FBtn from "@/components/generic/FBtn.vue";
import StepSummary from "@/components/generic/file/summary/StepSummary.vue";
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import { Component, Prop } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Action from "@/../src-gen/action";
import * as Data from "@/../src-gen/data";
// import FCashfreeListFDataTableMDP from "./FCashfreeListFDataTableMDP";
import PaymentDetailsFFormMDP from "@/section/spineapp/views/file/drp/payment/PaymentDetailsFFormMDP";
import FDCPCashfreeListFDataTableMDP from "./FDCPCashfreeListFDataTableMDP";

@Component({
  components: {
    FBtn,
    StepSummary,
    FForm,
    FDataTable,
  },
})
export default class FDCPCashfreeList extends ModelVue {
  @Prop({
    default: () => [],
  })
  actionMetaDataList: any[];

  @Prop()
  taskRoot: any;

  showViewPaymentForm: boolean = false;
  selectedPaymentSummaryToView: any;

  clientFileId = this.$route.params.clientFileId;
  taskId = this.$route.params.taskId;

  fiCashfreeList = [];

  @Store.Getter.DCPClientFile.DCPClientFileSummary.fiDCPCashfreeLinkPayment
  fiCashfreeLinkList: Data.DCPClientFile.FiDCPCashfreeLinkPayment[];

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.ClientFile.ClientFileSummary.fiPaymentPlanInfo
  fiPaymentPlanInfoStore: Data.ClientFile.FiPaymentPlanInfo;

  @Store.Getter.Login.LoginDetails.roleList
  roleList: string[];

  draftFirstMSFPaymentInput: Data.ClientFile.DraftFirstMSFThroughCashfreeInput =
    new Data.ClientFile.DraftFirstMSFThroughCashfreeInput();

  get actionMetaDataListFiltered() {
    return this.actionMetaDataList.filter(
      (actionMetaData) =>
        actionMetaData.condition === undefined ||
        actionMetaData.condition === true
    );
  }
  // Meta data
  get dcpCashfreeListMetaData() {
    return new FDCPCashfreeListFDataTableMDP({
      parent: this,
      taskRoot: this.taskRoot,
    }).getMetaData();
  }

  getClientFileBasicInfo() {
    Action.ClientFile.GetClientFileBasicInfo.execute1(
      this.clientFileBasicInfo.clientFileNumber,
      (output) => {}
    );
  }

  handleInfoClick(item: any) {
    this.selectedPaymentSummaryToView = item;
    this.showViewPaymentForm = true;
    console.log(item);
  }

  resetPaymentForm() {
    this.showViewPaymentForm = false;
    this.selectedPaymentSummaryToView = new Data.ClientFile.FiPayment();
  }
  get paymentDetailsFFormMetaData() {
    return new PaymentDetailsFFormMDP({ parent: this }).getMetaData();
  }

  isAdmin() {
    return this.roleList?.includes("Admin");
  }
}
</script>
