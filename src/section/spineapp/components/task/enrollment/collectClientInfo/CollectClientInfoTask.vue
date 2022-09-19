<template>
  <div>
    <!-- <h4>CollectClientProfileInfoTask</h4> -->
    <!-- Root Data : {{ taskFormData }} -->
    <!-- <f-text-field v-model="testLocal" label="First Name" ></f-text-field> -->
    <!-- <kbd> {{ testMetaData }}</kbd> -->

    <div class="row my-5 mx-5">
      <v-spacer />
      <V-btn @click="setTestData">FILL TEST DATA</V-btn>
    </div>
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

import FStepper from "@/components/generic/FStepper.vue";
import CCITFStepperMDP from "./CCITFStepperMDP";
import FBtn from "@/components/generic/FBtn.vue";
import ModelVue from "@/components/generic/ModelVue";
import moment from "moment";

import Task from "@/section/spineapp/util/Task";
import Helper from "@/section/spineapp/util/Helper";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";

@Component({
  components: {
    FStepper,
    FBtn,
  },
})
export default class CollectClientInfoTask
  extends ModelVue
  implements ManualTaskIntf
{
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

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

  get taskFormData() {
    return {
      taskInput: this.taskDetailsInput,
      taskOutput: this.taskFormOutput,
    };
  }

  set taskFormData(value: any) {
    this.taskFormDataLocal = value;
  }

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

  get stepperMetaData(): any {
    return new CCITFStepperMDP({
      taskRoot: this,
    }).getMetaData();
  }

  get taskDisabled(): boolean {
    return Task.isTaskNotActionable(this.taskDetails.taskState);
  }
  mounted() {
    this.getNupayBankMasterList();
  }
  saveAndMarkCompleteTask() {
    Task.Action.saveAndMarkCompleteTask({
      taskId: this.taskId,
      taskOutput: this.taskFormData.taskOutput,
    });
  }
  saveTask() {
    Task.Action.saveTask({
      taskId: this.taskId,
      taskOutput: this.taskFormData.taskOutput,
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
    this.taskFormData.taskOutput.personalInfo.secondaryPhone = "12345676543";
    this.taskFormData.taskOutput.personalInfo.fatherName = "Father";
    this.taskFormData.taskOutput.personalInfo.motherMaidenName = "Mother";
    this.taskFormData.taskOutput.personalInfo.firstName = "John";
    this.taskFormData.taskOutput.personalInfo.lastName = "Doe";
    this.taskFormData.taskOutput.personalInfo.pan = "ABCDE1234F";
    this.taskFormData.taskOutput.personalInfo.dob = "09-09-1981";
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
    this.taskFormData.taskOutput.creditorInfo.totalDebtAmount = 150000;
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
}
</script>

<style></style>
