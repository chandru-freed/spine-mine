<template>
  <div>
    <!-- <component
    v-if="modelValue.paymentPlan"
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
    ></component> -->
    <TMOStimulatorWithPsPlanId
      ref="tmosSimulator"
      :percentage="
        tmosSimulatorInput.paymentPlan.ppCalculator?.settlementPercentage
      "
      v-if="tmosSimulatorInput"
      :value="tmosSimulatorInput"
      :simulatorInput="tmosSimulatorInput"

    />

    <div class="d-flex justify-space-around"></div>

    <!-- <v-alert
      dense
      type="warning"
      outlined
      class="col-5 ma-auto mb-5"
      v-if="
        paymentPlan.ppCalculator.totalMonthlyObligation >
        this.modelValue.budgetInfo.proposedDSPayment
      "
    >
      Monthly Obligation ({{
        paymentPlan?.ppCalculator.totalMonthlyObligation.toFixed(2)
      }}) greater than Affordability ({{
        this.modelValue.budgetInfo?.proposedDSPayment.toFixed(2)
      }}).
    </v-alert> -->

    <v-card flat outlined class="row ma-2">
      <v-toolbar>
        <v-tabs v-model="tab" background-color="transparent" color="secondary">
          <v-tab> Payment Schedule </v-tab>
          <v-tab v-if="!hideMSFTab"> MSF Schedule </v-tab>
        </v-tabs>
        <div class="d-flex col-3 justify-end">
          <span>Ps Plan Status: </span>
          <v-chip small>{{ paymentPlan.psPlanStatus }}</v-chip>
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
              v-if="showUploadForm"
              :is="uploadExcelFFormMetaData.componentName"
              :ref="uploadExcelFFormMetaData.myRefName"
              :value="
                selectModel(
                  uploadPSPlanExcelInput,
                  uploadExcelFFormMetaData.dataSelectorKey
                )
              "
              @input="
                (newValue) =>
                  updateModel(
                    uploadPSPlanExcelInput,
                    newValue,
                    uploadExcelFFormMetaData.dataSelectorKey
                  )
              "
              v-bind="uploadExcelFFormMetaData.props"
            ></component>

            <component
              v-if="showModifyForm"
              :is="modifyPsEntryFFormMetaData.componentName"
              :ref="modifyPsEntryFFormMetaData.myRefName"
              :value="
                selectModel(
                  modifyAmountPSEListInput,
                  modifyPsEntryFFormMetaData.dataSelectorKey
                )
              "
              @input="
                (newValue) =>
                  updateModel(
                    addPsEntryInput,
                    newValue,
                    modifyPsEntryFFormMetaData.dataSelectorKey
                  )
              "
              v-bind="modifyPsEntryFFormMetaData.props"
            ></component>

            <component
              :is="fPaymentScheduleFDataTableMetaData.componentName"
              :ref="fPaymentScheduleFDataTableMetaData.myRefName"
              :value="psEntrySchelduledList"
              v-bind="fPaymentScheduleFDataTableMetaData.props"
            ></component>
          </v-card>
          <v-divider></v-divider>
          <v-card flat class="mt-5">
            <component
              :is="fPSkipedPresentedTableMetaData.componentName"
              :ref="fPSkipedPresentedTableMetaData.myRefName"
              :value="psEntryPresentedList"
              v-bind="fPSkipedPresentedTableMetaData.props"
            ></component>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <component
              :is="fFeeFDataTableMetaData.componentName"
              :ref="fFeeFDataTableMetaData.myRefName"
              :value="subscriptionFeeScheduleList"
              v-bind="fFeeFDataTableMetaData.props"
            ></component>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>

    <div
      v-if="!disabled"
      class="
        d-flex
        flex-row
        align-start
        flex-wrap
        justify-space-around
        pa-2
        my-5
      "
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
import * as Store from "@/../src-gen/store";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import TMOStimulatorWithPsPlanId from "@/components/generic/tmoStimulator/TMOStimulatorWithPsPlanId.vue";

import FBPSkipedPresentedFDataTableMDP from "./FBPSkipedPresentedFDataTableMDP";
import FBPPScheduleFDataTableMDP from "./FBPPScheduleFDataTableMDP";
import AddBPsEntryFFormMDP from "./AddBPsEntryFFormMDP";
import ModifyBPsEntryFFormMDP from "./ModifyBPsEntryFFormMDP";
import FBFeeFDataTableMDP from "./FBFeeFDataTableMDP";
import Helper from "@/section/spineapp/util/Helper";
import UploadExcelFFormMDP from "./UploadExcelFFormMDP";
import ApplyDiscountOnMsfAmendmentFFormMDP from "./ApplyDiscountOnMsfAmendmentFFormMDP";
@Component({
  components: {
    FForm,
    FBtn,
    FDataTable,
    TMOStimulatorWithPsPlanId,
  },
})
export default class FBPaymentPlan extends ModelVue {
  @Prop()
  taskRoot: any;
  tab = 0;

  showAddPsEntryForm: boolean = false;
  showModifyForm: boolean = false;
  addPsEntryInput: Data.ClientFile.AddPSEntryInput =
    new Data.ClientFile.AddPSEntryInput();
  modifyAmountPSEListInput: Data.ClientFile.ModifyAmountWithFixedTenureInput =
    new Data.ClientFile.ModifyAmountWithFixedTenureInput();
  @Store.Getter.ClientFile.ClientFileSummary.fiPaymentPlanInfo
    fiPaymentPlanInfoStore: Data.ClientFile.FiPaymentPlanInfo;
   @Store.Getter.Login.LoginDetails.roleList
   roleList: string[]; 
  applyDiscountInput: Data.ClientFile.ApplyDiscountOnMsfAmendmentInput =
    new Data.ClientFile.ApplyDiscountOnMsfAmendmentInput();
  showApplyDiscountOnMsfForm: boolean = false;  
  fPaymentScheduleFDataTableRefName: string = "fPaymentScheduleFDataTableMDP";
  taskId = this.$route.params.taskId;

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  showUploadForm: boolean = false;
  uploadPSPlanExcelInput: Data.Spine.UploadPSPlanExcelInput =
    new Data.Spine.UploadPSPlanExcelInput();

  get clientFileId() {
    return this.$route.params.clientFileId;
  }
  get paymentPlan(): Data.ClientFile.FiPaymentPlanInfo {
    return this.modelValue.taskOutput.payload.paymentPlan;
  }

  get tmosSimulatorInput() {
    return {
      paymentPlan: this.paymentPlan,
      creditorInfo: this.modelValue.taskOutput.payload.creditorInfo,
      budgetInfo: this.modelValue.taskInput?.existingBudgetInfo,
    };
  }

  get psEntrySchelduledList() {
    return (
      this.paymentPlan?.paymentScheduleList.filter(
        (psEntry: any) => psEntry
        // psEntry.status === "SCHEDULED" @umesh i have change this for showing a all entries
      ) || []
    );
  }

  get psEntryPresentedList() {
    return this.paymentPlan?.paymentScheduleList.filter(
      (psEntry: any) => psEntry.status !== "SCHEDULED"
    );
  }

  get subscriptionFeeScheduleList() {
    return this.paymentPlan?.subscriptionFeeScheduleList;
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
    this.showModifyForm = false;
    this.showUploadForm = false;
    this.showApplyDiscountOnMsfForm = false;
    this.applyDiscountInput = new Data.ClientFile.ApplyDiscountOnMsfAmendmentInput();
    this.addPsEntryInput = new Data.ClientFile.AddPSEntryInput();
    this.modifyAmountPSEListInput =
      new Data.ClientFile.ModifyAmountWithFixedTenureInput();
    (
      this.$refs[this.fPaymentScheduleFDataTableRefName] as any
    ).clearSelectedItems();

    this.uploadPSPlanExcelInput = new Data.Spine.UploadPSPlanExcelInput();
  }

  downloadActiveExcel() {
    console.log(this.modelValue.taskInput)
    const { psPlanId } = this.fiPaymentPlanInfoStore;
    const url = `/spineapi/paymentscheduleplan/download-payment-plan-excel?psPlanId=${psPlanId}`;
    const fileName = `PaymentPlan_${this.clientFileBasicInfo.clientFileNumber}.xlsx`;
    Helper.downloadFile(url, fileName);
  }

  downloadDraftExcel() {
    const newPSPlanId = this.modelValue.taskOutput.payload.paymentPlan.psPlanId;
    const url = `/spineapi/paymentscheduleplan/download-payment-plan-excel?psPlanId=${newPSPlanId}`;
    const fileName = `PaymentPlan_${this.clientFileBasicInfo.clientFileNumber}.xlsx`;
    Helper.downloadFile(url, fileName);
  }

  uploadExcel() {
    this.uploadPSPlanExcelInput.newPSPlanId =
      this.modelValue.taskOutput.payload.paymentPlan.psPlanId;
    Action.Spine.UploadPaymentSchedulePlanExcel.execute(
      this.uploadPSPlanExcelInput,
      (output) => {
        this.resetFormsTableAndData();
      }
    );
    // Action.Spine.UploadPaymentPlanExcel.execute1()
  }

  handleUploadClick() {
    this.showUploadForm = true;
  }

  handleApplyDiscountClick() {
    this.showApplyDiscountOnMsfForm = true;
    this.applyDiscountInput.msfDiscountAmount = this.paymentPlan.ppCalculator.msfDiscountAmount || 0;
  }

  get fPaymentScheduleFDataTableMetaData() {
    return new FBPPScheduleFDataTableMDP({
      parent: this,
      refName: this.fPaymentScheduleFDataTableRefName,
    }).getMetaData();
  }

  get fPSkipedPresentedTableMetaData() {
    return new FBPSkipedPresentedFDataTableMDP({ parent: this }).getMetaData();
  }

  get fFeeFDataTableMetaData() {
    return new FBFeeFDataTableMDP({ parent: this }).getMetaData();
  }

  get addPsEntryFFormMetaData() {
    return new AddBPsEntryFFormMDP({
      parent: this,
    }).getMetaData();
  }

  get modifyPsEntryFFormMetaData() {
    return new ModifyBPsEntryFFormMDP({ parent: this }).getMetaData();
  }

  get uploadExcelFFormMetaData() {
    return new UploadExcelFFormMDP({ parent: this }).getMetaData();
  }

  get applyDiscountFFormMetaData() {
    return new ApplyDiscountOnMsfAmendmentFFormMDP({parent: this,taskRoot: this.taskRoot}).getMetaData();
  }

  enableApplyDiscount() {
    return this.roleList.includes("RetentionRep")
  }

  isOutstandingChanged() {
    return (
      this.tmosSimulatorInput.creditorInfo?.totalDebt !==
      this.tmosSimulatorInput.paymentPlan?.ppCalculator?.outstanding
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

  @Prop({ default: false })
  hideMSFTab: boolean;

  @Prop({ default: false })
  disabledActionBtn: boolean;
}
</script>
