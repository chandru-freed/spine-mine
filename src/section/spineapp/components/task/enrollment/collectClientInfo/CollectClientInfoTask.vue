<template>
  <div>
    <!-- <h4>CollectClientProfileInfoTask</h4> -->
    <!-- Root Data : {{ taskFormData }} -->
    <!-- <f-text-field v-model="testLocal" label="First Name" ></f-text-field> -->
    <!-- <kbd> {{ testMetaData }}</kbd> -->

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
import * as RemoteApiPoint from "@/remote-api-point";
import FStepper from "@/components/generic/FStepper.vue";
import CCITFStepperMDP from "./CCITFStepperMDP";
import FBtn from "@/components/generic/FBtn.vue";
import ModelVue from "@/components/generic/ModelVue";
import moment from "moment";
import { GenericTaskIntf } from "@/section/spineapp/util/GenericTaskIntf";
import Task from "@/section/spineapp/util/Task";
import Helper from "@/section/spineapp/util/Helper";

@Component({
  components: {
    FStepper,
    FBtn,
  },
})
export default class CollectClientInfoTask
  extends ModelVue
  implements GenericTaskIntf
{
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  taskId = this.$route.params.taskId;

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
}
</script>

<style></style>
