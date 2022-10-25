<template>
  <div>
    <!-- <h4>CollectClientProfileInfoTask</h4> -->
    <!-- Root Data : {{ taskFormData.taskOutput.paymentPlan }} -->
    <!-- {{bankInfoStore}} -->
    <component
      :ref="stepperMetaData.myRefName"
      :is="stepperMetaData.componentName"
      :value="selectModel(taskFormData, undefined)"
      @input="(newValue) => updateModel(taskFormData, newValue, undefined)"
      v-bind="stepperMetaData.props"
    ></component>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";

import CCITFStepperMDP from "./CCITFStepperMDP";
import ModelVue from "@/components/generic/ModelVue";
import moment from "moment";

import Task from "@/section/spineapp/util/Task";
import Helper from "@/section/spineapp/util/Helper";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";
import FBtnMDP from "@/components/generic/FBtnMDP";
import FBtn from "@/components/generic/FBtn.vue";
import FTaskStepper from "@/components/generic/FTaskStepper.vue";

@Component({
  components: {
    "f-btn": FBtn,
    FTaskStepper,
  },
})
export default class CollectClientInfoTask
  extends ModelVue
  implements ManualTaskIntf
{
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  // new store Add
  @Store.Getter.ClientFile.ClientFileSummary.personalInfo
  personalInfoStore: Data.ClientFile.ClPersonalInfo;

  @Store.Getter.ClientFile.ClientFileSummary.fiCreditorInfo
  fiCreditorStore: Data.ClientFile.FiCreditor;

  @Store.Getter.ClientFile.ClientFileSummary.budgetInfo
  budgetInfoStore: Data.ClientFile.BudgetInfo;

  @Store.Getter.ClientFile.ClientFileSummary.fiPaymentPlanInfo
  fiPaymentPlanInfoStore: Data.ClientFile.FiPaymentPlanInfo;

  @Store.Getter.ClientFile.ClientFileSummary.fiBankInfo
  bankInfoStore: Data.ClientFile.FiBankInfo;

  @Store.Getter.ClientFile.ClientFileSummary.fiDocumentList
  fiDocumentListStore: Data.ClientFile.FiDocument;

  taskId = this.$route.params.taskId;

  nupayBankMasterList: Data.ClientFile.NupayBankMaster[] = [];

  getNupayBankMasterList() {
    Action.ClientFile.GetNupayBankMasterList.execute((output) => {
      this.nupayBankMasterList = output.nupayBankMasterList;
    });
  }
  get taskDetailsOutput() {
    return !!this.taskDetails && !!this.taskDetails.taskOutput
      ? JSON.parse(this.taskDetails.taskOutput)
      : {};
  }

  get taskDetailsInput() {
    return !!this.taskDetails && !!this.taskDetails.taskInput
      ? JSON.parse(this.taskDetails.taskInput)
      : {};
  }

  taskFormDataLocal: any = { taskInput: {}, taskOutput: {} };
  taskFormOutputLocal: Data.Spine.CollectClientInfoTask =
    new Data.Spine.CollectClientInfoTask();
  get taskFormData() {
    return {
      taskInput: this.taskDetailsInput,
      taskOutput: this.taskFormOutput,
    };
  }

  set taskFormData(value: any) {
    this.taskFormDataLocal = value;
  }
  get taskFormOutput() {
    this.taskFormOutputLocal = {
      ...this.taskDetailsOutput,
      personalInfo: this.personalInfoStore || new Data.Spine.PersonalInfo(),
      creditorInfo: this.fiCreditorStore || new Data.Spine.CreditorInfo(),
      budgetInfo: this.budgetInfoStore || new Data.Spine.BudgetInfo(),
      bankInfo: this.bankInfoStore || new Data.Spine.BankInfo(),
      paymentPlan: this.fiPaymentPlanInfoStore || new Data.Spine.PaymentPlan(),
      fileDocumentList: this.fiDocumentListStore || [],
      needVerification: this.taskDetailsOutput.needVerification,
    };
    return this.taskFormOutputLocal;
  }

  set taskFormOutput(newVal) {
    this.taskFormOutputLocal = newVal;
  }

  get stepperMetaData(): any {
    return new CCITFStepperMDP({
      taskRoot: this,
    }).getMetaData();
  }
  get btnMetaData(): any {
    return new FBtnMDP({
      label: "FILL TEST DATA",
      onClick: this.setTestData,
    }).getMetaData();
  }
  get taskDisabled(): boolean {
    return Task.isTaskNotActionable(this.taskDetails.taskState);
  }
  mounted() {
    this.getNupayBankMasterList();
    this.findClientInfo();
    this.getFiCreditorInfo();
    this.getBudgetInfo();
    this.getFiPaymentPlanInfo();
    this.getFiBankInfo();
    this.getFiDocumentList();
  }

  setConfirmAccountNumber() {
    if (this.taskDetailsOutput.bankInfo) {
      this.taskFormOutput.bankInfo.confirmAccountNumber =
        this.taskDetailsOutput.bankInfo.accountNumber;
    }
  }

  saveAndMarkCompleteTask() {
    Task.Action.saveAndMarkCompleteTask({
      taskId: this.taskId,
      taskOutput: this.taskFormData.taskOutput,
    });
  }
  saveTask(successCallBack = () => {}) {
    Task.Action.saveTask({
      taskId: this.taskId,
      taskOutput: this.taskFormData.taskOutput,
      callback: successCallBack,
    });
  }
  rescueTask() {
    Task.Action.rescueTask({
      taskId: this.taskId,
      taskOutput: this.taskFormData.taskOutput,
    });
  }
  forceCompleteTask() {
    Task.Action.forceCompleteTask({
      taskId: this.taskId,
      taskOutput: this.taskFormData.taskOutput,
    });
  }

  gotoFile() {
    Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: this.$route.params.clientFileNumber,
    });
  }

  //deprecated
  populateBankDetails(details: any) {
    this.taskFormData.taskOutput.bankInfo.bankAddress.addressLine1 =
      details.ADDRESS;
    this.taskFormData.taskOutput.bankInfo.bankAddress.city = details.CITY;
    this.taskFormData.taskOutput.bankInfo.bankAddress.state = details.STATE;
    this.taskFormData.taskOutput.bankInfo.bankAddress.country = "India";
  }

  setTestData() {
    console.log(
      " this.taskFormData.taskOutput.creditorList ==>",
      JSON.stringify(this.taskFormData.taskOutput.creditorInfo.creditorList)
    );
    console.log(" taskDetailsOutput ==>", this.taskDetailsOutput);
    console.log(" taskFormData ==>", this.taskFormData);
    this.taskFormData.taskOutput.personalInfo.gender = "MALE";
    this.taskFormData.taskOutput.personalInfo.secondaryPhone = "1234567654";
    this.taskFormData.taskOutput.personalInfo.fatherName = "Father";
    this.taskFormData.taskOutput.personalInfo.motherMaidenName = "Mother";
    this.taskFormData.taskOutput.personalInfo.firstName = "John";
    this.taskFormData.taskOutput.personalInfo.lastName = "Doe";
    this.taskFormData.taskOutput.personalInfo.pan = "ABCDE1234F";
    this.taskFormData.taskOutput.personalInfo.dob = new Date("09/09/1981");
    this.taskFormData.taskOutput.personalInfo.residentialAddress.addressLine1 =
      "1185, 5th Main Rd, Sector 7, HSR Layout";
    this.taskFormData.taskOutput.personalInfo.residentialAddress.city =
      "Bengaluru";
    this.taskFormData.taskOutput.personalInfo.residentialAddress.country =
      "India";
    this.taskFormData.taskOutput.personalInfo.residentialAddress.pinCode =
      "560102";
    this.taskFormData.taskOutput.personalInfo.residentialAddress.state = "KA";

    this.taskFormData.taskOutput.creditorInfo.creditorList = [
      {
        creditor: "ICICI Bank",
        creditorBalance: 100000,
        lastDateOfPayment: "2022-08-15",
        debtType: "Personal Loans",
        accountNumber: "1234567890",
      },
      {
        creditor: "HDFC Bank",
        creditorBalance: 50000,
        lastDateOfPayment: "2022-08-15",
        debtType: "Credit Card",
        accountNumber: "1111222233334444",
      },
    ];
    this.taskFormData.taskOutput.creditorInfo.totalDebt = 150000;
    this.taskFormData.taskOutput.budgetInfo.hardshipReason = "Business losses.";
    this.taskFormData.taskOutput.budgetInfo.incomeSources.salary = 50000;
    this.taskFormData.taskOutput.budgetInfo.debtRepayments.autoLoan = 10000;
    this.taskFormData.taskOutput.budgetInfo.debtRepayments.housingLoan = 10000;

    this.taskFormData.taskOutput.paymentPlan.ppCalculator.feeFirstDraftDate =
      new Date();
    this.taskFormData.taskOutput.paymentPlan.ppCalculator.firstDraftDate =
      new Date();

    this.taskFormData.taskOutput.bankInfo.accountHolderName = "John Doe";

    this.taskFormData.taskOutput.bankInfo.accountNumber = "1234567890";
    this.taskFormData.taskOutput.bankInfo.accountType = "SAVINGS";
    this.taskFormData.taskOutput.bankInfo.ifscCode = "ICIC0000519";
    this.taskFormData.taskOutput.bankInfo.nupayBankMasterId =
      "63252af87237b82191530250";
    this.taskFormData.taskOutput.bankInfo.bankAddress.addressLine1 =
      "420, 27th Main Rd, 1st Sector, HSR Layout";
    this.taskFormData.taskOutput.bankInfo.bankAddress.city = "Bengaluru";
    this.taskFormData.taskOutput.bankInfo.bankAddress.country = "India";
    this.taskFormData.taskOutput.bankInfo.bankAddress.pinCode = "560102";
    this.taskFormData.taskOutput.bankInfo.bankAddress.state = "KA";
  }

  goToStep(step: number) {
    Helper.Router.gotoStep({
      router: this.$router,
      clientFileNumber: this.$route.params.clientFileNumber,
      step,
      route: this.$route,
    });
  }

  get currentStep(): number {
    return this.$route.query.step ? Number(this.$route.query.step) : 0;
  }

  //New Get API Add
  findClientInfo() {
    //TODO:  Needs to be discussed:
    setTimeout(() => {
      Action.ClientFile.FindPersonalInfo.execute1(
        this.clientFileBasicInfo.clientBasicInfo.clientId,
        (output) => {}
      );
    }, 1000);
  }

  getFiCreditorInfo() {
    Action.ClientFile.GetCreditorInfo.execute1(
      this.clientFileBasicInfo.clientFileId,
      (output) => {}
    );
  }

  getBudgetInfo() {
    Action.ClientFile.GetBudgetInfo.execute1(
      this.clientFileBasicInfo.clientFileId,
      (output) => {}
    );
  }

  getFiPaymentPlanInfo() {
    Action.ClientFile.GetPaymentPlanInfo.execute1(
      this.clientFileBasicInfo.clientFileId,
      (output) => {}
    );
  }

  getFiBankInfo() {
    Action.ClientFile.GetFiBankInfo.execute1(
      this.clientFileBasicInfo.clientFileId,
      (output) => {}
    );
  }

  getFiDocumentList() {
    Action.ClientFile.GetDocumentList.execute1(
      this.clientFileBasicInfo.clientFileId,
      (output) => {}
    );
  }
}
</script>

<style></style>
