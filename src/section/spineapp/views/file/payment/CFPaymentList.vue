<template>
  <div class="CFPaymentList">
    <v-col class="col-12">
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
        :is="cfPaymentListFDataTableMetaData.componentName"
        :ref="cfPaymentListFDataTableMetaData.myRefName"
        :value="fiPaymentList"
        v-bind="cfPaymentListFDataTableMetaData.props"
      ></component>
    </v-col>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import FBtn from "@/components/generic/FBtn.vue";
import * as Data from "@/../src-gen/data";
import store, * as Store from "@/../src-gen/store";
import * as Action from "@/../src-gen/action";
import CFPaymentListFDataTableMDP from "./CFPaymentListFDataTableMDP";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import PaymentDetailsFFormMDP from "./PaymentDetailsFFormMDP";

@Component({
  components: {
    FForm,
    FBtn,
    FDataTable,
  },
})
export default class CFPaymentList extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.fiPaymentList
  fiPaymentList: Data.ClientFile.FiPayment[];

  selectedPaymentSummaryToView: Data.ClientFile.FiPayment =
    new Data.ClientFile.FiPayment();
  showViewPaymentForm: boolean = false;
  get clientFileId() {
    return this.$route.params.clientFileId;
  }

  mounted() {
    this.getFiPaymentList();
    Action.ClientFile.CheckPaymentStatus.interested(
      this.getFiPaymentListHandler
    );
    Action.ClientFile.UpdateFundSplitStatus.interested(
      this.getFiPaymentListHandler
    );
    Action.ClientFile.RequestFundSplit.interested(this.getFiPaymentListHandler);
  }

  destroyed() {
    Action.ClientFile.CheckPaymentStatus.notInterested(
      this.getFiPaymentListHandler
    );
    Action.ClientFile.UpdateFundSplitStatus.notInterested(
      this.getFiPaymentListHandler
    );
    Action.ClientFile.RequestFundSplit.notInterested(
      this.getFiPaymentListHandler
    );
  }

  //Meta Data

  get cfPaymentListFDataTableMetaData() {
    return new CFPaymentListFDataTableMDP({ parent: this }).getMetaData();
  }

  //Meta Data

  getFiPaymentListHandler = () => {
    setTimeout(() => {
      this.getFiPaymentList();
    }, 500);
  };

  //ACTION
  getFiPaymentList() {
    Action.ClientFile.GetFiPaymentList.execute1(this.clientFileId, (output) => {
      this.updatePaymentSummarySelected();
    });
  }

  updatePaymentSummarySelected() {
    const paymentDetailsIndex = this.fiPaymentList.findIndex(
      (item) => item.paymentId === this.selectedPaymentSummaryToView.paymentId
    );
    if (paymentDetailsIndex !== -1) {
      this.selectedPaymentSummaryToView = this.fiPaymentList[paymentDetailsIndex];
    }
  }

  openPaymentDetails(item: any) {
    this.$router.push({
      name: "Root.CFile.CFPayment.CFPaymentDetails.CFPaymentDetails",
      params: {
        paymentId: item.paymentId,
      },
    });
  }

  get paymentDetailsFFormMetaData() {
    return new PaymentDetailsFFormMDP({ parent: this }).getMetaData();
  }

  handleInfoClick(item: Data.ClientFile.FiPayment) {
    console.log(item);
    this.selectedPaymentSummaryToView = item;
    this.showViewPaymentForm = true;
  }

  resetPaymentForm() {
    this.showViewPaymentForm = false;
    this.selectedPaymentSummaryToView = new Data.ClientFile.FiPayment();
  }
}
</script>
