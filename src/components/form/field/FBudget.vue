<template>
  <v-row no-gutters>
    <v-col
      v-for="(field, index) in fieldList"
      :key="index"
      :class="field.boundaryClass"
    >
      <ValidationProvider
        :vid="field.props.id"
        :name="field.props.label"
        :rules="field.rules"
        v-slot="{ errors }"
      >
        <component
          dense
          :is="field.componentName"
          v-model="modelValue[field.props.key]"
          v-bind="field.props"
          :error-messages="errors"
        >
        </component>
      </ValidationProvider>
    </v-col>
    <v-col class="col-12">
      <v-card outlined flat>
        <v-card-text>
          <v-list dense>
            <v-list-item >
              <v-list-item-content>
                <v-list-item-title class="text-body-1"
                  >Total Income</v-list-item-title
                >
              </v-list-item-content>
              <v-list-item-action class="text-body-1 font-weight-bold">
                {{ totalIncome }}
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-body-1"
                  >Total Secured Debt Obligation</v-list-item-title
                >
              </v-list-item-content>
              <v-list-item-action class="text-body-1 font-weight-bold">
                {{ totalSecuredDebtObligation }}
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-body-1"
                  >Total Monthly Expense</v-list-item-title
                >
              </v-list-item-content>
              <v-list-item-action class="text-body-1 font-weight-bold">
                {{ totalMonthlyExpenses }}
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-body-1"
                  >Available Income</v-list-item-title
                >
              </v-list-item-content>
              <v-list-item-action class="text-body-1 font-weight-bold">
                {{ availableIncome }}
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-body-1"
                  >Proposed DS Payment</v-list-item-title
                >
              </v-list-item-content>
              <v-list-item-action class="text-body-1 font-weight-bold">
                {{ proposedDSPayment }}
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-body-1"
                  >SDTI (Secured Debt to Income Ratio) or SFOIR</v-list-item-title
                >
              </v-list-item-content>
              <v-list-item-action class="text-body-1 font-weight-bold">
                {{ sFoir }}%
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import FMiniFormWithTotal from "@/components/form/field/FMiniFormWithTotal.vue";

@Component({
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider,
    "f-mini-form-with-total": FMiniFormWithTotal,
  },
})
export default class FBudget extends Vue {
  @Prop({
    default: () => {
      return [];
    },
  })
  public fieldList!: any[];

  totalAmount(miniBudget: object) {
    return (Object.values(miniBudget) as number[]).reduce<number>(
      (accumulator, obj: number) => {
        return accumulator + obj;
      },
      0
    );
  }

  get totalIncome() {
    const incomeSources = !!this.modelValue.incomeSources
      ? this.modelValue.incomeSources
      : {};
    return this.totalAmount(incomeSources);
  }

  get availableIncome() {
    return this.totalIncome - this.totalMonthlyExpenses;
  }

  get proposedDSPayment() {
    return (this.availableIncome * 85) /  100
  }

  get sFoir() {
    return (!!this.totalSecuredDebtObligation && this.totalIncome) ? (this.totalSecuredDebtObligation * 100 ) / this.totalIncome : 0
  }

  

  

  get totalSecuredDebtObligation() {
    const debtRepayments = !!this.modelValue.debtRepayments
      ? this.modelValue.debtRepayments
      : {};
    return this.totalAmount(debtRepayments);
  }

  get totalMonthlyExpenses() {
    const livingExpense = !!this.modelValue.livingExpense
      ? this.modelValue.livingExpense
      : {};
    const lifestyleExpense = !!this.modelValue.lifestyleExpense
      ? this.modelValue.lifestyleExpense
      : {};
    const dependentExpense = !!this.modelValue.dependentExpense
      ? this.modelValue.dependentExpense
      : {};
    const incidentalExpense = !!this.modelValue.incidentalExpense
      ? this.modelValue.incidentalExpense
      : {};
    const miscellaneousExpense = !!this.modelValue.miscellaneousExpense
      ? this.modelValue.miscellaneousExpense
      : {};
    return (
      this.totalAmount(livingExpense) +
      this.totalAmount(lifestyleExpense) +
      this.totalAmount(dependentExpense) +
      this.totalAmount(incidentalExpense) +
      this.totalAmount(miscellaneousExpense)
    );
  }

  // V-MODEL START
  @Prop({
    default: () => {
      return {};
    },
  })
  value!: any;

  budgetForm = { incomeSources: {} };

  get modelValue(): any {
    return this.budgetForm;
  }

  set modelValue(value) {
    if (!!value) {
      this.budgetForm = value;
    }
  }

  // WATCH as the MODEL VALUE is a OBJ -
  // And Fields inside the Object if change does not call set of Computed
  @Watch("budgetForm")
  updateMyForm(value: any, oldValue: any) {
    this.$emit("input", value);
  }

  mounted() {
    this.budgetForm = this.value;
  }
  // V-MODEL END
}
</script>
