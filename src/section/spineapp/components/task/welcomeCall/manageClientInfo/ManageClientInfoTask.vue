<template>
  <div>
    <!-- <h4>Manage client info task</h4> -->
    <!-- Root Data : {{ taskFormData }} -->
    <!-- <div class="row my-5 mx-5">
      <v-spacer />
      <V-btn @click="setTestData">FILL TEST DATA</V-btn>
    </div> -->

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
import ModelVue from "@/components/generic/ModelVue";
import Task from "@/section/spineapp/util/Task";
import Helper from "@/section/spineapp/util/Helper";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";
import MCITFStepperMDP from "./MCITFStepperMDP";
import FStepper from "@/components/generic/FStepper.vue";
import FFooStepper from "@/components/generic/FFooStepper.vue";
import FTaskStepper from "@/components/generic/FTaskStepper.vue";
@Component({
  components: {
    FTaskStepper,
  },
})
export default class ManageClientInfoTask
  extends ModelVue
  implements ManualTaskIntf
{
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  taskId = this.$route.params.taskId;

  nupayBankMasterList: Data.ClientFile.NupayBankMaster[] = [];
  getNupayBankMasterList() {
    Action.ClientFile.GetNupayBankMasterList.execute((output) => {
      this.nupayBankMasterList = output.nupayBankMasterList;
    });
  }

  populateBankDetails(details: any) {
    this.taskFormData.taskOutput.bankInfo.bankAddress.addressLine1 =
      details.ADDRESS;
    this.taskFormData.taskOutput.bankInfo.bankAddress.city = details.CITY;
    this.taskFormData.taskOutput.bankInfo.bankAddress.state = details.STATE;
    this.taskFormData.taskOutput.bankInfo.bankAddress.country = "India";
  }

  mounted() {
    this.getNupayBankMasterList();
  }

  setConfirmAccountNumber() {
    if (this.taskDetailsOutput.bankInfo) {
      this.taskFormOutput.bankInfo.confirmAccountNumber =
        this.taskDetailsOutput.bankInfo.accountNumber;
    }
  }

  get stepperMetaData(): any {
    return new MCITFStepperMDP({
      taskRoot: this,
    }).getMetaData();
  }
  // DATA
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

  //FORM

  taskFormDataLocal: any = {
    taskInput: {},
    taskOutput: {},
  };

  get taskFormData() {
    return {
      taskInput: this.taskDetailsInput,
      taskOutput: this.taskFormOutput,
    };
  }

  set taskFormData(value: any) {
    this.taskFormDataLocal = value;
  }

  isAmendmentNeeded() {
    return this.taskFormOutput.amendmentNeeded === true;
  }
  //FORM

  //Task Output

  taskFormOutputLocal: any = new Data.Spine.WelcomeCallManageClientInfoTask();

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

  set taskFormOutput(newValue) {
    this.taskFormOutputLocal = newValue;
  }
  //Task Output

  //DATA
  get taskDisabled(): boolean {
    return Task.isTaskNotActionable(this.taskDetails.taskState);
  }
  //ACTION
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

  goToStep(step: number) {
    Helper.Router.gotoStep({
      router: this.$router,
      clientFileNumber: this.$route.params.clientFileNumber,
      step,
      route: this.$route,
    });
  }

  //Action

  setTestData() {
    console.log(
      " this.taskFormData.taskOutput.creditorList ==>",
      JSON.stringify(this.taskFormData.taskOutput.creditorInfo.creditorList)
    );
    console.log(" taskDetailsOutput ==>", this.taskDetailsOutput);
    console.log(" taskFormData ==>", this.taskFormData);
    this.taskFormData.taskOutput.personalInfo.gender = "MALE";
    this.taskFormData.taskOutput.personalInfo.secondaryPhone = "12345676543";
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
    this.taskFormData.taskOutput.bankInfo.name = "ICICI Bank";
    this.taskFormData.taskOutput.bankInfo.bankAddress.addressLine1 =
      "420, 27th Main Rd, 1st Sector, HSR Layout";
    this.taskFormData.taskOutput.bankInfo.bankAddress.city = "Bengaluru";
    this.taskFormData.taskOutput.bankInfo.bankAddress.country = "India";
    this.taskFormData.taskOutput.bankInfo.bankAddress.pinCode = "560102";
    this.taskFormData.taskOutput.bankInfo.bankAddress.state = "KA";
  }
}
</script>
<style></style>
