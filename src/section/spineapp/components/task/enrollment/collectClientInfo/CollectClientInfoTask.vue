<template>
  <div class="collectClientInfoTask">
    <!-- Used in Active State -->
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
import CCITFStepperMDP from "./CCITFStepperMDP";
import moment from "moment";
import Helper from "@/section/spineapp/util/Helper";

@Component({
  components: {
    FTaskStepper,
  },
})
export default class CollectClientInfoTask extends ModelVue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  //Store we are getting task form data
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
  fiDocumentListStore: Data.ClientFile.FiDocument;
  // URl we are getting taskId and clientFileId
  taskId = this.$route.params.taskId;
  clientFileId = this.$route.params.clientFileId;

  // Parse JSON String => As taskOutput and taskInput comes as Json String
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

  // ModelValue =>  Used in Terminated State
  get taskDetailsData() {
    return {
      taskInput: this.taskDetailsInput,
      taskOutput: this.taskDetailsOutput,
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
      taskInput: this.taskDetailsInput,
      taskOutput: this.taskFormOutput,
      taskState: this.taskDetails.taskState,
    };
  }
  set taskFormData(value: any) {
    this.taskFormDataLocal = value;
  }

  taskFormOutputLocal: Data.Spine.CollectClientInfoTask =
    new Data.Spine.CollectClientInfoTask();
  get taskFormOutput() {
    this.taskFormOutputLocal = {
      ...this.taskDetailsOutput,
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

  get taskDisabled(): boolean {
    return Task.isTaskNotActionable(this.taskDetails.taskState);
  }

  mounted() {
    this.findClPersonalInfo();
    this.getFiCreditorInfo();
    this.getBudgetInfo();
    this.getFiPaymentPlanInfo();
    this.getFiBankInfo();
    this.getFiDocumentList();

    Action.Spine.UpdateClPersonalInfo.interested((output) => {
      setTimeout(() => {
        this.findClPersonalInfo();
      }, 1000);
    });

    Action.Spine.AddCreditor.interested((output) => {
      setTimeout(() => {
        this.getFiCreditorInfoAndSchedulePP();
      }, 1000);
    });
    Action.Spine.UpdateCreditor.interested((output) => {
      setTimeout(() => {
        this.getFiCreditorInfoAndSchedulePP();
      }, 1000);
    });
    Action.Spine.RemoveCreditor.interested((output) => {
      setTimeout(() => {
        this.getFiCreditorInfoAndSchedulePP();
      }, 1000);
    });

    Action.Spine.UpdateBudgetInfo.interested((output) => {
      setTimeout(() => {
        this.getBudgetInfo();
      }, 1000);
    });
    Action.Spine.SchedulePaymentPlan.interested((output) => {
      setTimeout(() => {
        this.getFiPaymentPlanInfo();
      }, 1000);
    });
    Action.Spine.UpdateBankInfo.interested((output) => {
      setTimeout(() => {
        this.getFiBankInfo();
      }, 1000);
    });
    Action.Spine.AttachDocument.interested((output) => {
      setTimeout(() => {
        this.getFiDocumentList();
      }, 1000);
    });
    Action.Spine.DetachDocument.interested((output) => {
      setTimeout(() => {
        this.getFiDocumentList();
      }, 1000);
    });
  }

  public destroyed() {
    Action.Spine.UpdateClPersonalInfo.notInterested((output) => {
      setTimeout(() => {
        this.findClPersonalInfo();
      }, 1000);
    });

    Action.Spine.AddCreditor.notInterested((output) => {
      setTimeout(() => {
        this.getFiCreditorInfoAndSchedulePP();
      }, 1000);
    });

    Action.Spine.UpdateCreditor.notInterested((output) => {
      setTimeout(() => {
        this.getFiCreditorInfoAndSchedulePP();
      }, 1000);
    });
    Action.Spine.RemoveCreditor.notInterested((output) => {
      setTimeout(() => {
        this.getFiCreditorInfoAndSchedulePP();
      }, 1000);
    });

    Action.Spine.UpdateBudgetInfo.notInterested((output) => {
      setTimeout(() => {
        this.getBudgetInfo();
      }, 1000);
    });

    Action.Spine.SchedulePaymentPlan.notInterested((output) => {
      setTimeout(() => {
        this.getFiPaymentPlanInfo();
      }, 1000);
    });

    Action.Spine.UpdateBankInfo.notInterested((output) => {
      setTimeout(() => {
        this.getFiBankInfo();
      }, 1000);
    });

    Action.Spine.AttachDocument.notInterested((output) => {
      setTimeout(() => {
        this.getFiDocumentList();
      }, 1000);
    });
    Action.Spine.DetachDocument.notInterested((output) => {
      setTimeout(() => {
        this.getFiDocumentList();
      }, 1000);
    });
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

  getFiCreditorInfoAndSchedulePP() {
    Action.ClientFile.GetCreditorInfo.execute1(this.clientFileId, (output) => {
      this.schedulePaymentPlan();
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
    if(input.ppCalculator.firstDraftDate === '') {
    input.ppCalculator.firstDraftDate = moment()
      .add(2, "days")
      .format(Helper.DATE_FORMAT);
    input.ppCalculator.feeFirstDraftDate = moment()
      .format(Helper.DATE_FORMAT);
    }
      // if(input.ppCalculator.firstDraftDate === '') {
    Action.Spine.SchedulePaymentPlan.execute(
      input,
      (output: any) => {},
      (error) => {}
    );
      // }
  }
}
</script>

<style></style>
