<template>
  <div>
    <!-- Root Data : {{ taskFormData}} -->

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
import FTaskStepper from "@/components/generic/FTaskStepper.vue";

import FBtn from "@/components/generic/FBtn.vue";
import ModelVue from "@/components/generic/ModelVue";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";
import NMSFFStepperMDP from "./NMSFFStepperMDP";
import Task from "@/section/spineapp/util/Task";
import Helper from "@/section/spineapp/util/Helper";
import { NsfMSFOptions } from "./step1/NMSFTFFormMDP";
import CFSummary from "@/section/spineapp/views/file/CFSummary.vue";

@Component({
  components: {
    FTaskStepper,
    FBtn,
  },
})
export default class NsfMSFTask extends ModelVue implements ManualTaskIntf {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  @Store.Getter.ClientFile.ClientFileSummary.fileSummary
  fileSummary: Data.ClientFile.FileSummary;

  taskId = this.$route.params.taskId;

  //METADATA
  get stepperMetaData() {
    return new NMSFFStepperMDP({ taskRoot: this }).getMetaData();
  }
  //METADATA

  selectedNMSFTaskOption() {
    return this.taskFormData.taskOutput.selectedNMSFTaskOption;
  }

  // DATA
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

  //FORM

  taskFormDataLocal: any = {
    taskInput: {},
    taskOutput: {},
  };

  get taskFormData() {
    return {
      taskInput: this.taskDetails.inputJson,
      taskOutput: this.taskFormOutput,
    };
  }

  set taskFormData(value: any) {
    this.taskFormDataLocal = value;
  }
  //FORM

  //Task Output
  taskFormOutputLocal: any = new Data.Spine.NsfMSFTaskOutput();

  get taskFormOutput() {
    // if (Task.isTaskOutputAvailable(this.taskDetailsOutput)) {
    //   this.taskFormOutputLocal = { ...this.taskDetailsOutput };
    // } else {
    //   this.taskFormOutputLocal = new Data.Spine.NsfMSFTaskOutput();
    //   this.taskFormOutputLocal.amountToBeReceived = this.fileSummary.msfAmount;
    // }
    return this.taskFormOutputLocal;
  }

  set taskFormOutput(newValue) {
    this.taskFormOutputLocal = newValue;
  }
  //Task Output

  //DATA

  get taskDisabled(): boolean {
    return Task.isTaskNotActionable(this.taskDetails.taskState, this.taskDetails.isSuspended);
  }

  //ACTION
  saveAndMarkCompleteTask() {
    Task.Action.saveAndMarkCompleteTask({
      taskId: this.taskId,
      taskOutput: this.taskFormData.taskOutput,
    });
  }

  saveTask(successCallBack = () => {}) {
    this.taskFormOutput.manualPayment =
      this.taskFormOutput.selectedNMSFTaskOption === "Receive Payment";
    // this.taskFormOutput.answered = !(
    //   this.taskFormOutput.selectedNMSFTaskOption === "System Deferred"
    // );
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

  saveAndNext() {
    Task.Action.saveTask({
      taskId: this.taskId,
      taskOutput: this.taskFormData.taskOutput,
      callback: () => {
        this.goToStep(this.currentStep + 1);
      },
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

  get currentStep(): number {
    return this.$route.query.step ? Number(this.$route.query.step) : 0;
  }
}
</script>

        <style></style>