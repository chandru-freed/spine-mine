<template>
  <div class="col-12">
    <!-- {{taskDetails}} -->
    <v-card
      class="my-3"
      outlined
      v-for="(summaryMetaData, index) of summaryMetaDataList"
      :key="'summary' + index"
    >
      <div class="d-flex align-center mr-4">
        <v-card-title
          ><v-icon class="mr-3" color="success">mdi-check-circle</v-icon
          >{{ summaryMetaData.name }}</v-card-title
        >
        <v-spacer />
        <f-btn
          :disabled="taskDisabled"
          outlined
          color="primary"
          :onClick="() => goToStep(summaryMetaData.stepIndex)"
          label="Edit"
        />
      </div>
      <component
        :is="summaryMetaData.content.componentName"
        :value="selectModel(summaryData)"
        :ref="summaryMetaData.content.myRefName"
        v-bind="summaryMetaData.content.props"
      ></component>
    </v-card>
  </div>
</template>

<script lang="ts">
import FForm from "@/components/generic/form/FForm.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import ProfileSummary from "./ProfileSummary.vue";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import FBtn from "@/components/generic/FBtn.vue";
import Task from "@/section/spineapp/util/Task";
import ModelVue from "@/components/generic/ModelVue";
import FDataTable from "@/components/generic/table/FDataTable.vue";
@Component({
  components: {
    FForm,
    "f-btn": FBtn,
    FDataTable
  },
})
export default class StepSummary extends ModelVue {
  @Prop()
  summaryMetaDataList: any[];
  
  @Prop()
  parent: any;

  @Store.Getter.ClientFile.ClientFileSummary.personalInfo
  personalInfoStore: Data.ClientFile.ClPersonalInfo;
  // Creditor Info
  @Store.Getter.ClientFile.ClientFileSummary.fiCreditorInfo
  fiCreditorStore: Data.ClientFile.FiCreditorInfo;
  // Budget Info
  @Store.Getter.ClientFile.ClientFileSummary.budgetInfo
  budgetInfoStore: Data.ClientFile.BudgetInfo;
  // Payment Plan Info
  @Store.Getter.ClientFile.ClientFileSummary.fiPaymentPlanInfo
  fiPaymentPlanInfoStore: Data.ClientFile.FiPaymentPlanInfo;
  // Bank Info
  @Store.Getter.ClientFile.ClientFileSummary.fiBankInfo
  bankInfoStore: Data.ClientFile.FiBankInfo;
  // Document List
  @Store.Getter.ClientFile.ClientFileSummary.fiDocumentList
  fiDocumentListStore: Data.ClientFile.FiDocument[];
  

  get creditorInfo() {
    return {
      creditosCount:
        this.modelValue.taskOutput.creditorInfo?.includedCreditorList?.length,
      totalDebt: this.modelValue.taskOutput.creditorInfo?.totalDebt || "NA",
    };
  }

  get taskDisabled(): boolean {
    return Task.isTaskNotActionable(this.modelValue.taskState, this.modelValue.isSuspended);
  }

  get bankInfo() {
    return this.modelValue.taskOutput.bankInfo;
  }

  get budgetInfo() {
    const budgetInfo = this.modelValue.taskOutput.budgetInfo;
    budgetInfo.stdiPercentage = Math.round(budgetInfo.stdiPercentage);
    budgetInfo.totalSecuredDebtAmount = this.totalSecuredDebtAmount;
    budgetInfo.totalMonthlyExpense = this.budgetInfoStore?.totalMonthlyExpense;
    return budgetInfo;
  }


  get totalSecuredDebtAmount() {
    const totalDebtRepayments = this.budgetInfoStore?this.sumMiniBudgetAmount(this.budgetInfoStore.debtRepayments):0;
    return totalDebtRepayments;
  }


  sumMiniBudgetAmount(budgetObj: any) {
    return Object.values(budgetObj).reduce(
      (accumulator: number, objValue: any) => {
        const val = isNaN(objValue)?0: objValue;
        return accumulator + val;
      },
      0
    );
  }

  get bankSummary() {
    return {
      accountNumber: this.bankInfo?.accountNumber,
      bankName: this.bankName,
    };
  }

  bankName: string = "";

  get documentSummary() {
    return {
      documentsCount: this.fiDocumentListStore.length,
      documentTypeList: this.fiDocumentListStore
        .map((item: any) => {
          return item.documentType;
        })
        .toString(),
    };
  }

  get summaryData() {
    return {
      taskInput: this.modelValue.taskInput,
      taskOutput: this.modelValue.taskOutput,
      creditorInfo: this.creditorInfo,
      budgetInfo: this.budgetInfo,
      documentSummary: this.documentSummary,
      fiCreditorStore: this.fiCreditorStore,
      budgetInfoStore: this.budgetInfoStore,
      fiPaymentPlanInfoStore: this.fiPaymentPlanInfoStore || new Data.ClientFile.FiPaymentPlanInfo(),
      bankInfoStore: this.bankInfoStore || new Data.ClientFile.FiBankInfo(),
      personalInfoStore: this.personalInfoStore || new Data.ClientFile.ClPersonalInfo(),
      creditorList: this.fiCreditorStore?.fiCreditorList || []
    };
  }

  goToStep(step: Number) {
    this.parent.getMyRef().gotoSpecifiedStep(step);
  }
}
</script>
