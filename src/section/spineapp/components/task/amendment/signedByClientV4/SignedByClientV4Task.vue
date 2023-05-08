
<template>
<div>
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
import SBCTFStepperMDP from "./SBCV4TFStepperMDP"
import * as Action from "@/../src-gen/action";
@Component({
  components: {
    FTaskStepper
  },
})
export default class SignedByClientV4Task extends ModelVue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;
  taskId = this.$route.params.taskId;

  amendmentDetails: Data.ClientFile.AmendmentDetails =
    new Data.ClientFile.AmendmentDetails();

  mounted() {
    this.getAmendmentDetails();
  }

    getAmendmentDetails() {
    const { amndToken } = this.taskDetails.inputJson as any;
    
    console.log(amndToken, "Amendment Token");
    Action.ClientFile.GetAmendmentDetails.execute1(amndToken, (output) => {
      console.log(output, "output");
      this.amendmentDetails = output.amendmentDetails;
    });
  }

  get stepperMetaData(): any {
    return new SBCTFStepperMDP({taskRoot: this}).getMetaData();
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
  taskFormOutputLocal: any = {};

  get taskFormOutput() {
    this.taskFormOutputLocal.amendmentLink = this.amendmentDetails.amendmentLink;
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
  saveTask() {
    Task.Action.saveTask({
      taskId: this.taskId,
      taskOutput: this.taskFormData.taskOutput,
    });
  }
  
  //Action
}

</script>

