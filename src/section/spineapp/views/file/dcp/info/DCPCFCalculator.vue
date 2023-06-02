<template>
  <div class="col">
    <!-- <v-btn color="primary" @click="calculateFlatRateMonthly(1000000, 15, 60)"
      >calculateFlatRateMonthly</v-btn
    > -->

    <component
      :ref="dcpCalculatorFFormMetaData.myRefName"
      :is="dcpCalculatorFFormMetaData.componentName"
      :value="selectModel(dcpCalculatorLocalInput, undefined)"
      @input="
        (newValue) => updateModel(dcpCalculatorLocalInput, newValue, undefined)
      "
      v-bind="dcpCalculatorFFormMetaData.props"
    ></component>

    <v-card class="pa-5">
      <div class="row">
        <div class="col"></div>
        <div class="col">Flat interest rate</div>
      </div>
      <div class="row">
        <div class="col">Loan EMI Amount</div>
        <div class="col">{{ loanEMIamount | toINR }}</div>
      </div>
      <div class="row">
        <div class="col">Total Interest Payable</div>

        <div class="col">{{ interest | toINR }}</div>
      </div>
      <div class="row">
        <div class="col">Total Repayment Amount</div>
        <div class="col">{{ totalAmount | toINR }}</div>
      </div>
      <div class="row" v-if="emiSavedPercentage > 0">
        <div class="col">Amount Saved Monthly</div>
        <div class="col">
          {{ emiSaved | toINR }} ({{ emiSavedPercentage }}%)
        </div>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import DCPAgreementListFDataTableMDP from "./DCPAgreementListFDataTableMDP";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import FForm from "@/components/generic/form/FForm.vue";
import DCPCreateAgreementFFormMDP from "./DCPCreateAgreementFFormMDP";
import ModelVue from "@/components/generic/ModelVue";
import DCPCFCalculatorFFormMDP from "./DCPCFCalculatorFFormMDP";
import DCPCFCalculatorResultFFormMDP from "./DCPCFCalculatorResultFFormMDP";
import DCPCFEMISavingsPercentageFFormMDP from "./DCPCFEMISavingsPercentageFFormMDP";

@Component({
  components: {
    FDataTable,
    FForm,
  },
})
export default class DCPCFCalculator extends ModelVue {
  dcpCalculatorLocalInput = {
    existingTotalEMI: 0,
    loanAmount: 0,
    tenure: 0,
    roi: 0,
  };

  totalAmount: number = 0;
  interest: number = 0;
  loanEMIamount: any = 0;
  emiSavedPercentage: any = 0;
  emiSaved: number = 0;

  generateAgreementFromExcelInput: Data.DCPClientFile.GenerateAgreementFromExcelInput =
    new Data.DCPClientFile.GenerateAgreementFromExcelInput();

  get tenureList() {
    return Array.from({ length: 72 - 5 }, (_, index) => index + 6);
  }

  get roiList() {
    return Array.from({ length: 35 - 9 }, (_, index) => index + 10);
  }

  get dcpCalculatorFFormMetaData() {
    return new DCPCFCalculatorFFormMDP({ parent: this }).getMetaData();
  }
  get dcpCalculatorResultFFormMetaData() {
    return new DCPCFCalculatorResultFFormMDP({ parent: this }).getMetaData();
  }

  get dcpSavingsPercentageMetaData() {
    return new DCPCFEMISavingsPercentageFFormMDP({
      parent: this,
    }).getMetaData();
  }

  resetFormAndDialog() {
    this.generateAgreementFromExcelInput =
      new Data.DCPClientFile.GenerateAgreementFromExcelInput();
  }

  calculateFlatRateMonthly() {
    // Convert the annual interest rate to monthly rate
    let monthlyRate = this.dcpCalculatorLocalInput.roi / 12 / 100;

    // Calculate the interest amount
    this.interest =
      this.dcpCalculatorLocalInput.loanAmount *
      monthlyRate *
      this.dcpCalculatorLocalInput.tenure;

    // Calculate the total amount (including the this.dcpCalculatorLocalInput.loanAmount)
    this.totalAmount = this.dcpCalculatorLocalInput.loanAmount + this.interest;
    this.loanEMIamount = (
      this.totalAmount / this.dcpCalculatorLocalInput.tenure
    ).toFixed();
    this.emiSaved =
      this.dcpCalculatorLocalInput.existingTotalEMI - this.loanEMIamount;
    this.emiSavedPercentage = (
      ((this.dcpCalculatorLocalInput.existingTotalEMI - this.loanEMIamount) /
        this.dcpCalculatorLocalInput.existingTotalEMI) *
      100
    ).toFixed(2);

    // Return the total amount
    return this.totalAmount;
  }
}
</script>

<style></style>
