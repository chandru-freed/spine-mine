<template>
  <div>
    <component
      v-if="taskStateTerminated"
      :is="paymentCalculatorFormMetaData.componentName"
      :ref="paymentCalculatorFormMetaData.myRefName"
      :value="
        selectModel(modelValue, paymentCalculatorFormMetaData.dataSelectorKey)
      "
      @input="
        (newValue) =>
          updateModel(
            modelValue,
            newValue,
            paymentCalculatorFormMetaData.dataSelectorKey
          )
      "
      v-bind="paymentCalculatorFormMetaData.props"
    ></component>

    <TMOStimulator
      ref="tmosSimulator"
      v-if="modelValue && !taskStateTerminated"
      :value="modelValue"
      :percentage="modelValue.paymentPlan.ppCalculator?.settlementPercentage"
      :simulatorInput="modelValue"
    />

    <div class="d-flex justify-space-around"></div>

    <v-alert
      dense
      type="warning"
      outlined
      class="col-5 ma-auto mb-5"
      v-if="
        paymentPlan?.ppCalculator.totalMonthlyObligation >
        this.modelValue.budgetInfo.proposedDSPayment
      "
    >
      Monthly Obligation ({{
        paymentPlan?.ppCalculator.totalMonthlyObligation.toFixed(2)
      }}) greater than Affordability ({{
        this.modelValue.budgetInfo.proposedDSPayment.toFixed(2)
      }}).
    </v-alert>

    <v-card flat outlined class="row ma-2">
      <v-toolbar>
        <v-tabs v-model="tab" background-color="transparent" color="secondary">
          <v-tab> Payment Schedule </v-tab>
        </v-tabs>
        <div class="d-flex col-3 justify-end">
          <span class="mx-2">Ps Plan Status: </span>
          <v-chip outlined>{{ modelValue.paymentPlan.psPlanStatus }}</v-chip>
        </div>
      </v-toolbar>

      <v-tabs-items v-model="tab" class="col-12">
        <v-tab-item>
          <v-card flat>
            <v-card flat v-if="showApplyDiscountOnMsfForm">
              <v-card-title>Apply discount on MSF</v-card-title>
              <component
                v-if="!!applyDiscountFFormMetaData"
                :ref="applyDiscountFFormMetaData.myRefName"
                :is="applyDiscountFFormMetaData.componentName"
                :value="selectModel(applyDiscountInput, undefined)"
                @input="
                  (newValue) => updateModel(applyDiscountInput, newValue, undefined)
                "
                v-bind="applyDiscountFFormMetaData.props"
              ></component>
            </v-card>

            <component
              v-if="showAddPsEntryForm"
              :is="addPsEntryFFormMetaData.componentName"
              :ref="addPsEntryFFormMetaData.myRefName"
              :value="
                selectModel(
                  addPsEntryInput,
                  addPsEntryFFormMetaData.dataSelectorKey
                )
              "
              @input="
                (newValue) =>
                  updateModel(
                    addPsEntryInput,
                    newValue,
                    addPsEntryFFormMetaData.dataSelectorKey
                  )
              "
              v-bind="addPsEntryFFormMetaData.props"
            ></component>

            <component
              :is="fPaymentScheduleFDataTableMetaData.componentName"
              :ref="fPaymentScheduleFDataTableMetaData.myRefName"
              :value="psEntrySchelduledList"
              v-bind="fPaymentScheduleFDataTableMetaData.props"
            ></component>
          </v-card>
          <v-divider></v-divider>
          <!-- <v-card flat class="mt-5">
            <component
              :is="fPSkipedPresentedTableMetaData.componentName"
              :ref="fPSkipedPresentedTableMetaData.myRefName"
              :value="psEntryPresentedList"
              v-bind="fPSkipedPresentedTableMetaData.props"
            ></component>
          </v-card> -->
        </v-tab-item>
      </v-tabs-items>
    </v-card>

    <div
      v-if="!disabled"
      class="d-flex flex-row align-start flex-wrap justify-space-around pa-2 my-5"
    >
      <div
        :class="actionMetaData.boundaryClass"
        v-for="(actionMetaData, indx) in actionMetaDataListFiltered"
        :key="indx"
      >
        <component
          :is="actionMetaData.componentName"
          v-bind="actionMetaData.props"
        ></component>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import * as Snackbar from "node-snackbar";
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import FBtn from "@/components/generic/FBtn.vue";
import * as Action from "@/../src-gen/action";
import * as Data from "@/../src-gen/data";
import FEnrollmentPPScheduleFDataTableMDP from "./FEPPScheduleFDataTableMDP";

import FEPSkipedPresentedFDataTableMDP from "./FEPSkipedPresentedFDataTableMDP";
import AddEPsEntryFFormMDP from "./AddEPsEntryFFormMDP";

import * as Store from "@/../src-gen/store";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import TMOStimulator from "@/components/generic/tmoStimulator/TMOStimulator.vue";
import ApplyDiscountOnMsfFFormMDP from "./ApplyDiscountOnMsfFFormMDP";

@Component({
  components: {
    FForm,
    FBtn,
    FDataTable,
    TMOStimulator,
  },
})
export default class FEPaymentPlan extends ModelVue {
  tab = 0;

  showAddPsEntryForm: boolean = false;
  addPsEntryInput: Data.ClientFile.AddPSEntryInput =
    new Data.ClientFile.AddPSEntryInput();
  applyDiscountInput: Data.ClientFile.ApplyDiscountOnMsfInput =
    new Data.ClientFile.ApplyDiscountOnMsfInput();
  showApplyDiscountOnMsfForm: boolean = false;

  fPaymentScheduleFDataTableRefName: string = "fEPaymentScheduleFDataTableMDP";
  taskId = this.$route.params.taskId;

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  get clientFileId() {
    return this.$route.params.clientFileId;
  }
  get paymentPlan(): Data.ClientFile.FiPaymentPlanInfo {
    return this.modelValue.paymentPlan;
  }

  get psEntrySchelduledList() {
    return this.paymentPlan?.paymentScheduleList.filter(
      (psEntry: any) => psEntry.status === "SCHEDULED"
    );
  }

  get psEntryPresentedList() {
    return this.paymentPlan?.paymentScheduleList.filter(
      (psEntry: any) => psEntry.status !== "SCHEDULED"
    );
  }

  get subscriptionFeeScheduleList() {
    return this.paymentPlan.subscriptionFeeScheduleList;
  }

  get actionMetaDataListFiltered() {
    return this.actionMetaDataList.filter(
      (actionMetaData) =>
        actionMetaData.condition === undefined ||
        actionMetaData.condition === true
    );
  }

  openPaymentDetails(item: any) {
    if (item.paymentId) {
      this.$router.push({
        name: "Root.CFile.CFPayment.CFPaymentDetails.CFPaymentDetails",
        params: {
          clientFileNumber: this.$route.params.clientFileNumber,
          paymentId: item.paymentId,
        },
      });
    }
  }

  resetFormsTableAndData() {
    this.showAddPsEntryForm = false;
    this.showApplyDiscountOnMsfForm = false;
    this.addPsEntryInput = new Data.ClientFile.AddPSEntryInput();
    this.applyDiscountInput = new Data.ClientFile.ApplyDiscountOnMsfInput();
    (
      this.$refs[this.fPaymentScheduleFDataTableRefName] as any
    ).clearSelectedItems();
  }

  get fPaymentScheduleFDataTableMetaData() {
    return new FEnrollmentPPScheduleFDataTableMDP({
      parent: this,
      refName: this.fPaymentScheduleFDataTableRefName,
    }).getMetaData();
  }

  get fPSkipedPresentedTableMetaData() {
    return new FEPSkipedPresentedFDataTableMDP({ parent: this }).getMetaData();
  }

  get applyDiscountFFormMetaData() {
    return new ApplyDiscountOnMsfFFormMDP({ parent: this }).getMetaData();
  }

  get addPsEntryFFormMetaData() {
    return new AddEPsEntryFFormMDP({
      parent: this,
    }).getMetaData();
  }

  get taskStateTerminated() {
    return (
      this.taskDetails.taskState === "COMPLETED" ||
      this.taskDetails.taskState === "FORCE_COMPLETED" ||
      this.taskDetails.taskState === "CANCELLED" ||
      this.taskDetails.taskState === "RESET"
    );
  }

  @Prop()
  paymentCalculatorFormMetaData: any;

  @Prop({ default: false })
  disabled: boolean;

  @Prop({ default: false })
  dataSelectorKey: boolean;

  @Prop()
  actionMetaDataList: any[];
}
</script>
