<template>
  <div class="my-2">
    <v-card outlined>
      <div class="d-flex align-center">
        <v-card-title>Budget</v-card-title>
        <v-spacer />
        <v-btn text @click="goToProfileStep()">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </div>

       <div class="row pa-3">
        <div class="col-4">
          <div><strong>Total Income</strong></div>
          {{ budgetInfo.totalIncome }}
        </div>

        <div class="col-4">
          <div><strong>Available Income</strong></div>
          {{ availableIncome }}
        </div>

        <div class="col-4">
          <div><strong>Proposed DSPayment</strong></div>
          {{ proposedDSPayment }}
        </div>

        <div class="col-4">
          <div><strong>SDTI</strong></div>
          {{ sdtiRatio }}
        </div>
        
       </div>
    <!-- Implement WAD -->
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";

@Component
export default class BudgetSummary extends Vue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

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
    return this.totalIncomeAmount!==0
    ?(this.totalSecuredDebtAmount /this.totalIncomeAmount) * 100
    :0;
  }

  get budgetInfo() {
    return JSON.parse(this.taskDetails.taskOutput).budgetInfo;
  }

 

  mounted() {
  }

  goToProfileStep() {
    this.$router.push({ query: { step: "2" } });
  }
}
</script>