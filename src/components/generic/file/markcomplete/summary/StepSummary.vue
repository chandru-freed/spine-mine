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
        v-if="currentStep === '6'"
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

  //Data
  taskFormOutputLocal: any = new Data.Spine.CollectClientInfoTask();
  get taskFormOutput() {
    if (
      this.taskDetailsOutput.personalInfo &&
      this.taskDetailsOutput.personalInfo.gender
    ) {
      this.taskFormOutputLocal.personalInfo =
        this.taskDetailsOutput.personalInfo;
    }

    if (
      this.taskDetailsOutput.creditorInfo &&
      this.taskDetailsOutput.creditorInfo.creditorList
    ) {
      this.taskFormOutputLocal.creditorInfo =
        this.taskDetailsOutput.creditorInfo;
    }
    if (this.taskDetailsOutput.budgetInfo) {
      this.taskFormOutputLocal.budgetInfo.hardshipReason =
        this.taskDetailsOutput.budgetInfo.hardshipReason;
    }

    if (
      this.taskDetailsOutput.budgetInfo &&
      this.taskDetailsOutput.budgetInfo.incomeSources
    ) {
      this.taskFormOutputLocal.budgetInfo.incomeSources = {
        ...this.taskFormOutputLocal.budgetInfo.incomeSources,
        ...this.taskDetailsOutput.budgetInfo.incomeSources,
      };
      this.taskFormOutputLocal.budgetInfo.debtRepayments = {
        ...this.taskFormOutputLocal.budgetInfo.debtRepayments,
        ...this.taskDetailsOutput.budgetInfo.debtRepayments,
      };
      this.taskFormOutputLocal.budgetInfo.livingExpenses = {
        ...this.taskFormOutputLocal.budgetInfo.livingExpenses,
        ...this.taskDetailsOutput.budgetInfo.livingExpenses,
      };
      this.taskFormOutputLocal.budgetInfo.lifeStyleExpenses = {
        ...this.taskFormOutputLocal.budgetInfo.lifeStyleExpenses,
        ...this.taskDetailsOutput.budgetInfo.lifeStyleExpenses,
      };

      this.taskFormOutputLocal.budgetInfo.dependentExpenses = {
        ...this.taskFormOutputLocal.budgetInfo.dependentExpenses,
        ...this.taskDetailsOutput.budgetInfo.dependentExpenses,
      };

      this.taskFormOutputLocal.budgetInfo.incidentalExpenses = {
        ...this.taskFormOutputLocal.budgetInfo.incidentalExpenses,
        ...this.taskDetailsOutput.budgetInfo.incidentalExpenses,
      };

      this.taskFormOutputLocal.budgetInfo.miscellaneousExpenses = {
        ...this.taskFormOutputLocal.budgetInfo.miscellaneousExpenses,
        ...this.taskDetailsOutput.budgetInfo.miscellaneousExpenses,
      };
    }

    if (
      this.taskDetailsOutput.paymentPlan &&
      this.taskDetailsOutput.paymentPlan.ppCalculator &&
      this.taskDetailsOutput.paymentPlan.ppCalculator.firstDraftDate
    ) {
      this.taskFormOutputLocal.paymentPlan = this.taskDetailsOutput.paymentPlan;
    } else {
      // this.taskFormOutputLocal.paymentPlan.ppCalculator.firstDraftDate = moment().format("yyyy-MM-DD")
    }

    if (
      this.taskDetailsOutput.bankInfo &&
      this.taskDetailsOutput.bankInfo.accountNumber
    ) {
      this.taskFormOutputLocal.bankInfo = this.taskDetailsOutput.bankInfo;
    }

    if (this.taskDetailsOutput.fileDocumentList) {
      this.taskFormOutputLocal.fileDocumentList =
        this.taskDetailsOutput.fileDocumentList;
    }
    if (this.taskDetailsOutput.needVerification) {
      this.taskFormOutputLocal.needVerification =
        this.taskDetailsOutput.needVerification;
    }
    return this.taskFormOutputLocal;
  }

  set taskFormOutput(newValue) {
    this.taskFormOutputLocal = newValue;
  }

  //Data

  get currentStep() {
    return this.$route.query.step;
  }
  get taskDetailsOutput() {
    return JSON.parse(this.taskDetails.taskOutput);
  }

  get taskInput() {
    return JSON.parse(this.taskDetails.taskInput);
  }
  get creditorInfo() {
    return {
      creditosCount: this.taskFormOutput.creditorInfo?.creditorList.length,
      totalDebtAmount:
        this.taskFormOutput.creditorInfo?.totalDebtAmount || "NA",
    };
  }

  get bankInfo() {
    return this.taskFormOutput.bankInfo;
  }

  get budgetInfo() {
    const budgetInfo = this.taskFormOutput.budgetInfo;
    console.log;
    budgetInfo.stdiPercentage = Math.round(budgetInfo.stdiPercentage);
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
      documentsCount: this.taskFormOutput.fileDocumentList.length,
      documentTypeList: this.taskFormOutput.fileDocumentList
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
      taskOutput: this.taskFormOutput,
      creditorInfo: this.creditorInfo,
      budgetInfo: this.budgetInfo,
      paymentPlan: this.taskFormOutput.paymentPlan,
      bankSummary: this.bankSummary,
      documentSummary: this.documentSummary,
    };
  }

  goToStep(step: Number) {
    this.$router.push({ query: { step: step.toString() } });
  }
}
</script>
