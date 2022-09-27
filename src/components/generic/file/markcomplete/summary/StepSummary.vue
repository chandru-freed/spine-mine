<template>
  <div class="col-12">
    <v-card
      class="my-3"
      outlined
      v-for="(summaryMetaData, index) of summaryMetaDataList"
      :key="'summary' + index"
    >
      <div class="d-flex align-center">
        <v-card-title
          ><v-icon class="mr-3">mdi-check-circle</v-icon
          >{{ summaryMetaData.name }}</v-card-title
        >
        <v-spacer />
        <v-btn rounded text @click="goToStep(summaryMetaData.stepIndex)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </div>
      <component
        :is="summaryMetaData.content.componentName"
        :value="summaryData"
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
@Component({
  components: {
    FForm,
  },
})
export default class StepSummary extends Vue {
  @Prop()
  summaryMetaDataList: any[];
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;
  get taskOutput() {
    return JSON.parse(this.taskDetails.taskOutput);
  }

  get taskInput() {
    return JSON.parse(this.taskDetails.taskInput);
  }
  get creditorInfo() {
    console.log(this.taskOutput);
    return {
      creditosCount: this.taskOutput.creditorInfo.creditorList.length,
      totalDebtAmount: this.taskOutput.creditorInfo.totalDebtAmount || "NA",
    };
  }

  get bankInfo() {
    return JSON.parse(this.taskDetails.taskOutput).bankInfo;
  }

  get bankSummary() {
    return {
      accountNumber: this.bankInfo.accountNumber,
      bankName: this.bankName,
    };
  }

  bankName: string = "";

  get documentSummary() {
    return {
      documentsCount: this.taskOutput.fileDocumentList.length,
      documentTypeList: this.taskOutput.fileDocumentList
        .map((item: any) => {
          return item.documentType;
        })
        .toString(),
    };
  }

  mounted() {
    this.getNupayBankMasterList();
  }

  getNupayBankMasterList() {
    Action.ClientFile.GetNupayBankMasterList.execute((output) => {
      output.nupayBankMasterList[0].nupayBnkName;
      const bankSelected = output.nupayBankMasterList.filter(
        (item) => item.nupayBankId === this.bankInfo.nupayBankMasterId
      );

      this.bankName =
        bankSelected.length > 0 ? bankSelected[0].nupayBnkName : "NA";
    });
  }

  get budgetSummary() {
    return {
      totalIncome: this.totalIncomeAmount,
      availableIncome: this.availableIncome,
      proposedDSPayment: this.proposedDSPayment,
      sdtiRatio: this.sdtiRatio,
    };
  }

  get summaryData() {
    return {
      taskInput: this.taskInput,
      taskOutput: this.taskOutput,
      creditorInfo: this.creditorInfo,
      budgetSummary: this.budgetSummary,
      paymentPlan: this.taskOutput.paymentPlan,
      bankSummary: this.bankSummary,
      documentSummary: this.documentSummary,
    };
  }

  goToStep(step: Number) {
    this.$router.push({ query: { step: step.toString() } });
  }

  // Budget Summary data

  affordabilityPercentage = 85;

  get incomeSources() {
    return this.budgetInfo.incomeSources;
  }

  get debtRepayments() {
    return this.budgetInfo.debtRepayments;
  }

  get livingExpenses() {
    return this.budgetInfo.livingExpenses;
  }

  get lifeStyleExpenses() {
    return this.budgetInfo.lifeStyleExpenses;
  }

  get dependentExpenses() {
    return this.budgetInfo.dependentExpenses;
  }

  get incidentalExpenses() {
    return this.budgetInfo.incidentalExpenses;
  }

  get miscellaneousExpenses() {
    return this.budgetInfo.miscellaneousExpenses;
  }

  get totalIncomeAmount() {
    const totalIncome = this.sumMiniBudgetAmount(this.incomeSources);
    this.budgetInfo.totalIncome = totalIncome;
    return totalIncome;
  }

  sumMiniBudgetAmount(budgetObj: any) {
    return Object.values(budgetObj).reduce(
      (accumulator: number, objValue: any) => {
        return accumulator + objValue;
      },
      0
    );
  }

  get totalLivingExpenses() {
    const totalLivingExpenses = this.sumMiniBudgetAmount(this.livingExpenses);
    this.budgetInfo.totalLivingExpenses = totalLivingExpenses;
    return totalLivingExpenses;
  }

  get totalLifeStyleExpenses() {
    const totalLifeStyleExpenses = this.sumMiniBudgetAmount(
      this.lifeStyleExpenses
    );
    this.budgetInfo.totalLifeStyleExpenses = totalLifeStyleExpenses;
    return totalLifeStyleExpenses;
  }

  get totalDependentExpenses() {
    const totalDependentExpenses = this.sumMiniBudgetAmount(
      this.dependentExpenses
    );
    this.budgetInfo.totalDependentExpenses = totalDependentExpenses;
    return totalDependentExpenses;
  }

  get totalIncidentalExpenses() {
    const totalIncidentalExpenses = this.sumMiniBudgetAmount(
      this.incidentalExpenses
    );
    this.budgetInfo.totalIncidentalExpenses = totalIncidentalExpenses;
    return totalIncidentalExpenses;
  }

  get totalMiscellaneousExpenses() {
    const totalMiscellaneousExpenses = this.sumMiniBudgetAmount(
      this.miscellaneousExpenses
    );
    this.budgetInfo.totalMiscellaneousExpenses = totalMiscellaneousExpenses;
    return totalMiscellaneousExpenses;
  }
  get allExpensesAmount() {
    const allExpenseList =
      this.totalLivingExpenses +
      this.totalLifeStyleExpenses +
      this.totalDependentExpenses +
      this.totalIncidentalExpenses +
      this.totalMiscellaneousExpenses;
    return allExpenseList;
  }

  get totalSecuredDebtAmount() {
    const totalDebtRepayments = this.sumMiniBudgetAmount(this.debtRepayments);
    this.budgetInfo.totalDebtRepayments = totalDebtRepayments;
    return totalDebtRepayments;
  }

  get availableIncome() {
    return (
      this.totalIncomeAmount -
      this.totalSecuredDebtAmount -
      this.allExpensesAmount
    );
  }

  get proposedDSPayment() {
    return (this.availableIncome * this.affordabilityPercentage) / 100;
  }

  get sdtiRatio() {
    return this.totalIncomeAmount !== 0
      ? (this.totalSecuredDebtAmount / this.totalIncomeAmount) * 100
      : 0;
  }

  get budgetInfo() {
    return JSON.parse(this.taskDetails.taskOutput).budgetInfo;
  }

  // Budget summary data
}
</script>
