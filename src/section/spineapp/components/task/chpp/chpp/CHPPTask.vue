<template>
  <div>
    <!-- <h4>CHPP</h4>
    Root Data : {{ taskFormData }} -->
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
import * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";

import FBtn from "@/components/generic/FBtn.vue";
import ModelVue from "@/components/generic/ModelVue";
import Task from "@/section/spineapp/util/Task";
import Helper from "@/section/spineapp/util/Helper";
import CHPPFStepperMDP from "./CHPPFStepperMDP";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";
import FTaskStepper from "@/components/generic/FTaskStepper.vue";

@Component({
  components: {
    FBtn,
    FTaskStepper,
  },
})
export default class CHPPTask extends ModelVue implements ManualTaskIntf {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  // Document List
  @Store.Getter.ClientFile.ClientFileSummary.fiDocumentList
  fiDocumentListStoreLocal: Data.ClientFile.FiDocument[];

  taskId = this.$route.params.taskId;
  clientFileId = this.$route.params.clientFileId;

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
  //FORM

  //Task Output
  taskFormOutputLocal: any = new Data.Spine.CHPPTaskOutput();

  get taskFormOutput() {
    const fiDocumentListCHPP = this.fiDocumentListStoreLocal.filter((task) => {
      return task.documentType === "CHPP";
    });
    this.taskFormOutputLocal = {
      ...this.taskDetailsOutput,
      creditorInfo:
        this.taskDetailsOutput.creditorInfo ||
        new Data.Spine.CHPPCreditorInfo(),
      fileDocumentList: fiDocumentListCHPP || [],
    };
    return this.taskFormOutputLocal;
  }

  set taskFormOutput(newValue) {
    this.taskFormOutputLocal = newValue;
  }
  //Task Output

  //DATA

  //METADATA
  get stepperMetaData() {
    return new CHPPFStepperMDP({ taskRoot: this }).getMetaData();
  }
  //METADATA

  get taskDisabled(): boolean {
    return Task.isTaskNotActionable(
      this.taskDetails.taskState,
      this.taskDetails.isSuspended
    );
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

  saveAndNext() {
    Task.Action.saveTask({
      taskId: this.taskId,
      taskOutput: this.taskFormData.taskOutput,
      callback: () => {
        this.goToStep(this.currentStep + 1);
      },
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

  get currentStep(): number {
    return this.$route.query.step ? Number(this.$route.query.step) : 0;
  }

  mounted() {
    this.getFiDocumentList();
  }

  getFiDocumentList() {
    Action.ClientFile.GetDocumentList.execute1(
      this.clientFileId,
      (output) => {}
    );
  }
}
</script>
<style></style>
