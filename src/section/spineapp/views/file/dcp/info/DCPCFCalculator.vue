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
    <!-- <v-card outlined flat>
      <component
        :ref="dcpCalculatorResultFFormMetaData.myRefName"
        :is="dcpCalculatorResultFFormMetaData.componentName"
        :value="selectModel(dcpCalculatorLocalOutput, undefined)"
        v-bind="dcpCalculatorResultFFormMetaData.props"
      ></component>
    </v-card> -->

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
        <div class="col">Total Interest</div>

        <div class="col">{{ interest | toINR }}</div>
      </div>
      <div class="row">
        <div class="col">Total Amount</div>
        <div class="col">{{ totalAmount | toINR }}</div>
      </div>
      <div class="row">
        <div class="col">Amount Saved Monthy</div>
        <div class="col">{{ emiSaved | toINR }} ({{ emiSavedPercentage }}%)</div>
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

  // dcpCalculatorLocalOutput = {
  //   loanEMIamount: 0,
  //   percentageReduction: 0,
  //   totalInterest: 0,
  // };

  // dcpSavingsPercentageLocal: any = {
  //   existingTotalEMI: 0,
  //   emiSavings: 0,
  //   percentageReduction: 0,
  // };

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

  // calculateEMI() {
  //   let roiAmount = (this.dcpCalculatorLocalInput.loanAmount * this.dcpCalculatorLocalInput.roi) /100;

  //   let totalAmountToPay = this.dcpCalculatorLocalInput.loanAmount + roiAmount;

  //   let presentEMI = totalAmountToPay / this.dcpCalculatorLocalInput.tenure;

  //   this.dcpCalculatorLocalOutput.loanEMIamount = presentEMI;

  //   this.dcpCalculatorLocalOutput.percentageReduction = Number((((this.dcpCalculatorLocalInput.existingTotalEMI - presentEMI) /
  //         this.dcpCalculatorLocalInput.existingTotalEMI) *
  //       100
  //     ).toFixed()
  //   );
  // }

  // calculateEMI() {
  //   let monthlyInterestRate = this.dcpCalculatorLocalInput.roi / 12 / 100;
  //   let emiFormula =
  //     Math.pow(1 + monthlyInterestRate, this.dcpCalculatorLocalInput.tenure) /
  //     (Math.pow(1 + monthlyInterestRate, this.dcpCalculatorLocalInput.tenure) -
  //       1);
  //   let emi =
  //     emiFormula *
  //     monthlyInterestRate *
  //     this.dcpCalculatorLocalInput.loanAmount;
  //   let emiFlat = emiFormula * monthlyInterestRate;
  //   console.log("emiFlat", emiFlat);
  //   this.dcpCalculatorLocalOutput.loanEMIamount = emi;
  //   this.dcpCalculatorLocalOutput.totalInterest =
  //     emi * this.dcpCalculatorLocalInput.tenure;

  //   this.dcpCalculatorLocalOutput.percentageReduction = Number(
  //     (
  //       ((this.dcpCalculatorLocalInput.existingTotalEMI - emi) /
  //         this.dcpCalculatorLocalInput.existingTotalEMI) *
  //       100
  //     ).toFixed()
  //   );
  // }

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
    this.loanEMIamount = (this.totalAmount / this.dcpCalculatorLocalInput.tenure).toFixed();
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

  // get dcpSavingsPercentageOuput() {
  //   this.dcpSavingsPercentageLocal.percentageReduction = (
  //     ((this.dcpSavingsPercentageLocal.existingTotalEMI - this.loanEMIamount) /
  //       this.dcpSavingsPercentageLocal.existingTotalEMI) *
  //     100
  //   ).toFixed(2);
  //   this.dcpSavingsPercentageLocal.emiSavings =
  //     this.dcpSavingsPercentageLocal.existingTotalEMI - this.loanEMIamount;
  //   return this.dcpSavingsPercentageLocal;
  // }
  // set dcpSavingsPercentageOuput(value: any) {
  //   this.dcpSavingsPercentageLocal = value;
  // }
}
</script>

<style></style>
