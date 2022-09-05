
<template>
  <div>
    <h4>Manage client info task</h4>
    Root Data : {{ taskFormData }}

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
import ModelVue from "@/components/generic/ModelVue";
import Task from "@/section/spineapp/util/Task";
import Helper from "@/section/spineapp/util/Helper";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";
import MCITFStepperMDP from "./MCITFStepperMDP";
import FStepper from "@/components/generic/FStepper.vue";
@Component({
  components: {
    FStepper
  },
})
export default class ManageClientInfoTask
  extends ModelVue
{
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;
  taskId = this.$route.params.taskId;

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
    return this.taskFormOutput.amendmentNeeded===true
  }
  //FORM

  //Task Output
  
  taskFormOutputLocal: any = new Data.Spine.WelcomeCallManageClientInfoTask();

  get taskFormOutput() {
    if (
      this.taskDetailsOutput.clientInfo &&
      this.taskDetailsOutput.clientInfo.firstName
    ) {
      this.taskFormOutputLocal.clientInfo = this.taskDetailsOutput.clientInfo;
    }

    if (
      this.taskDetailsOutput.creditorInfo &&
      this.taskDetailsOutput.creditorInfo.creditorList
    ) {
      this.taskFormOutputLocal.creditorInfo =
        this.taskDetailsOutput.creditorInfo;
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
    if (this.taskDetailsOutput.cancelRequest) {
      this.taskFormOutputLocal.cancelRequest =
        this.taskDetailsOutput.cancelRequest;
    }

    if (this.taskDetailsOutput.signServiceAgreementNeeded) {
      this.taskFormOutputLocal.signServiceAgreementNeeded =
        this.taskDetailsOutput.signServiceAgreementNeeded;
    }

    if (this.taskDetailsOutput.eMandateNeeded) {
      this.taskFormOutputLocal.eMandateNeeded =
        this.taskDetailsOutput.eMandateNeeded;
    }

    if (this.taskDetailsOutput.amendmentNeeded) {
      this.taskFormOutputLocal.amendmentNeeded =
        this.taskDetailsOutput.amendmentNeeded;
    }
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
  saveTask() {
    Task.Action.saveTask({
      taskId: this.taskId,
      taskOutput: this.taskFormData.taskOutput,
    });
  }
  gotoFile() {
    Helper.Router.gotoFile({
      router: this.$router,
      fileId: this.$route.params.fileId,
    });
  }
  //Action
}
</script>
<style>
</style>