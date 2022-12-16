<template>
  <div class="ma-2">
    <v-card elevation="2">
      <component
        :is="tmoStimulatorFormMetaData.componentName"
        :ref="tmoStimulatorFormMetaData.myRefName"
        :value="selectModel(result)"
        @input="(newValue) => updateModel(result, newValue, undefined)"
        v-bind="tmoStimulatorFormMetaData.props"
      ></component>
      <div class="px-5 pb-5">
        <div class="d-flex align-start mb-5">
          <v-chip class="mr-2" color="primary" label outlined large>
            Repayment Amount:&nbsp;&nbsp;<span
              class="font-weight-bold secondary--text"
              >{{ Math.round(result.repaymentAmount) | toINR }}</span
            >
          </v-chip>

          <v-chip class="mr-2" color="primary" label outlined large
            >MSF: &nbsp;&nbsp;<span class="font-weight-bold secondary--text">{{
              result.msfAmount | toINR
            }}</span>
          </v-chip>
          <v-chip class="mr-2" color="primary" label outlined large>
            SPA: &nbsp;&nbsp;<span class="font-weight-bold secondary--text">{{
              Math.round(result.monthlyPayment) | toINR
            }}</span>
          </v-chip>
          <v-chip
            class="mr-2"
            color="primary"
            label
            outlined
            large
            v-if="monthlyObligationLessThan"
          >
            TMO/Affordability : &nbsp;&nbsp;<span
              class="font-weight-bold secondary--text"
              >{{ Math.round(result.monthlyObligation) | toINR }}</span
            >
          </v-chip>
          <v-chip
            class="mr-2"
            color="warning"
            label
            outlined
            large
            v-if="monthlyObligationGreaterThanEqual"
          >
            TMO/Affordability : &nbsp;&nbsp;<span
              class="font-weight-bold warning--text"
              >{{ Math.round(result.monthlyObligation) | toINR }}</span
            >
          </v-chip>
          <v-chip
            class="mr-2"
            color="primary"
            label
            outlined
            large
            v-if="tenureLessThan"
            >Tenure: &nbsp;&nbsp;<span class="font-weight-bold secondary--text"
              >{{ result.tenure }} mth</span
            >
          </v-chip>
          <v-chip
            class="mr-2"
            color="error"
            label
            outlined
            large
            v-if="tenureLessGreaterThanEqual"
            >Tenure: &nbsp;&nbsp;<span class="font-weight-bold"
              >{{ result.tenure }} mths</span
            >
          </v-chip>
        </div>
        <component
          :is="tmoStimulatorMDP.componentName"
          :ref="tmoStimulatorMDP.myRefName"
          :value="selectModel(result)"
          @input="(newValue) => updateModel(modelValue, newValue, result)"
          v-bind="tmoStimulatorMDP.props"
        ></component>
      </div>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { VBtn } from "vuetify/lib/components";
import FCurrencyField from "../form/field/FCurrencyField.vue";
import FDateSelectField from "../form/field/FDateSelectField.vue";
import FNumberField from "../form/field/FNumberField.vue";
import ModelVue from "../ModelVue";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";
import store, * as Store from "@/../src-gen/store";
import TMOStimulatorFFormMDP from "./TMOStimulatorFFormMDP";
import FForm from "../form/FForm.vue";
import Task from "@/section/spineapp/util/Task";
import TMOStimulatorMDP from "./TMOStimulatorMDP";
import moment from "moment";
import Helper from "@/section/spineapp/util/Helper";

@Component({
  components: {
    FCurrencyField,
    FNumberField,
    FDateSelectField,
    FForm,
  },
})
export default class TMOStimulator extends ModelVue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  taskId = this.$route.params.taskId;
  clientFileId = this.$route.params.clientFileId;
  feeGSTPercentage: number = 11.8;

  @Prop({
    default: 45,
  })
  percentage: number;

  @Watch("percentage") percentageChanged(newVal: any, oldVal: any) {
    console.log(oldVal, newVal);
    this.resultLocal.settlementPercentage = newVal;
  }

  @Prop()
  simulatorInput: any;
  // rules = [
  //   (v: number) =>
  //     this.result.tenure <= this.tenureApproval ||
  //     "It needs to be approved by the manager",
  // ];
  tenorNew = 0;

  resultLocal: any = {
    tenure: 0,
    settlementPercentage: 0,
    outstanding: 0,
    repaymentAmount: 0,
    monthlyPayment: 0,
    affordability: 0,
    msfAmount: 0,
    monthlyObligation: 0,
    firstSPADraftDate: "",
    tenureApproval: 0,
  };

  get monthlyObligationLessThan() {
    return (
      Math.round(this.result.monthlyObligation) <=
      Math.round(this.result.affordability)
    );
  }

  get monthlyObligationGreaterThanEqual() {
    return (
      Math.round(this.result.monthlyObligation) >=
      Math.round(this.result.affordability)
    );
  }

  get tenureLessThan() {
    return this.result.tenure <= this.result.tenureApproval;
  }

  get tenureLessGreaterThanEqual() {
    return this.result.tenure >= this.result.tenureApproval;
  }

  //METADATA
  get tmoStimulatorFormMetaData() {
    return new TMOStimulatorFFormMDP({
      taskRoot: this,
    }).getMetaData();
  }
  get tmoStimulatorMDP() {
    return new TMOStimulatorMDP({
      taskRoot: this,
    }).getMetaData();
  }
  //METADATA

  // mounted() {
  //   setTimeout(() => {
  //     this.resultLocal.tenure =
  //       this.modelValue.paymentPlan?.ppCalculator?.tenor || 12;
  //     this.resultLocal.outstanding = this.modelValue.creditorInfo?.totalDebt;
  //     this.resultLocal.settlementPercentage =
  //       this.modelValue.paymentPlan?.ppCalculator?.settlementPercentage || 0;
  //     this.resultLocal.affordability =
  //       this.modelValue.budgetInfo?.proposedDSPayment || 0;
  //     this.resultLocal.firstSPADraftDate =
  //       this.modelValue.paymentPlan?.ppCalculator?.firstDraftDate || 0;
  //   }, 1000);
  // }

  @Watch("simulatorInput") modelValueChanged(newVal: any, oldVal: any) {
    this.resultLocal.tenure =
      this.modelValue.paymentPlan?.ppCalculator?.tenor || 12;
    this.resultLocal.outstanding = this.modelValue.creditorInfo?.totalDebt;
    this.resultLocal.settlementPercentage =
      this.modelValue.paymentPlan?.ppCalculator?.settlementPercentage || 0;
    this.resultLocal.affordability =
      this.modelValue.budgetInfo?.proposedDSPayment || 0;
    this.resultLocal.firstSPADraftDate =
      this.modelValue.paymentPlan?.ppCalculator?.firstDraftDate || 0;
  }

  isPaymentPlanDataAvailable() {
    console.log(this.modelValue, "is payment plan available");
    return this.modelValue.paymentPlan?.psPlanId !== "";
  }

  @Watch("result.tenure") tenureChanged(newValue: any, oldValue: any) {
    this.tenorNew = newValue;
  }

  get result() {
    const totalPercentage =
      this.resultLocal.settlementPercentage + this.feeGSTPercentage;
    this.resultLocal.monthlyPayment =
      (this.resultLocal.outstanding * totalPercentage) /
      100 /
      this.resultLocal.tenure;
    this.resultLocal.repaymentAmount =
      (this.resultLocal.outstanding * totalPercentage) / 100;
    this.resultLocal.tenureApproval = getTenureWithFreed(
      this.resultLocal.outstanding
    );
    this.resultLocal.msfAmount = getMSFWithFreed(this.resultLocal.outstanding);
    this.resultLocal.monthlyObligation =
      this.resultLocal.monthlyPayment + this.resultLocal.msfAmount;
    return this.resultLocal;
  }

  set result(value: any) {
    console.log(value, this.resultLocal.settlementPercentage, "Setter");
    this.resultLocal = value;
  }

  scheduleorDraftPaymentPlan() {
    if (this.isPaymentPlanDataAvailable()) {
      this.schedulePaymentPlan();
    } else {
      this.draftPaymentPlan();
    }
  }

  schedulePaymentPlan() {
    const input: Data.Spine.RecalculatePSPlanForPMInput =
      Data.Spine.RecalculatePSPlanForPMInput.fromJson(
        this.modelValue.paymentPlan
      );
    input.psPlanId = this.modelValue.paymentPlan.psPlanId;
    input.outstanding = this.result.outstanding;
    input.spaFirstDraftDate = this.result.firstSPADraftDate;
    input.settlementPercentage = this.result.settlementPercentage;
    input.tenor = this.tenorNew;
    Action.Spine.RecalculatePSPlanForPM.execute(input, (output: any) => {
      Snackbar.show({
        text: "Succesfully Saved",
        pos: "bottom-center",
      });
    });
  }

  draftPaymentPlan() {
    const input: Data.Spine.DraftPSPlanForPMInput =
      new Data.Spine.DraftPSPlanForPMInput();
    input.clientFileId = this.clientFileId;
    input.outstanding = this.result.outstanding;
    input.spaFirstDraftDate = moment()
      .add(2, "days")
      .format(Helper.DATE_FORMAT);
    Action.Spine.DraftPSPlanForPM.execute(input, (output) => {});
  }

  get taskDisabled(): boolean {
    return Task.isTaskNotActionable(this.taskDetails.taskState);
  }
}

export const getTenureWithFreed = (amount: number) => {
  if (amount >= 0 && amount < 75000) return 15;
  if (amount >= 75000 && amount < 200000) return 23;
  if (amount >= 200000 && amount < 400000) return 33;
  if (amount >= 400000 && amount < 600000) return 36;
  if (amount >= 600000 && amount < 800000) return 41;
  if (amount >= 800000 && amount < 1000000) return 46;
  if (amount >= 1000000 && amount < 1200000) return 51;
  if (amount >= 1200000 && amount < 1500000) return 58;
  if (amount >= 1500000 && amount < 2000000) return 60;
  if (amount >= 2000000 && amount < 2500000) return 65;
  if (amount >= 2500000) return 72;
};

export const getMSFWithFreed = (amount: number) => {
  if (amount >= 0 && amount < 100000) return 649;
  if (amount >= 100000 && amount < 200000) return 899;
  if (amount >= 200000 && amount < 300000) return 999;
  if (amount >= 300000 && amount < 450000) return 1299;
  if (amount >= 450000 && amount < 600000) return 1499;
  if (amount >= 600000 && amount < 800000) return 1799;
  if (amount >= 800000 && amount < 1000000) return 1999;
  if (amount >= 1000000 && amount < 1200000) return 2499;
  if (amount >= 1200000 && amount < 20000000) return 2999;
  if (amount >= 20000000) return 2999;
};
</script>
