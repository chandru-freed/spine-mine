<template>
  <div class="CFPaymentPlanInfo col-12">
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
import CFPaymentPlanInfoFPaymentPlanMDP from "./CFPaymentPlanInfoFPaymentPlanMDP";
import FCFPaymentPlan from "@/components/generic/file/paymentPlan/cfPaymentPlan/FCFPaymentPlan.vue";

@Component({
  components: {
    FForm,
    FCFPaymentPlan,
  },
})
export default class CFPaymentPlanInfo extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.fiPaymentPlanInfo
  fiPaymentPlanInfo: Data.ClientFile.FiPaymentPlanInfo;

  @Store.Getter.ClientFile.ClientFileSummary.fiCreditorInfo
  fiCreditorInfo: Data.ClientFile.FiCreditorInfo;

  @Store.Getter.ClientFile.ClientFileSummary.budgetInfo
  budgetInfoStore: Data.ClientFile.BudgetInfo;

  get clientFileId() {
    return this.$route.params.clientFileId;
  }

  //METADATA
  get paymentPlanInfoMetaData() {
    return new CFPaymentPlanInfoFPaymentPlanMDP({
      taskRoot: this,
      parent: this,
    }).getMetaData();
  }
  //METADATA

  // public getPaymentHandler = (output: any) => this.getFiPaymentWithDelay();

  public getFiPaymentWithDelayHandler = (output: any) => {
    setTimeout(() => {
      this.getFiPaymentPlanInfo();
      this.getFiCreditorInfo();
      this.getFiPaymentList();
      this.getBudgetInfo();
    }, 1000);
  };

  public mounted() {
    this.getFiPaymentWithDelay();

    Action.ClientFile.AddPSEntry.interested(this.getFiPaymentWithDelayHandler);
    Action.Spine.PresentPSEntry.interested(this.getFiPaymentWithDelayHandler);
    Action.Spine.Skip.interested(this.getFiPaymentWithDelayHandler);
    Action.ClientFile.RemovePSEntryList.interested(
      this.getFiPaymentWithDelayHandler
    );
    Action.ClientFile.ModifyAmountWithFixedTenure.interested(
      this.getFiPaymentWithDelayHandler
    );
  }

  public destroyed() {
    Action.Spine.PresentPSEntry.notInterested(
      this.getFiPaymentWithDelayHandler
    );
    Action.Spine.Skip.notInterested(this.getFiPaymentWithDelayHandler);
    Action.ClientFile.AddPSEntry.notInterested(
      this.getFiPaymentWithDelayHandler
    );
    Action.ClientFile.RemovePSEntryList.notInterested(
      this.getFiPaymentWithDelayHandler
    );
    Action.ClientFile.ModifyAmountWithFixedTenure.notInterested(
      this.getFiPaymentWithDelayHandler
    );
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
      this.clientFileId,
      (output) => {}
    );
  }

  getFiCreditorInfo() {
    Action.ClientFile.GetCreditorInfo.execute1(
      this.clientFileId,
      (output) => {}
    );
  }

  //ACTION
  getFiPaymentList() {
    Action.ClientFile.GetFiPaymentList.execute1(
      this.clientFileId,
      (output) => {}
    );
  }

  getBudgetInfo() {
    Action.ClientFile.GetBudgetInfo.execute1(this.clientFileId, (output) => {});
  }
}
</script>

<style></style>
