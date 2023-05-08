
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
import * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import ModelVue from "@/components/generic/ModelVue";
import Task from "@/section/spineapp/util/Task";
import Helper from "@/section/spineapp/util/Helper";
import FTaskStepper from "@/components/generic/FTaskStepper.vue";
import FUAEMTV4FStepperMDP from "./FUAEMTV4FStepperMDP"
@Component({
  components: {
    FTaskStepper
  },
})
export default class FollowUpAmendmentEMandateV4Task extends ModelVue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;
  taskId = this.$route.params.taskId;
  clientFileId = this.$route.params.clientFileId;

  get stepperMetaData(): any {
    return new FUAEMTV4FStepperMDP({taskRoot: this}).getMetaData();
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

  mounted() {
    this.getEMandateList();

    Action.ClientFile.InitiateEMandate.interested(this.getEMandateListHandler);
    Action.ClientFile.CheckAndUpdateEMandate.interested(
      this.getEMandateListHandler
    );
  }

  destroyed() {
    Action.ClientFile.InitiateEMandate.notInterested(this.getEMandateListHandler);
    Action.ClientFile.CheckAndUpdateEMandate.notInterested(
      this.getEMandateListHandler
    );
  }

    getEMandateList() {
    console.log("getEMandateList called");
    Action.ClientFile.GetAllEMandateList.execute1(
      this.clientFileId,
      (output) => {}
    );
  }
  set taskFormData(value: any) {
    this.taskFormDataLocal = value;
  }
  //FORM

  //Task Output
  taskFormOutputLocal: any = {};

  get taskFormOutput() {
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


  public getEMandateListHandler = () => {
    setTimeout(() => {
      this.getEMandateList();
    }, 1000);
  };
  
  //Action
}

</script>

