<template>
  <div>
    <template v-if="!taskStateTerminated">
      <component
        :ref="stepperMetaData.myRefName"
        :is="stepperMetaData.componentName"
        :value="selectModel(taskFormData, undefined)"
        @input="(newValue) => updateModel(taskFormData, newValue, undefined)"
        v-bind="stepperMetaData.props"
      ></component>
    </template>
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
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import ModelVue from "@/components/generic/ModelVue";
import Task from "@/section/spineapp/util/Task";
import Helper from "@/section/spineapp/util/Helper";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";
import MCITFStepperMDP from "./MCITFStepperMDP";
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

  populateBankDetails(details: any) {
    this.taskFormData.taskOutput.bankInfo.bankAddress.addressLine1 =
      details.ADDRESS;
    this.taskFormData.taskOutput.bankInfo.bankAddress.city = details.CITY;
    this.taskFormData.taskOutput.bankInfo.bankAddress.state = details.STATE;
    this.taskFormData.taskOutput.bankInfo.bankAddress.country = "India";
  }

  mounted() {
    this.getNupayBankMasterList();
    this.findClientInfo();
    this.getFiCreditorInfo();
    this.getBudgetInfo();
    this.getFiPaymentPlanInfo();
    this.getFiBankInfo();
    this.getFiDocumentList();

    Action.Spine.UpdateClPersonalInfo.interested((output) => {
      setTimeout(() => {
        this.findClientInfo();
      }, 1000);
    });

    Action.Spine.AddCreditor.interested((output) => {
      setTimeout(() => {
        this.getFiCreditorInfo();
      }, 1000);
    });
    Action.Spine.UpdateCreditor.interested((output) => {
      setTimeout(() => {
        this.getFiCreditorInfo();
      }, 1000);
    });
    Action.Spine.RemoveCreditor.interested((output) => {
      setTimeout(() => {
        this.getFiCreditorInfo();
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
        this.findClientInfo();
      }, 1000);
    });

    Action.Spine.AddCreditor.notInterested((output) => {
      setTimeout(() => {
        this.getFiCreditorInfo();
      }, 1000);
    });

    Action.Spine.UpdateCreditor.notInterested((output) => {
      setTimeout(() => {
        this.getFiCreditorInfo();
      }, 1000);
    });
    Action.Spine.RemoveCreditor.notInterested((output) => {
      setTimeout(() => {
        this.getFiCreditorInfo();
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
      this.getFiBankInfo();
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

  get taskStateTerminated() {
    return (
      this.taskDetails.taskState === "COMPLETED" ||
      this.taskDetails.taskState === "FORCE_COMPLETED" ||
      this.taskDetails.taskState === "CANCELLED" ||
      this.taskDetails.taskState === "RESET"
    );
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
