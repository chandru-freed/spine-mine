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
    return {
      creditosCount: this.taskOutput.creditorInfo.creditorList.length,
      totalDebtAmount: this.taskOutput.creditorInfo.totalDebtAmount || "NA",
    };
  }

  get bankInfo() {
    return JSON.parse(this.taskDetails.taskOutput).bankInfo;
  }


  get budgetInfo() {
    const budgetInfo =  JSON.parse(this.taskDetails.taskOutput).budgetInfo
    budgetInfo.stdiPercentage = Math.round(budgetInfo.stdiPercentage)
    return budgetInfo;
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

  get summaryData() {
    return {
      taskInput: this.taskInput,
      taskOutput: this.taskOutput,
      creditorInfo: this.creditorInfo,
      budgetInfo: this.budgetInfo,
      paymentPlan: this.taskOutput.paymentPlan,
      bankSummary: this.bankSummary,
      documentSummary: this.documentSummary,
    };
  }

  goToStep(step: Number) {
    this.$router.push({ query: { step: step.toString() } });
  }

}
</script>
