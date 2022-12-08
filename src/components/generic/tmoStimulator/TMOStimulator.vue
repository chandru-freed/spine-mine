<template>
  <div class="ma-2">
    <v-card elevation="2" class="pa-5">
      <div class="d-flex align-start mb-10">
        <v-chip class="mr-2" color="primary" label outlined large>
          Repayment Amount:&nbsp;&nbsp;<span
            class="font-weight-bold secondary--text"
            >{{ Math.round(result.repaymentAmount) | toINR }}</span
          >
        </v-chip>
        <v-chip class="mr-2" color="primary" label outlined large>
          SPA: &nbsp;&nbsp;<span class="font-weight-bold secondary--text">{{
            Math.round(result.monthlyPayment) | toINR
          }}</span>
        </v-chip>
        <v-chip class="mr-2" color="primary" label outlined large
          >MSF: &nbsp;&nbsp;<span class="font-weight-bold secondary--text">{{
            result.msfAmount | toINR
          }}</span>
        </v-chip>
        <v-chip class="mr-2" color="primary" label outlined large>
          TMO/Affordability : &nbsp;&nbsp;<span
            class="font-weight-bold secondary--text"
            >{{ Math.round(result.monthlyObligation) | toINR }}</span
          >
        </v-chip>
        <v-chip class="mr-2" color="primary" label outlined large
          >Tenure: &nbsp;&nbsp;<span class="font-weight-bold secondary--text"
            >{{ result.tenure }} mth</span
          >
        </v-chip>
      </div>
      <!-- <div class="row mb-5">
        <div class="col-3">
          <FCurrencyField
            label="Outstanding Amount"
            v-model="result.outstanding"
          />
        </div>
        <div class="col-3">
          <FNumberField
            label="Settlement Percentage"
            v-model="result.settlementPercentage"
            outlined
          />
        </div>
        <div class="col-3">
          <FCurrencyField
            label="Affordability"
            v-model="result.affordability"
          />
        </div>
        <div class="col-3">
          <FDateSelectField
            label="First SPA Draft Date"
            v-model="result.firstSPADraftDate"
            outlined
            :pastDaysDisabled="true"
          />
        </div>
      </div> -->

      <!-- <v-slider
        :rules="rules"
        max="72"
        min="1"
        v-model="result.tenure"
        thumb-label="always"
      /> -->

      <!-- <div class="d-flex justify-center">
        <v-btn outlined color="primary" @click="schedulePaymentPlan()"
          >Calculate Payment Schedule</v-btn
        >
      </div> -->
      <component
        :is="tmoStimulatorFormMetaData.componentName"
        :ref="tmoStimulatorFormMetaData.myRefName"
        :value="selectModel(result)"
        @input="(newValue) => updateModel(modelValue, newValue, result)"
        v-bind="tmoStimulatorFormMetaData.props"
      ></component>
      <v-alert
        dense
        type="warning"
        class="col-12 mb-5"
        outlined
        v-if="
          Math.round(result.monthlyObligation) >
          Math.round(result.affordability)
        "
      >
        Monthly Obligation ({{ Math.round(result.monthlyObligation) | toINR }})
        greater than Affordability ({{
          Math.round(result.affordability) | toINR
        }}).
      </v-alert>
      <v-alert
        dense
        type="error"
        class="col-12 mb-5"
        outlined
        v-if="this.result.tenure >= this.tenureApproval"
      >
        It needs to be approved by the manager.
      </v-alert>
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
  tenureApproval: any = 0;
  rules = [
    (v: number) =>
      this.result.tenure <= this.tenureApproval ||
      "It needs to be approved by the manager",
  ];
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
  };

  //METADATA
  get tmoStimulatorFormMetaData() {
    return new TMOStimulatorFFormMDP({
      taskRoot: this,
    }).getMetaData();
  }
  //METADATA

  mounted() {
    setTimeout(() => {
      this.resultLocal.tenure = this.modelValue.paymentPlan.ppCalculator.tenor;
      this.resultLocal.outstanding =
        this.modelValue.paymentPlan.ppCalculator.outstanding;
      this.resultLocal.settlementPercentage =
        this.modelValue.paymentPlan.ppCalculator.settlementPercentage;
      this.resultLocal.affordability =
        this.modelValue.budgetInfo.proposedDSPayment;
      this.resultLocal.firstSPADraftDate =
        this.modelValue.paymentPlan.ppCalculator.firstDraftDate;
    }, 1000);
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
    this.tenureApproval = getTenureWithFreed(this.resultLocal.outstanding);
    this.resultLocal.msfAmount = getMSFWithFreed(this.resultLocal.outstanding);
    this.resultLocal.monthlyObligation =
      this.resultLocal.monthlyPayment + this.resultLocal.msfAmount;
    return this.resultLocal;
  }

  set result(value: any) {
    this.resultLocal = value;
  }

  schedulePaymentPlan() {
    const input: Data.Spine.SchedulePaymentPlanInput =
      Data.Spine.SchedulePaymentPlanInput.fromJson(this.modelValue.paymentPlan);
    input.clientFileId = this.clientFileId;
    input.ppCalculator.outstanding = this.result.outstanding;
    input.ppCalculator.firstDraftDate = this.result.firstSPADraftDate;
    input.ppCalculator.settlementPercentage = this.result.settlementPercentage;
    input.ppCalculator.tenor = this.tenorNew;
    input.taskId = this.taskId;
    Action.Spine.SchedulePaymentPlan.execute(input, (output: any) => {
      Snackbar.show({
        text: "Succesfully Saved",
        pos: "bottom-center",
      });
    });
  }

  getTenureApproval() {
    return this.rules;
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
