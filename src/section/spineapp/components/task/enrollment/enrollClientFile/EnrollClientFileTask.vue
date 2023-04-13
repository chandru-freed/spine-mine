<template>
  <div class="collectClientInfoTask">
    <!-- {{taskFormData}} -->
    <!-- Used in Active State -->
    <template>
      <component
        :ref="stepperMetaData.myRefName"
        :is="stepperMetaData.componentName"
        :value="selectModel(taskFormData, undefined)"
        @input="(newValue) => updateModel(taskFormData, newValue, undefined)"
        v-bind="stepperMetaData.props"
      ></component>
    </template>

    <!-- Used in Terminated State -->
    <!-- <template v-if="taskStateTerminated">
      <component
        :ref="stepperMetaData.myRefName"
        :is="stepperMetaData.componentName"
        :value="selectModel(taskDetailsData, undefined)"
        v-bind="stepperMetaData.props"
      ></component>
    </template> -->
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
import ECFTFStepperMDP from "./ECFTFStepperMDP";
import moment from "moment";
import Helper from "@/section/spineapp/util/Helper";

@Component({
  components: {
    FTaskStepper,
  },
})
export default class EnrollClientFileTask extends ModelVue {
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

  //ERP Document List
  @Store.Getter.ClientFile.ClientFileSummary.fiERPDocumentList
  fiERPDocumentListStore: Data.ClientFile.FiDocument[];

  @Store.Getter.ClientFile.ClientFileSummary.fileSummary
  clientFileSummary: Data.ClientFile.FileSummary;

    // clientFileEnrollmentSummary Info
  @Store.Getter.ClientFile.ClientFileSummary.fiClientFileEnrollmentSummary
  clientFileEnrollmentSummary: Data.ClientFile.ClientFileEnrollmentSummary;

  // URl we are getting taskId and clientFileId
  taskId = this.$route.params.taskId;
  clientFileId = this.$route.params.clientFileId;

  getExceptionTakenListOutput: Data.ClientFile.GetExceptionTakenListOutput =
    new Data.ClientFile.GetExceptionTakenListOutput();

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
      registrationInfo: this.clientFileBasicInfo.clientBasicInfo,
    };
  }
  set taskFormData(value: any) {
    this.taskFormDataLocal = value;
  }

  taskFormOutputLocal: any = new Data.Spine.CollectClientInfoTask();
  get taskFormOutput() {
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
      fileERPDocumentList: this.fiERPDocumentListStore || [],
      needVerification: (this.taskDetails.outputJson as any).needVerification,
      exceptionTakenList: this.getExceptionTakenListOutput.exceptionTakenList,
      exceptionApprovedBy: this.getExceptionTakenListOutput.exceptionApprovedBy,
      collectMSFNow: this.taskDetails.isOutputEmpty
        ? this.taskFormOutputLocal.collectMSFNow
        : (this.taskDetails.outputJson as any).collectMSFNow,
      haveException: this.exceptionTakenStatus(),
    };

    return this.taskFormOutputLocal;
  }

  exceptionTakenStatus() {
    if (this.getExceptionTakenListOutput.exceptionTakenList) {
      return this.getExceptionTakenListOutput.exceptionTakenList.includes(
        Data.ClientFile.EXCEPTION_TAKEN.NO.id
      )
        ? "NO"
        : this.getExceptionTakenListOutput.exceptionTakenList.length > 0
        ? "YES"
        : undefined;
    }
  }

  isOutstandingChanged() {
    return (
      this.taskFormData.taskOutput.creditorInfo?.totalDebt !==
      this.taskFormData.taskOutput.paymentPlan?.ppCalculator?.outstanding
    );
  }

  set taskFormOutput(newVal) {
    this.taskFormOutputLocal = newVal;
  }

  get stepperMetaData(): any {
    return new ECFTFStepperMDP({
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

  public getClientFileBasicInfoHandler = (output: any) => {
    setTimeout(() => {
      this.getClientFileBasicInfo();
    }, 1000);
  };

  public getClientCreditorInfoAndInfoHandler = (output: any) => {
    setTimeout(() => {
      this.getClientCreditorInfoAndInfo();
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

  public getAllSignAgreementListHandler = (output: any) => {
    setTimeout(() => {
      this.getAllSignAgreementList();
    }, 1000);
  };

  public getMSFCashfreeLinkPaymentListHandler = (output: any) => {
    setTimeout(() => {
      this.getMSFCashfreeLinkPaymentList();
    }, 1000);
  };

  public getEMandateListHandler = () => {
    setTimeout(() => {
      this.getEMandateList();
    }, 1000);
  };

  public getExceptionTakenListHandler = () => {
    setTimeout(() => {
      this.getExceptionTakenList();
    }, 1000);
  };

  mounted() {
    this.findClPersonalInfo();
    this.getFiCreditorInfo();
    this.getBudgetInfo();
    this.getFiPaymentPlanInfo();
    this.getFiBankInfo();
    this.getFiDocumentList();
    this.getFiERPDocumentList();
    this.getAllSignAgreementList();
    this.getMSFCashfreeLinkPaymentList();
    this.getEMandateList();
    this.getExceptionTakenList();
    this.getClientFileEnrollmentSummary();

    if (
      this.clientFileSummary.isFirstMSFPaid === true &&
      !this.taskStateTerminated
    ) {
      this.saveAndMarkCompleteTask();
    }

    if(this.clientFileSummary.isFirstMSFPaid === true && !this.taskStateTerminated) {
      this.saveAndMarkCompleteTask();
    }

    Action.Spine.UpdateClPersonalInfo.interested(
      this.findClPersonalInfoHandler
    );

    Action.ClientFile.UpdateCreditInfo.interested(
      this.getClientFileBasicInfoHandler
    );

    Action.Spine.AddCreditor.interested(
      this.getClientCreditorInfoAndInfoHandler
    );

    Action.Spine.AddExperianCreditorListFromPDFParsed.interested(
      this.getClientCreditorInfoAndInfoHandler
    );

    Action.Spine.UpdateCreditor.interested(
      this.getClientCreditorInfoAndInfoHandler
    );

    Action.Spine.RemoveCreditor.interested(
      this.getClientCreditorInfoAndInfoHandler
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
    Action.ClientFile.GenerateAgreement.interested(
      this.getAllSignAgreementListHandler
    );
    Action.ClientFile.ReceiveFirstMSFPayment.interested(
      this.getMSFCashfreeLinkPaymentListHandler
    );
    Action.ClientFile.InitiateEMandate.interested(this.getEMandateListHandler);
    Action.ClientFile.CheckAndUpdateEMandate.interested(
      this.getEMandateListHandler
    );
    Action.ClientFile.UpdateExceptionTakenList.interested(
      this.getExceptionTakenListHandler
    );
  }

  public destroyed() {
    Action.Spine.UpdateClPersonalInfo.notInterested(
      this.findClPersonalInfoHandler
    );

    Action.Spine.AddCreditor.notInterested(
      this.getClientCreditorInfoAndInfoHandler
    );

    Action.Spine.UpdateCreditor.notInterested(
      this.getClientCreditorInfoAndInfoHandler
    );

    Action.Spine.RemoveCreditor.notInterested(
      this.getClientCreditorInfoAndInfoHandler
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

    Action.ClientFile.UpdateCreditInfo.notInterested(
      this.getClientFileBasicInfoHandler
    );
    Action.ClientFile.GenerateAgreement.notInterested(
      this.getAllSignAgreementListHandler
    );
    Action.ClientFile.ReceiveFirstMSFPayment.notInterested(
      this.getMSFCashfreeLinkPaymentListHandler
    );
    Action.ClientFile.InitiateEMandate.notInterested(
      this.getEMandateListHandler
    );
    Action.ClientFile.CheckAndUpdateEMandate.notInterested(
      this.getEMandateListHandler
    );
    Action.ClientFile.UpdateExceptionTakenList.notInterested(
      this.getExceptionTakenListHandler
    );

    Action.Spine.AddExperianCreditorListFromPDFParsed.notInterested(
      this.getClientCreditorInfoAndInfoHandler
    );

    // getEMandateListHandler
  }
  // Confirm AccountNumber => per populate account number to confirm cccount number
  setConfirmAccountNumber() {
    if (this.bankInfoStore) {
      this.taskFormOutput.bankInfo.confirmAccountNumber =
        this.bankInfoStore.accountNumber;
    }
  }

  saveAndMarkCompleteTask() {
    const input = new Data.ClientFile.UpdateExceptionTakenListInput();
    input.exceptionTakenList = this.taskFormData.taskOutput.exceptionTakenList;
    input.exceptionApprovedBy =
      this.taskFormData.taskOutput.exceptionApprovedBy;
    input.clientFileId = this.clientFileId;
    Action.ClientFile.UpdateExceptionTakenList.execute(input, (output) => {
      Task.Action.saveAndMarkCompleteTask({
        taskId: this.taskId,
        taskOutput: this.taskFormData.taskOutput,
      });
    });
  }

  getExceptionTakenList() {
    Action.ClientFile.GetExceptionTakenList.execute1(
      this.clientFileId,
      (output) => {
        // alert('hello')
        this.getExceptionTakenListOutput = output;
        // alert('hello')
        // console.log(this.getExceptionTakenListOutput,"getExceptionTakenListOutput")
      }
    );
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

  getEMandateList() {
    console.log("getEMandateList called");
    Action.ClientFile.GetAllEMandateList.execute1(
      this.clientFileId,
      (output) => {}
    );
  }

  getClientFileBasicInfo() {
    Action.ClientFile.GetClientFileBasicInfo.execute1(
      this.clientFileBasicInfo.clientFileNumber,
      (output) => {}
    );
  }

  getClientCreditorInfoAndInfo() {
    this.getClientFileBasicInfo();
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

  getFiERPDocumentList() {
    Action.ClientFile.GetErpDocumentList.execute1(
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

  getAllSignAgreementList() {
    Action.ClientFile.GetAllSignAgreementList.execute1(
      this.clientFileId,
      (output) => {}
    );
  }

  getMSFCashfreeLinkPaymentList() {
    Action.ClientFile.GetMSFCashfreeLinkPaymentList.execute1(
      this.clientFileId,
      (output) => {}
    );
  }

   getClientFileEnrollmentSummary() {
    Action.ClientFile.GetClientFileEnrollmentSummary.execute1(
      this.clientFileBasicInfo.clientBasicInfo.clientId,
      (output) => {}
    );
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
