<template>
  <div>
    <!-- {{modelValue}} -->
    <component
      style="height: 100%"
      :ref="budgetFormMetaData.myRefName"
      :is="budgetFormMetaData.componentName"
      v-bind="budgetFormMetaData.props"
      :value="selectModel(modelValue, budgetFormMetaData.dataSelectorKey)"
      @input="
        (newValue) =>
          updateModel(modelValue, newValue, budgetFormMetaData.dataSelectorKey)
      "
    ></component>

    <div class="row">
      <div class="col-6">
        <v-card class="mx-3" outlined>
          <v-list subheader two-line>
            <v-subheader class="text-center">Hardship Check</v-subheader>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Monthly Income</v-list-item-title>
                <!-- <v-list-item-subtitle
                >Income earned in total per month</v-list-item-subtitle
              > -->
              </v-list-item-content>

              <v-list-item-action>
                <v-btn text> {{ totalIncomeAmount | toINR }} </v-btn>
              </v-list-item-action>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Secured Loan EMI</v-list-item-title>
                <!-- <v-list-item-subtitle>All total debt</v-list-item-subtitle> -->
              </v-list-item-content>

              <v-list-item-action>
                <v-btn text> {{ totalSecuredDebtAmount | toINR }} </v-btn>
              </v-list-item-action>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Unsecured Loan EMI</v-list-item-title>
                <v-list-item-subtitle
                  >Eligible + Ineligible EMIs
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn text>
                  {{
                    modelValue.taskOutput.creditorInfo.totalUnsecuredDebt
                      | toINR
                  }}
                </v-btn>
              </v-list-item-action>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Monthly Expenses</v-list-item-title>
                <!-- <v-list-item-subtitle>All monthly expenses</v-list-item-subtitle> -->
              </v-list-item-content>

              <v-list-item-action>
                <v-btn text>{{ allExpensesAmount | toINR }} </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Income Remaining </v-list-item-title>
                <!-- <v-list-item-subtitle
                >Total Income - (Total Monthly Expense + Total Debt
                Repayments)</v-list-item-subtitle
              > -->
              </v-list-item-content>

              <v-list-item-action>
                <v-btn text> {{ financialHealthCheckAmount | toINR }} </v-btn>
              </v-list-item-action>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  >Financial Health Check Percentage</v-list-item-title
                >
              </v-list-item-content>

              <v-list-item-action>
                <v-btn text class="font-weight-black" color="secondary">
                  {{ Math.round(financialHealthCheckPercentage) }} %
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-alert
                  color="red"
                  v-if="financialHealthCheckPercentage >= -5"
                  class="pa-4"
                  outlined
                >
                  <v-list-item-title class="red--text">
                    <v-icon color="red" small>mdi-alert</v-icon>
                    Hardship check failed.
                  </v-list-item-title>
                </v-alert>

                <v-alert color="green" class="pa-4" outlined v-else>
                  <v-list-item-title class="green--text">
                    <v-icon color="green" small>mdi-check</v-icon>
                    Hardship check pass.
                  </v-list-item-title>
                </v-alert>
              </v-list-item-content>

              <!-- <v-list-item-action>
              <v-btn text class="font-weight-black" color="secondary">
                {{ Math.round(financialHealthCheckPercentage)  }} %
              </v-btn>
            </v-list-item-action> -->
            </v-list-item>
          </v-list>
        </v-card>
      </div>
      <div class="col-6">
        <v-card class="mx-3" outlined>
          <v-list subheader two-line>
            <v-subheader class="text-center">Budget Summary</v-subheader>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Monthly Income</v-list-item-title>
                <!-- <v-list-item-subtitle
                  >Income earned in total per month</v-list-item-subtitle
                > -->
              </v-list-item-content>

              <v-list-item-action>
                <v-btn text> {{ totalIncomeAmount | toINR }} </v-btn>
              </v-list-item-action>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Secured Loan EMI</v-list-item-title>
                <!-- <v-list-item-subtitle>All total debt</v-list-item-subtitle> -->
              </v-list-item-content>

              <v-list-item-action>
                <v-btn text> {{ totalSecuredDebtAmount | toINR }} </v-btn>
              </v-list-item-action>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  >Ineligible Unsecured Loan EMI</v-list-item-title
                >
                <!-- <v-list-item-subtitle>All total debt</v-list-item-subtitle> -->
              </v-list-item-content>

              <v-list-item-action>
                <v-btn text>
                  {{ totalIneligibleUnsecuredDebts | toINR }}
                </v-btn>
              </v-list-item-action>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Total Monthly Expenses</v-list-item-title>
                <!-- <v-list-item-subtitle
                  >All monthly expenses</v-list-item-subtitle
                > -->
              </v-list-item-content>

              <v-list-item-action>
                <v-btn text>{{ allExpensesAmount | toINR }} </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Available Income </v-list-item-title>
                <!-- <v-list-item-subtitle
                  >Total Income - (Total Monthly Expense + Total Debt
                  Repayments)</v-list-item-subtitle
                > -->
              </v-list-item-content>

              <v-list-item-action>
                <v-btn text> {{ availableIncome | toINR }} </v-btn>
              </v-list-item-action>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  >Proposed DS Payment (Affordability)</v-list-item-title
                >
                <v-list-item-subtitle
                  >{{ affordabilityPercentage }}% of Available Income
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn text class="font-weight-black" color="secondary">
                  {{ proposedDSPayment | toINR }}
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  >SDTI (Secured Debt to Income Ratio) or SFOIR
                </v-list-item-title>
                <v-list-item-subtitle></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn text> {{ sdtiRatio.toFixed(0) }}% </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </div>
    </div>

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
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import FBtn from "@/components/generic/FBtn.vue";
import * as Data from "@/../src-gen/data";
import store, * as Store from "@/../src-gen/store";

@Component({
  components: {
    FForm,
    FBtn,
  },
})
export default class FBudget extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.personalInfo
  personalInfo: Data.ClientFile.ClPersonalInfo;

  affordabilityPercentage = 85;

  //FORM

  taskFormDataLocal: any = {
    taskInput: {},
    taskOutput: {},
  };

  get taskFormData() {
    return {
      taskInput: this.personalInfo,
      taskOutput: this.modelValue,
    };
  }

  set taskFormData(value: any) {
    this.taskFormDataLocal = value;
  }
  //FORM

  get modelValueLocal() {
    return this.modelValue.taskOutput.budgetInfo;
  }

  get incomeSources() {
    return this.modelValueLocal.incomeSources;
  }

  get debtRepayments() {
    return this.modelValueLocal.debtRepayments;
  }

  get ineligibleUnsecuredDebts() {
    return this.modelValueLocal.ineligibleUnsecuredDebt;
  }

  get livingExpenses() {
    return this.modelValueLocal.livingExpenses;
  }

  get lifeStyleExpenses() {
    return this.modelValueLocal.lifeStyleExpenses;
  }

  get dependentExpenses() {
    return this.modelValueLocal.dependentExpenses;
  }

  get incidentalExpenses() {
    return this.modelValueLocal.incidentalExpenses;
  }

  get miscellaneousExpenses() {
    return this.modelValueLocal.miscellaneousExpenses;
  }

  get totalIncomeAmount() {
    const totalIncome = this.sumMiniBudgetAmount(this.incomeSources);
    this.modelValueLocal.totalIncome = totalIncome;
    return totalIncome;
  }

  sumMiniBudgetAmount(budgetObj: any) {
    return Object.values(budgetObj).reduce(
      (accumulator: number, objValue: any) => {
        const val = isNaN(objValue) ? 0 : objValue;
        return accumulator + val;
      },
      0
    );
  }

  get totalLivingExpenses() {
    const totalLivingExpenses = this.sumMiniBudgetAmount(this.livingExpenses);
    this.modelValueLocal.totalLivingExpenses = totalLivingExpenses;
    return totalLivingExpenses;
  }

  get totalLifeStyleExpenses() {
    const totalLifeStyleExpenses = this.sumMiniBudgetAmount(
      this.lifeStyleExpenses
    );
    this.modelValueLocal.totalLifeStyleExpenses = totalLifeStyleExpenses;
    return totalLifeStyleExpenses;
  }

  get totalDependentExpenses() {
    const totalDependentExpenses = this.sumMiniBudgetAmount(
      this.dependentExpenses
    );
    this.modelValueLocal.totalDependentExpenses = totalDependentExpenses;
    return totalDependentExpenses;
  }

  get totalIncidentalExpenses() {
    const totalIncidentalExpenses = this.sumMiniBudgetAmount(
      this.incidentalExpenses
    );
    this.modelValueLocal.totalIncidentalExpenses = totalIncidentalExpenses;
    return totalIncidentalExpenses;
  }

  get totalMiscellaneousExpenses() {
    const totalMiscellaneousExpenses = this.sumMiniBudgetAmount(
      this.miscellaneousExpenses
    );
    this.modelValueLocal.totalMiscellaneousExpenses =
      totalMiscellaneousExpenses;
    return totalMiscellaneousExpenses;
  }
  get allExpensesAmount() {
    const allExpenseList =
      this.totalLivingExpenses +
      this.totalLifeStyleExpenses +
      this.totalDependentExpenses +
      this.totalIncidentalExpenses +
      this.totalMiscellaneousExpenses;

    this.modelValueLocal.totalMonthlyExpense = allExpenseList;
    return allExpenseList;
  }

  get totalSecuredDebtAmount() {
    const totalDebtRepayments = this.sumMiniBudgetAmount(this.debtRepayments);
    this.modelValueLocal.totalDebtRepayments = totalDebtRepayments;
    return totalDebtRepayments;
  }

  get totalIneligibleUnsecuredDebts() {
    const totalIneligibleUnsecuredDebts = this.sumMiniBudgetAmount(
      this.ineligibleUnsecuredDebts
    );
    this.modelValueLocal.totalIneligibleUnsecuredDebts =
      totalIneligibleUnsecuredDebts;
    return totalIneligibleUnsecuredDebts;
  }

  get availableIncome() {
    const availableIncome =
      this.totalIncomeAmount -
      this.totalSecuredDebtAmount -
      this.totalIneligibleUnsecuredDebts -
      this.allExpensesAmount;
    this.modelValueLocal.availableIncome = availableIncome;
    return availableIncome;
  }

  get financialHealthCheckAmount() {
    const financialHealthCheckAmount =
      this.totalIncomeAmount -
      this.totalSecuredDebtAmount -
      this.modelValue.taskOutput.creditorInfo.totalUnsecuredDebt -
      this.allExpensesAmount;
    return financialHealthCheckAmount;
  }

  get financialHealthCheckPercentage() {
    if(!!this.totalIncomeAmount && this.totalIncomeAmount!==0) {
    return (this.financialHealthCheckAmount * 100) / this.totalIncomeAmount;
    } else {
      return 0;
    }
  }

  get proposedDSPayment() {
    const proposedDSPayment =
      (this.availableIncome * this.affordabilityPercentage) / 100;
    this.modelValueLocal.proposedDSPayment = proposedDSPayment;
    return proposedDSPayment;
  }

  get sdtiRatio() {
    const stdiPercentage =
      this.totalIncomeAmount !== 0
        ? (this.totalSecuredDebtAmount / this.totalIncomeAmount) * 100
        : 0;
    this.modelValueLocal.stdiPercentage = stdiPercentage;
    return stdiPercentage;
  }

  get actionMetaDataListFiltered() {
    return this.actionMetaDataList.filter(
      (actionMetaData) =>
        actionMetaData.condition === undefined ||
        actionMetaData.condition === true
    );
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