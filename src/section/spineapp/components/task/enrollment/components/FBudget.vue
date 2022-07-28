<template>
  <v-row no-gutters>
    <v-col :class="formComponentMetaData.boundaryClass">
      <template v-if="!!formComponentMetaData.dataSelectorKey">
        <component
          :ref="formComponentMetaData.formRef"
          :is="formComponentMetaData.componentName"
          v-model="formDataComputed[formComponentMetaData.dataSelectorKey]"
          v-bind="formComponentMetaData.props"
        />
      </template>
      <template v-if="!formComponentMetaData.dataSelectorKey">
        <component
          :ref="formComponentMetaData.formRef"
          :is="formComponentMetaData.componentName"
          v-model="formDataComputed"
          v-bind="formComponentMetaData.props"
        />
      </template>
    </v-col>
    <v-col class="col-12">
      <v-card outlined flat>
        <v-card-text>
          <v-list dense>
            <v-list-item>
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
                  >SDTI (Secured Debt to Income Ratio) or
                  SFOIR</v-list-item-title
                >
              </v-list-item-content>
              <v-list-item-action class="text-body-1 font-weight-bold">
                {{ sFoir }}%
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
      <v-card-actions>
        <v-row no-gutters>
          <v-col
            v-for="(action, index) in actionList"
            :key="index"
            :class="action.boundaryClass"
          >
            <component :is="action.componentName" v-bind="action.props">
            </component>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import FForm from "@/components/form/FForm.vue";
import FBtn from "@/components/FBtn.vue";

@Component({
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider,
    "f-form": FForm,
    "f-btn": FBtn,
  },
})
export default class FBudget extends Vue {
  totalAmount(miniBudget: object) {
    return (Object.values(miniBudget) as number[]).reduce<number>(
      (accumulator, obj: number) => {
        return accumulator + obj;
      },
      0
    );
  }

  get totalIncome() {
    const incomeSources = !!this.formDataComputed.incomeSources
      ? this.formDataComputed.incomeSources
      : {};
    return this.totalAmount(incomeSources);
  }

  get availableIncome() {
    return this.totalIncome - this.totalMonthlyExpenses;
  }

  get proposedDSPayment() {
    return (this.availableIncome * 85) / 100;
  }

  get sFoir() {
    return !!this.totalSecuredDebtObligation && this.totalIncome
      ? (this.totalSecuredDebtObligation * 100) / this.totalIncome
      : 0;
  }

  get totalSecuredDebtObligation() {
    const debtRepayments = !!this.formDataComputed.debtRepayments
      ? this.formDataComputed.debtRepayments
      : {};
    return this.totalAmount(debtRepayments);
  }

  get totalMonthlyExpenses() {
    const livingExpense = !!this.formDataComputed.livingExpense
      ? this.formDataComputed.livingExpense
      : {};
    const lifestyleExpense = !!this.formDataComputed.lifestyleExpense
      ? this.formDataComputed.lifestyleExpense
      : {};
    const dependentExpense = !!this.formDataComputed.dependentExpense
      ? this.formDataComputed.dependentExpense
      : {};
    const incidentalExpense = !!this.formDataComputed.incidentalExpense
      ? this.formDataComputed.incidentalExpense
      : {};
    const miscellaneousExpense = !!this.formDataComputed.miscellaneousExpense
      ? this.formDataComputed.miscellaneousExpense
      : {};
    return (
      this.totalAmount(livingExpense) +
      this.totalAmount(lifestyleExpense) +
      this.totalAmount(dependentExpense) +
      this.totalAmount(incidentalExpense) +
      this.totalAmount(miscellaneousExpense)
    );
  }

  @Prop({
    default: () => {
      return {};
    },
  })
  public formComponentMetaData!: any;

  @Prop({
    default: () => {
      return [];
    },
  })
  public actionList!: any[];

  // V-MODEL START
  @Prop({
    default: () => {
      return {};
    },
  })
  value!: any;

  formData: any = {};

  get formDataComputed(): any {
    return this.formData;
  }

  set formDataComputed(value) {
    this.formData = value;
  }

  // WATCH as the MODEL VALUE is a OBJ -
  // And Fields inside the Object if change does not call set of Computed
  @Watch("formData")
  updateMyForm(value: any, oldValue: any) {
    this.$emit("input", value);
  }

  mounted() {
    this.formData = this.value;
  }
  // V-MODEL END
}
</script>
