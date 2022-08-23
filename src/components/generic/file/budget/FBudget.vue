<template>
  <div>
    <component
      :is="budgetFormMetaData.componentName"
      v-bind="budgetFormMetaData.props"
      :value="selectModel(modelValue, budgetFormMetaData.dataSelectorKey)"
      @input="(newValue) => updateModel(modelValue, newValue, budgetFormMetaData.dataSelectorKey)"
    ></component>

    <div class="d-flex justify-space-around">
      <v-card outlined min-width="600px">
        <v-list subheader two-line>
          <v-subheader class="text-center">Budget Summary</v-subheader>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Total Income</v-list-item-title>
              <v-list-item-subtitle>Income earned in total per month</v-list-item-subtitle >
            </v-list-item-content>

            <v-list-item-action>
              <v-btn text>
                ₹ {{ totalIncomeAmount }}
              </v-btn>
            </v-list-item-action>
          </v-list-item>

           <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Total Secured Debt Obligation</v-list-item-title>
              <v-list-item-subtitle>All total debt</v-list-item-subtitle >
            </v-list-item-content>

            <v-list-item-action>
              <v-btn text>
                ₹ {{ totalSecuredDebtAmount }}
              </v-btn>
            </v-list-item-action>
          </v-list-item>

         <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Total Monthly Expenses</v-list-item-title>
              <v-list-item-subtitle>All monthly expenses</v-list-item-subtitle >
            </v-list-item-content>

            <v-list-item-action>
              <v-btn text>
                ₹ {{ allExpensesAmount }}
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Available Income </v-list-item-title>
              <v-list-item-subtitle>Total Income - (Total Monthly Expense + Total Debt Repayments)</v-list-item-subtitle >
            </v-list-item-content>

            <v-list-item-action>
              <v-btn text>
                ₹ {{ availableIncome }}
              </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Proposed DS Payment (Affordability)</v-list-item-title>
              <v-list-item-subtitle>{{affordabilityPercentage}}% of Available Income </v-list-item-subtitle >
            </v-list-item-content>

            <v-list-item-action>
              <v-btn text>
                ₹ {{proposedDSPayment}}
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>SDTI (Secured Debt to Income Ratio) or SFOIR </v-list-item-title>
              <v-list-item-subtitle></v-list-item-subtitle >
            </v-list-item-content>

            <v-list-item-action>
              <v-btn text>
                Fill in
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </div>

    <div
      v-if="!disabled"
      class="d-flex flex-row align-start flex-wrap justify-space-around pa-2"
    >
      <div
        :class="actionMetaData.boundaryClass"
        v-for="(actionMetaData, indx) in actionMetaDataList"
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
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import FBtn from "@/components/generic/FBtn.vue";
@Component({
  components: {
    FForm,
    FBtn,
  },
})
export default class FBudget extends ModelVue {
  affordabilityPercentage = 80

  get incomeSources() {
    return this.modelValue.incomeSources;
  }

  get debtRepayments() {
    return this.modelValue.debtRepayments;
  }

  get livingExpenses() {
    return this.modelValue.livingExpenses
  }

  get totalIncomeAmount() {
    const totalIncome = this.sumMiniBudgetAmount(this.incomeSources)
    this.modelValue.totalIncome = totalIncome
    return totalIncome
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
     const totalLivingExpenses = this.sumMiniBudgetAmount(this.livingExpenses)
    this.modelValue.totalLivingExpenses = totalLivingExpenses
    return totalLivingExpenses
  }

  get allExpensesAmount() {
    const allExpenseList = this.totalLivingExpenses + 0
    return allExpenseList
  }

  get totalSecuredDebtAmount() {
    const totalDebtRepayments = this.sumMiniBudgetAmount(this.debtRepayments)
    this.modelValue.totalDebtRepayments = totalDebtRepayments
    return totalDebtRepayments
  }

  get availableIncome( ) {
    return this.totalIncomeAmount - this.totalSecuredDebtAmount - this.allExpensesAmount
  }

  get proposedDSPayment( ) {
    return (this.availableIncome  * this.affordabilityPercentage) /100
  }


  @Prop()
  budgetFormMetaData: any;

  @Prop({ default: false })
  disabled: boolean;

  @Prop({ default: false })
  dataSelectorKey: boolean;

  @Prop()
  actionMetaDataList: any[];
}
</script>