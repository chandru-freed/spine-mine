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
import CFAPaymentPlanInfoFPaymentPlanMDP from "./CFAPaymentPlanInfoFPaymentPlanMDP";
import FCFAPaymentPlan from "@/components/generic/file/paymentPlan/cfAdminPaymentPlan/FCFAPaymentPlan.vue";

@Component({
  components: {
    FForm,
    FCFAPaymentPlan,
  },
})
export default class CFAdminPaymentPlanInfo extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.fiPaymentPlanInfo
  fiPaymentPlanInfo: Data.ClientFile.FiPaymentPlanInfo;

  @Store.Getter.ClientFile.ClientFileSummary.fiCreditorInfo
  fiCreditorInfo: Data.ClientFile.FiCreditorInfo;

  @Store.Getter.ClientFile.ClientFileSummary.budgetInfo
  budgetInfoStore: Data.ClientFile.BudgetInfo;

  newPaymentPlan: Data.Spine.FiPSPlanInfo = new Data.Spine.FiPSPlanInfo();

  get clientFileId() {
    return this.$route.params.clientFileId;
  }

  //METADATA
  get paymentPlanInfoMetaData() {
    return new CFAPaymentPlanInfoFPaymentPlanMDP({
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
    Action.Spine.UploadPaymentSchedulePlanExcel.interested(
      this.getFiPaymentWithDelayHandler
    );

    Action.Spine.RecalculatePSPlanForPM.interested(this.getFiPaymentWithDelayHandler);
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

    Action.Spine.UploadPaymentSchedulePlanExcel.notInterested(
      this.getFiPaymentWithDelayHandler
    );

    Action.Spine.RecalculatePSPlanForPM.notInterested(this.getFiPaymentWithDelayHandler);
  }

  getFiPaymentWithDelay() {
    setTimeout(() => {
      this.getBudgetInfo();
      this.getFiPaymentPlanInfo();
      this.getFiCreditorInfo();
      this.getFiPaymentList();
    }, 1000);
  }

  get paymentPlanWithTotalDebt() {
    return {
      paymentPlan: this.newPaymentPlan || new Data.ClientFile.FiPaymentPlanInfo(),
      creditorInfo: this.fiCreditorInfo|| new Data.ClientFile.FiCreditorInfo(),
      budgetInfo: this.budgetInfoStore|| new Data.ClientFile.BudgetInfo(),
    }
  }

  getFiPaymentPlanInfo() {
    Action.ClientFile.GetPaymentPlanInfo.execute1(
      this.clientFileId,
      (output) => {
        this.getFiPaymentPlanInfoFromPsPlanId(output?.psPlanId);
      }
    );
  }

  getFiPaymentPlanInfoFromPsPlanId(newPSPlanId: any) {
    
      Action.Spine.GetPSPlanInfo.execute1(newPSPlanId, (output) => {
        console.log(output);
        this.newPaymentPlan = output;
      });
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
