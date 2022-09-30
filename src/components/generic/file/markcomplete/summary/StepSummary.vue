<template>
  <div class="col-12">
    <v-card
      class="my-3"
      outlined
      v-for="(summaryMetaData, index) of summaryMetaDataList"
      :key="'summary' + index"
    >
      <div class="d-flex align-center mr-4">
        <v-card-title
          ><v-icon class="mr-3">mdi-check-circle</v-icon
          >{{ summaryMetaData.name }}</v-card-title
        >
        <v-spacer />
        <f-btn
          outlined
          color="primary"
          :onClick="() => goToStep(summaryMetaData.stepIndex)"
          label="Edit"
        />
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
import FBtn from "@/components/generic/FBtn.vue";
@Component({
  components: {
    FForm,
    "f-btn": FBtn,
  },
})
export default class StepSummary extends Vue {
  @Prop()
  summaryMetaDataList: any[];
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;
  taskFormOutputLocal: Data.Spine.CollectClientInfoTask =
    new Data.Spine.CollectClientInfoTask();
  get taskFormOutput() {
    this.taskFormOutputLocal = {
      ...this.taskDetailsOutput,
      personalInfo:
        this.taskDetailsOutput.personalInfo || new Data.Spine.PersonalInfo(),
      creditorInfo:
        this.taskDetailsOutput.creditorInfo || new Data.Spine.CreditorInfo(),
      budgetInfo:
        this.taskDetailsOutput.budgetInfo || new Data.Spine.BudgetInfo(),
      bankInfo: this.taskDetailsOutput.bankInfo || new Data.Spine.BankInfo(),
      paymentPlan:
        this.taskDetailsOutput.paymentPlan || new Data.Spine.PaymentPlan(),
      fileDocumentList: this.taskDetailsOutput.fileDocumentList || [],
      needVerification: this.taskDetailsOutput.needVerification,
    };
    return this.taskFormOutputLocal;
  }

  set taskFormOutput(newVal) {
    this.taskFormOutputLocal = newVal;
  }

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
      totalDebt: this.taskFormOutput.creditorInfo?.totalDebt || "NA",
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
