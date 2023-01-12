<template>
  <div class="collectClientInfoTask">
    <!-- Used in Active State -->
    {{taskFormData.taskInput}}
    <template v-if="!taskStateTerminated">
      <component
        :ref="stepperMetaData.myRefName"
        :is="stepperMetaData.componentName"
        :value="selectModel(taskFormData, undefined)"
        @input="(newValue) => updateModel(taskFormData, newValue, undefined)"
        v-bind="stepperMetaData.props"
      ></component>
    </template>

    <!-- Used in Terminated State -->
    <template v-if="taskStateTerminated">
      <component
        :ref="stepperMetaData.myRefName"
        :is="stepperMetaData.componentName"
        :value="selectModel(taskDetailsData, undefined)"
        v-bind="stepperMetaData.props"
      ></component>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";

import ModelVue from "@/components/generic/ModelVue";
import Task from "@/section/spineapp/util/Task";

import FTaskStepper from "@/components/generic/FTaskStepper.vue";
import UTFStepperMDP from "./UTFStepperMDP";
import moment from "moment";
import Helper from "@/section/spineapp/util/Helper";

@Component({
  components: {
    FTaskStepper,
  },
})
export default class UnderwrittingTask extends ModelVue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  //Store we are getting task form data

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  // Personal Info
  @Store.Getter.ClientFile.ClientFileSummary.personalInfo
  personalInfoStore: Data.ClientFile.ClPersonalInfo;
  // Creditor Info
  @Store.Getter.ClientFile.ClientFileSummary.fiCreditorInfo
  fiCreditorStore: Data.ClientFile.FiCreditorInfo;
  // Budget Info
  @Store.Getter.ClientFile.ClientFileSummary.budgetInfo
  budgetInfoStore: Data.ClientFile.BudgetInfo;
  // Payment Plan Info
  @Store.Getter.ClientFile.ClientFileSummary.fiPaymentPlanInfo
  fiPaymentPlanInfoStore: Data.ClientFile.FiPaymentPlanInfo;
  // Bank Info
  @Store.Getter.ClientFile.ClientFileSummary.fiBankInfo
  bankInfoStore: Data.ClientFile.FiBankInfo;
  // Document List
  @Store.Getter.ClientFile.ClientFileSummary.fiDocumentList
  fiDocumentListStore: Data.ClientFile.FiDocument[];

  @Store.Getter.ClientFile.ClientFileSummary.fileSummary
  clientFileSummary: Data.ClientFile.FileSummary;
  // URl we are getting taskId and clientFileId
  taskId = this.$route.params.taskId;
  clientFileId = this.$route.params.clientFileId;

  // Parse JSON String => As taskOutput and taskInput comes as Json String
  // get taskDetailsOutput() {
  //   return !!this.taskDetails && !!this.taskDetails.taskOutput
  //     ? JSON.parse(this.taskDetails.taskOutput)
  //     : {};
  // }
  // get taskDetailsInput() {
  //   return !!this.taskDetails && !!this.taskDetails.taskInput
  //     ? JSON.parse(this.taskDetails.taskInput)
  //     : {};
  // }

  // ModelValue =>  Used in Terminated State
  get taskDetailsData() {
    return {
      taskInput: this.taskDetails.inputJson,
      taskOutput: this.taskDetails.outputJson,
    };
  }

  get taskStateTerminated() {
    return (
      this.taskDetails.taskState === "COMPLETED" ||
      this.taskDetails.taskState === "FORCE_COMPLETED" ||
      this.taskDetails.taskState === "CANCELLED" ||
      this.taskDetails.taskState === "RESET"
    );
  }

  // ModelValue =>  Used in Active State
  taskFormDataLocal: any = { taskInput: {}, taskOutput: {} };
  get taskFormData() {
    return {
      taskInput: this.taskDetails.inputJson,
      taskOutput: this.taskFormOutput,
      taskState: this.taskDetails.taskState,
    };
  }
  set taskFormData(value: any) {
    this.taskFormDataLocal = value;
  }

  taskFormOutputLocal: any = new Data.Spine.UnderwrittingTaskOutput();
  get taskFormOutput() {
    console.log(this.fiPaymentPlanInfoStore, "Compiling");

    this.taskFormOutputLocal = {
      ...this.taskDetails.outputJson,
      personalInfo: this.personalInfoStore
        ? Data.Spine.PersonalInfo.fromJson(this.personalInfoStore)
        : new Data.Spine.PersonalInfo(),
      creditorInfo: this.fiCreditorStore
        ? Data.Spine.CreditorInfo.fromJson(this.fiCreditorStore)
        : new Data.Spine.CreditorInfo(),
      budgetInfo: this.budgetInfoStore
        ? Data.Spine.BudgetInfo.fromJson(this.budgetInfoStore)
        : new Data.Spine.BudgetInfo(),
      bankInfo: this.bankInfoStore
        ? Data.Spine.BankInfo.fromJson(this.bankInfoStore)
        : new Data.Spine.BankInfo(),
      paymentPlan: this.fiPaymentPlanInfoStore
        ? Data.Spine.PaymentPlan.fromJson(this.fiPaymentPlanInfoStore)
        : new Data.Spine.PaymentPlan(),
      fileDocumentList: this.fiDocumentListStore || [],
      underwrittingApproved:
        (this.taskDetails.outputJson as any).underwrittingApproved || true,
      reasonForUnderwrittingDecline: (this.taskDetails.outputJson as any)
        .reasonForUnderwrittingDecline,
    };
    return this.taskFormOutputLocal;
  }

  set taskFormOutput(newVal) {
    this.taskFormOutputLocal = newVal;
  }

  get stepperMetaData(): any {
    return new UTFStepperMDP({
      taskRoot: this,
    }).getMetaData();
  }

  get taskDisabled(): boolean {
    return Task.isTaskNotActionable(
      this.taskDetails.taskState,
      this.taskDetails.isSuspended
    );
  }

  public findClPersonalInfoHandler = (output: any) => {
    setTimeout(() => {
      this.findClPersonalInfo();
    }, 1000);
  };

  public getClientCreditorInfoAndSummaryHandler = (output: any) => {
    setTimeout(() => {
      this.getClientCreditorInfoAndSummary();
    }, 1000);
  };

  public getBudgetInfoHandler = (output: any) => {
    setTimeout(() => {
      this.getBudgetInfo();
    }, 1000);
  };

  public getFiPaymentPlanInfoHandler = (output: any) => {
    setTimeout(() => {
      this.getFiPaymentPlanInfo();
    }, 1000);
  };

  public getFiBankInfoHandler = (output: any) => {
    setTimeout(() => {
      this.getFiBankInfo();
    }, 1000);
  };

  public getFiDocumentListHandler = (output: any) => {
    setTimeout(() => {
      this.getFiDocumentList();
    }, 1000);
  };

  mounted() {
    this.findClPersonalInfo();
    this.getFiCreditorInfo();
    this.getBudgetInfo();
    this.getFiPaymentPlanInfo();
    this.getFiBankInfo();
    this.getFiDocumentList();

    Action.Spine.UpdateClPersonalInfo.interested(
      this.findClPersonalInfoHandler
    );

    Action.Spine.AddCreditor.interested(
      this.getClientCreditorInfoAndSummaryHandler
    );
    Action.Spine.UpdateCreditor.interested(
      this.getClientCreditorInfoAndSummaryHandler
    );
    Action.Spine.RemoveCreditor.interested(
      this.getClientCreditorInfoAndSummaryHandler
    );

    Action.Spine.UpdateBudgetInfo.interested(this.getBudgetInfoHandler);

    Action.Spine.SchedulePaymentPlan.interested(
      this.getFiPaymentPlanInfoHandler
    );

    Action.Spine.DraftPSPlanForPM.interested(this.getFiPaymentPlanInfoHandler);

    Action.ClientFile.AddPSEntry.interested(this.getFiPaymentPlanInfoHandler);

    Action.Spine.RecalculatePSPlanForPM.interested(
      this.getFiPaymentPlanInfoHandler
    );

    Action.Spine.UpdateBankInfo.interested(this.getFiBankInfoHandler);
    Action.Spine.AttachDocument.interested(this.getFiDocumentListHandler);
    Action.Spine.DetachDocument.interested(this.getFiDocumentListHandler);

    Action.Spine.Skip.interested(this.getFiPaymentPlanInfoHandler);
  }

  public destroyed() {
    Action.Spine.UpdateClPersonalInfo.notInterested(
      this.findClPersonalInfoHandler
    );

    Action.Spine.AddCreditor.notInterested(
      this.getClientCreditorInfoAndSummaryHandler
    );

    Action.Spine.UpdateCreditor.notInterested(
      this.getClientCreditorInfoAndSummaryHandler
    );
    Action.Spine.RemoveCreditor.notInterested(
      this.getClientCreditorInfoAndSummaryHandler
    );

    Action.Spine.UpdateBudgetInfo.notInterested(this.getBudgetInfoHandler);

    Action.Spine.SchedulePaymentPlan.notInterested(
      this.getFiPaymentPlanInfoHandler
    );

    Action.Spine.DraftPSPlanForPM.notInterested(
      this.getFiPaymentPlanInfoHandler
    );

    Action.ClientFile.AddPSEntry.notInterested(
      this.getFiPaymentPlanInfoHandler
    );

    Action.Spine.RecalculatePSPlanForPM.notInterested(
      this.getFiPaymentPlanInfoHandler
    );

    Action.Spine.UpdateBankInfo.notInterested(this.getFiBankInfoHandler);

    Action.Spine.AttachDocument.notInterested(this.getFiDocumentListHandler);
    Action.Spine.DetachDocument.notInterested(this.getFiDocumentListHandler);

    Action.Spine.Skip.notInterested(this.getFiPaymentPlanInfoHandler);
  }
  // Confirm AccountNumber => per populate account number to confirm cccount number
  setConfirmAccountNumber() {
    if (this.bankInfoStore) {
      this.taskFormOutput.bankInfo.confirmAccountNumber =
        this.bankInfoStore.accountNumber;
    }
  }

  saveAndMarkCompleteTask() {
    Task.Action.saveAndMarkCompleteTask({
      taskId: this.taskId,
      taskOutput: this.taskFormData.taskOutput,
    });
  }

  //New Get API Add
  findClPersonalInfo() {
    Action.ClientFile.FindClPersonalInfo.execute1(
      this.clientFileId,
      (output) => {}
    );
  }

  getFiCreditorInfo() {
    Action.ClientFile.GetCreditorInfo.execute1(this.clientFileId, (output) => {
      // this.schedulePaymentPlan();
    });
  }

  getClientCreditorInfoAndSummary() {
    this.getClientFileSummary();
    Action.ClientFile.GetCreditorInfo.execute1(this.clientFileId, (output) => {
      // this.schedulePaymentPlan();
    });
  }

  getBudgetInfo() {
    Action.ClientFile.GetBudgetInfo.execute1(this.clientFileId, (output) => {});
  }

  getFiPaymentPlanInfo() {
    Action.ClientFile.GetPaymentPlanInfo.execute1(
      this.clientFileId,
      (output) => {}
    );
  }

  getFiBankInfo() {
    Action.ClientFile.GetFiBankInfo.execute1(this.clientFileId, (output) => {
      this.setConfirmAccountNumber();
    });
  }

  getFiDocumentList() {
    Action.ClientFile.GetDocumentList.execute1(
      this.clientFileId,
      (output) => {}
    );
  }

  /* Bank Details => based on the IFSC code get the bank address 
  and per populate the data like ADDRESS, CITY, STATE, COUNTRY */
  populateBankDetails(details: any) {
    this.taskFormData.taskOutput.bankInfo.bankAddress.addressLine1 =
      details.ADDRESS;
    this.taskFormData.taskOutput.bankInfo.bankAddress.city = details.CITY;
    this.taskFormData.taskOutput.bankInfo.bankAddress.state = details.STATE;
    this.taskFormData.taskOutput.bankInfo.bankAddress.country = "India";
  }

  schedulePaymentPlan() {
    const paymentPlan = this.fiPaymentPlanInfoStore
      ? Data.Spine.PaymentPlan.fromJson(this.fiPaymentPlanInfoStore)
      : new Data.Spine.PaymentPlan();
    const input = Data.Spine.SchedulePaymentPlanInput.fromJson(paymentPlan);
    input.clientFileId = this.clientFileId;
    input.ppCalculator.outstanding = this.fiCreditorStore.totalDebt;
    input.taskId = this.taskId;
    if (input.ppCalculator.firstDraftDate === "") {
      input.ppCalculator.firstDraftDate = moment()
        .add(2, "days")
        .format(Helper.DATE_FORMAT);
      input.ppCalculator.feeFirstDraftDate = moment().format(
        Helper.DATE_FORMAT
      );
    }
    // if(input.ppCalculator.firstDraftDate === '') {
    Action.Spine.SchedulePaymentPlan.execute(
      input,
      (output: any) => {},
      (error) => {}
    );
    // }
  }

  getClientFileSummary() {
    Action.ClientFile.GetClientFileSummary.execute1(
      this.clientFileId,
      (output) => {}
    );
  }
}
</script>

<style></style>
