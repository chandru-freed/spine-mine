<template>
  <div>
    <component
      v-if="!budgetFormMetaData.dataSelectorKey"
      :is="budgetFormMetaData.componentName"
      :ref="budgetFormMetaData.myRefName"
      v-model="modelValue"
      v-bind="budgetFormMetaData.props"
    ></component>
    <component
      v-if="!!budgetFormMetaData.dataSelectorKey"
      :is="budgetFormMetaData.componentName"
      :ref="budgetFormMetaData.myRefName"
      v-model="modelValue[budgetFormMetaData.dataSelectorKey]"
      v-bind="budgetFormMetaData.props"
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
                {{ totalIncomeAmount }}
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
                {{ totalSecuredDebtAmount }}
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
                {{ allExpensesAmount }}
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Available Income </v-list-item-title>
              <v-list-item-subtitle>Income available after expense every month</v-list-item-subtitle >
            </v-list-item-content>

            <v-list-item-action>
              <v-btn text>
                {{ totalIncomeAmount - totalSecuredDebtAmount - allExpensesAmount }}
              </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Proposed DS Payment</v-list-item-title>
              <v-list-item-subtitle></v-list-item-subtitle >
            </v-list-item-content>

            <v-list-item-action>
              <v-btn text>
                {{proposedDSPayment}}
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
export default class CCITBudgetStep extends ModelVue {
  get incomeSources() {
    return this.modelValue.budgetInfo.incomeSources;
  }

  get debtRepayments() {
    return this.modelValue.budgetInfo.debtRepayments;
  }

  get livingExpenses() {
    return this.modelValue.budgetInfo.livingExpenses
  }

  get totalIncomeAmount() {
    return Object.values(this.incomeSources).reduce(
      (accumulator: number, objValue: any) => {
        return accumulator + objValue;
      },
      0
    );
  }

  get totalLivingExpenses() {
    return Object.values(this.livingExpenses).reduce(
      (accumulator: number, objValue: any) => {
        return accumulator + objValue;
      },
      0
    );
  }

  get allExpensesAmount() {
    const allExpenseList = this.totalLivingExpenses + 0
    return allExpenseList
  }

  get totalSecuredDebtAmount() {
    return Object.values(this.debtRepayments).reduce(
      (accumulator: number, objValue: any) => {
        return accumulator + objValue;
      },
      0
    );
  }

  get availableIncome( ) {
    return this.totalIncomeAmount - this.totalSecuredDebtAmount - this.allExpensesAmount
  }

  get proposedDSPayment( ) {
    return (this.availableIncome  * 80) /100
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