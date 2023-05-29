
<template>
<div>
<component 
  :ref="stepperMetaData.myRefName"
  :is="stepperMetaData.componentName"
  :value="selectModel(taskFormData, stepperMetaData.dataSelectorKey)"
  @input="(newValue) => updateModel(taskFormData, newValue, stepperMetaData.dataSelectorKey)"
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
import RPCFTFStepperMDP from "./RPCFTFStepperMDP"
@Component({
  components: {
    FTaskStepper
  },
})
export default class RetainPendingCancelledFileTask extends ModelVue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  taskId = this.$route.params.taskId;

  get stepperMetaData(): any {
    return new RPCFTFStepperMDP({taskRoot: this}).getMetaData();
  }
  
 
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
  taskFormOutputLocal: Data.Spine.RetainPendingCancelledFileTaskOutput = new Data.Spine.RetainPendingCancelledFileTaskOutput();

  get taskFormOutput() {
    
    switch(this.taskFormOutputLocal.reinstateOption) {
      case "reinstate": {
        this.taskFormOutputLocal.reinstate = true;
        this.taskFormOutputLocal.reinstateWithAmendment = false;
      }
      case "reinstateWithAmendment": {
        this.taskFormOutputLocal.reinstateWithAmendment = true;
        this.taskFormOutputLocal.reinstate = false;
      }
      case "cancel" :{
        this.taskFormOutputLocal.reinstateWithAmendment = false;
        this.taskFormOutputLocal.reinstate = false;
      }
    }
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
    this.taskFormData.taskOutput.reinstateOption = undefined;
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

