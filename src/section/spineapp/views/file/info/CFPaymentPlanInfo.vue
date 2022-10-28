<template>
  <div class="CFPaymentPlanInfo">
    <component
      v-if="!!paymentPlanWithTotalDebt"
      :ref="paymentPlanInfoMetaData.myRefName"
      :is="paymentPlanInfoMetaData.componentName"
      :value="selectModel(paymentPlanWithTotalDebt, undefined)"
      v-bind="paymentPlanInfoMetaData.props"
    ></component>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Emit,
  Watch,
  Model,
} from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";


import ModelVue from "@/components/generic/ModelVue";
import FForm from "@/components/generic/form/FForm.vue";
import FPaymentPlan from "@/components/generic/file/paymentPlan/FPaymentPlan.vue";
import CFPaymentPlanInfoFPaymentPlanMDP from "./CFPaymentPlanInfoFPaymentPlanMDP";

@Component({
  components: {
    FForm,
    FPaymentPlan,
  },
})
export default class CFPaymentPlanInfo extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.ClientFile.ClientFileSummary.fiPaymentPlanInfo
  fiPaymentPlanInfo: Data.ClientFile.FiPaymentPlanInfo;

  @Store.Getter.ClientFile.ClientFileSummary.fiCreditorInfo
  fiCreditorInfo: Data.ClientFile.FiCreditorInfo;

    @Store.Getter.ClientFile.ClientFileSummary.budgetInfo
  budgetInfoStore: Data.ClientFile.BudgetInfo;

  //METADATA
  get paymentPlanInfoMetaData() {
    return new CFPaymentPlanInfoFPaymentPlanMDP({
      taskRoot: this,
      parent: this,
    }).getMetaData();
  }
  //METADATA

  public getPaymentHandler = (output: any) => this.getFiPaymentWithDelay();

  public mounted() {
    this.getFiPaymentWithDelay();

    Action.Spine.PresentPSEntry.interested(this.getPaymentHandler);
    Action.Spine.Skip.interested(this.getPaymentHandler);
  }

  public destroyed() {
    Action.Spine.PresentPSEntry.notInterested(this.getPaymentHandler);
    Action.Spine.Skip.notInterested(this.getPaymentHandler);
  }

  getFiPaymentWithDelay() {
    setTimeout(() => {
      this.getFiPaymentPlanInfo();
      this.getFiCreditorInfo();
      this.getFiPaymentList();
      this.getBudgetInfo();
    }, 1000);
  }

  get paymentPlanWithTotalDebt() {
    return new Data.ClientFile.FiPaymentPlanWithCreditor(
      this.fiPaymentPlanInfo,
      this.fiCreditorInfo,
      this.budgetInfoStore
    );
  }

  getFiPaymentPlanInfo() {
    Action.ClientFile.GetPaymentPlanInfo.execute1(
      this.clientFileBasicInfo.clientFileId,
      (output) => {}
    );
  }

  getFiCreditorInfo() {
    Action.ClientFile.GetCreditorInfo.execute1(
      this.clientFileBasicInfo.clientFileId,
      (output) => {}
    );
  }

  //ACTION
  getFiPaymentList() {
    Action.ClientFile.GetFiPaymentList.execute1(
      this.clientFileBasicInfo.clientFileId,
      (output) => {}
    );
  }

  getBudgetInfo() {
    Action.ClientFile.GetBudgetInfo.execute1(
      this.clientFileBasicInfo.clientFileId,
      (output) => {}
    );
  }
}
</script>

<style></style>
