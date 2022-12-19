<template>
  <div class="createEMandateTask">
    <!-- Root Data : {{ taskFormData }}  -->
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
import { Component } from "vue-property-decorator";
import * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";

import ModelVue from "@/components/generic/ModelVue";
import Task from "@/section/spineapp/util/Task";

import FTaskStepper from "@/components/generic/FTaskStepper.vue";
import CEMTFStepperMDP from "./CEMTFStepperMDP";

@Component({
  components: {
    FTaskStepper,
  },
})
export default class CreateEMandateTask extends ModelVue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetailsStore: Data.TaskList.ExecutiveTaskDetails;

  taskId = this.$route.params.taskId;

  // METADATA
  get stepperMetaData() {
    return new CEMTFStepperMDP({ taskRoot: this }).getMetaData();
  }
  // METADATA

  // Parse JSON String => As taskOutput and taskInput comes as Json String
  get taskDetailsOutput() {
    return !!this.taskDetailsStore && !!this.taskDetailsStore.taskOutput
      ? JSON.parse(this.taskDetailsStore.taskOutput)
      : {};
  }

  get taskDetailsInput() {
    return !!this.taskDetailsStore && !!this.taskDetailsStore.taskInput
      ? JSON.parse(this.taskDetailsStore.taskInput)
      : {};
  }

  // ModelValue
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

  taskFormOutputLocal: any = new Data.Spine.CreateEMandateTaskOutput();
  get taskFormOutput() {
    if (
      this.taskDetailsOutput.eMandateLink &&
      this.taskDetailsOutput.eMandateId
    ) {
      this.taskFormOutputLocal.eMandateLink =
        this.taskDetailsOutput.eMandateLink;
      this.taskFormOutputLocal.eMandateId = this.taskDetailsOutput.eMandateId;
    }

    return this.taskFormOutputLocal;
  }

  set taskFormOutput(newValue) {
    this.taskFormOutputLocal = newValue;
  }

  get taskDisabled(): boolean {
    return Task.isTaskNotActionable(this.taskDetailsStore.taskState, this.taskDetailsStore.isSuspended);
  }

  mounted() {
    Action.TaskList.Rescue.interested((output) => {
      setTimeout(() => {
        this.getExecutiveTaskDetails();
      }, 1000);
    });
  }

  public destroyed() {
    Action.TaskList.Rescue.notInterested((output) => {
      setTimeout(() => {
        this.getExecutiveTaskDetails();
      }, 1000);
    });
  }

  getExecutiveTaskDetails() {
    Action.TaskList.GetExecutiveTaskDetails.execute1(
      this.$route.params.taskId,
      (output) => {}
    );
  }
}
</script>
