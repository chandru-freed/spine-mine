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
import moment from "moment";
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

  // new store Add

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;


  @Store.Getter.ClientFile.ClientFileSummary.personalInfo
  personalInfoStore: Data.ClientFile.ClPersonalInfo;

  @Store.Getter.ClientFile.ClientFileSummary.fiCreditorInfo
  fiCreditorStore: Data.ClientFile.FiCreditorInfo;

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

  get clientFileId() {
    return this.$route.params.clientFileId;
  }

  public findClPersonalInfoHandler = (output: any) => {
    setTimeout(() => {
      this.findClPersonalInfo();
    }, 1000);
  };

  public getFiCreditorInfoAndSchedulePPHandler = (output: any) => {
    setTimeout(() => {
      this.getFiCreditorInfoAndSchedulePP();
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
    this.getNupayBankMasterList();
    this.findClPersonalInfo();
    this.getFiCreditorInfo();
    this.getBudgetInfo();
    this.getFiPaymentPlanInfo();
    this.getFiBankInfo();
    this.getFiDocumentList();

    Action.Spine.UpdateClPersonalInfo.interested(
      this.findClPersonalInfoHandler
    );

    Action.ClientFile.AddIncludeFiCreditor.interested(
      this.getFiCreditorInfoAndSchedulePPHandler
    );
    Action.ClientFile.UpdateFiCreditor.interested(
      this.getFiCreditorInfoAndSchedulePPHandler
    );
    Action.Spine.RemoveCreditor.interested(
      this.getFiCreditorInfoAndSchedulePPHandler
    );

    Action.Spine.UpdateBudgetInfo.interested(this.getBudgetInfoHandler);
    Action.Spine.SchedulePaymentPlan.interested(
      this.getFiPaymentPlanInfoHandler
    );
    Action.Spine.UpdateBankInfo.interested(this.getFiBankInfoHandler);
    Action.Spine.AttachDocument.interested(this.getFiDocumentListHandler);
    Action.Spine.DetachDocument.interested(this.getFiDocumentListHandler);
  }

  public destroyed() {
    Action.Spine.UpdateClPersonalInfo.notInterested(
      this.findClPersonalInfoHandler
    );

    Action.ClientFile.AddIncludeFiCreditor.notInterested(
      this.getFiCreditorInfoAndSchedulePPHandler
    );

    Action.ClientFile.UpdateFiCreditor.notInterested(
      this.getFiCreditorInfoAndSchedulePPHandler
    );
    Action.Spine.RemoveCreditor.notInterested(
      this.getFiCreditorInfoAndSchedulePPHandler
    );

    Action.Spine.UpdateBudgetInfo.notInterested(this.getBudgetInfoHandler);

    Action.Spine.SchedulePaymentPlan.notInterested(
      this.getFiPaymentPlanInfoHandler
    );

    Action.Spine.UpdateBankInfo.notInterested(this.getFiBankInfoHandler);

    Action.Spine.AttachDocument.notInterested(this.getFiDocumentListHandler);
    Action.Spine.DetachDocument.notInterested(this.getFiDocumentListHandler);
  }

  setConfirmAccountNumber() {
    if (this.taskDetailsOutput?.bankInfo) {
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
    const taskOutput: any = this.taskDetails.taskOutput?JSON.parse(this.taskDetails.taskOutput): {};
    return !!this.taskDetails && !!this.taskDetails.taskOutput
      ? taskOutput.payload
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

  //FORM

  taskFormDataLocal: any = {
    taskInput: {},
    taskOutput: {},
  };

  get taskFormData() {
    return {
      taskInput: this.taskDetailsInput,
      taskOutput: this.taskFormOutput,
      registrationInfo: this.clientFileBasicInfo.clientBasicInfo
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
        : undefined,
      paymentPlan: this.fiPaymentPlanInfoStore
        ? Data.Spine.PaymentPlan.fromJson(this.fiPaymentPlanInfoStore)
        : new Data.Spine.PaymentPlan(),
      fileDocumentList: this.fiDocumentListStore || [],
      needVerification: this.taskDetailsOutput?.needVerification,
    };
    return this.taskFormOutputLocal;
  }

  set taskFormOutput(newValue) {
    this.taskFormOutputLocal = newValue;
  }
  //Task Output

  //DATA
  get taskDisabled(): boolean {
    return Task.isTaskNotActionable(
      this.taskDetails.taskState,
      this.taskDetails.isSuspended
    );
  }
  //ACTION
  saveAndMarkCompleteTask() {
    const taskOutput = {
      payload: this.taskFormData.taskOutput
    }
    Task.Action.saveAndMarkCompleteTask({
      taskId: this.taskId,
      taskOutput: taskOutput,
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
  findClPersonalInfo() {
    Action.ClientFile.FindClPersonalInfo.execute1(
      this.clientFileId,
      (output) => {}
    );
  }

  getFiCreditorInfo() {
    Action.ClientFile.GetCreditorInfo.execute1(
      this.clientFileId,
      (output) => {}
    );
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
    Action.ClientFile.GetFiBankInfo.execute1(this.clientFileId, (output) => {});
  }

  getFiDocumentList() {
    Action.ClientFile.GetDocumentList.execute1(
      this.clientFileId,
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

  getFiCreditorInfoAndSchedulePP() {
    Action.ClientFile.GetCreditorInfo.execute1(this.clientFileId, (output) => {
      this.schedulePaymentPlan();
    });
  }
}
</script>
<style></style>
