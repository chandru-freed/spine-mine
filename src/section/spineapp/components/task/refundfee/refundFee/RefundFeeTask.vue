
<template>
<div>
<h4>Fill The Task Name</h4>
<!-- Root Data : {{ taskFormData }} --> 
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
import FTaskStepper from "@/components/generic/FTaskStepper.vue";
import RFTFStepperMDP from "./RFTFStepperMDP"
@Component({
  components: {
    FTaskStepper,
  },
})
export default class RefundFeeTask extends ModelVue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;
  taskId = this.$route.params.taskId;

  get stepperMetaData(): any {
    return new RFTFStepperMDP({taskRoot: this}).getMetaData();
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
  //FORM

  //Task Output
  taskFormOutputLocal: Data.Spine.RefundFeeOutput = new Data.Spine.RefundFeeOutput();

  get taskFormOutput() {
    console.log(this.taskDetailsOutput)
    this.taskFormOutputLocal = {
      ...this.taskDetailsOutput
    }
    return this.taskFormOutputLocal;
  }

  set taskFormOutput(newValue) {
    this.taskFormOutputLocal = newValue;
  }

  isRefundSuccessfull() {
    return this.taskFormData.taskOutput.refundSuccessful === true
  }

  isRefundFailed() {
    return this.taskFormData.taskOutput.refundSuccessful === false
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
  
  //Action
}

</script>

