<template>
  <div class="GenericTask">
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

import ModelVue from "@/components/generic/ModelVue";
import Task from "@/section/spineapp/util/Task";

import FTaskStepper from "@/components/generic/FTaskStepper.vue";
import moment from "moment";
import Helper from "@/section/spineapp/util/Helper";
import GenericTaskFStepperMDP from "./GenericTaskFStepperMDP";

@Component({
  components: {
    FTaskStepper,
  },
})
export default class GenericTask extends ModelVue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  //Store we are getting task form data

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  // URl we are getting taskId and clientFileId
  taskId = this.$route.params.taskId;
  clientFileId = this.$route.params.clientFileId;

  // ModelValue =>  Used in Terminated State
  get taskDetailsData() {
    return {
      taskInput: this.taskDetails.inputJson,
      taskOutput: this.taskDetails.outputJson,
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
      taskInput: this.taskDetails.inputJson,
      taskOutput: this.taskFormOutput,
      taskState: this.taskDetails.taskState,
    };
  }
  set taskFormData(value: any) {
    this.taskFormDataLocal = value;
  }

  taskFormOutputLocal: any = new Data.Spine.CollectClientInfoTask();
  get taskFormOutput() {
    return this.taskFormOutputLocal;
  }

  set taskFormOutput(newVal) {
    this.taskFormOutputLocal = newVal;
  }

  get stepperMetaData(): any {
    return new GenericTaskFStepperMDP({
      taskRoot: this,
    }).getMetaData();
  }

  get taskDisabled(): boolean {
    return Task.isTaskNotActionable(
      this.taskDetails.taskState,
      this.taskDetails.isSuspended
    );
  }

  saveAndMarkCompleteTask() {
    Task.Action.saveAndMarkCompleteTask({
      taskId: this.taskId,
      taskOutput: this.taskFormData.taskOutput,
    });
  }
}
</script>

<style></style>
