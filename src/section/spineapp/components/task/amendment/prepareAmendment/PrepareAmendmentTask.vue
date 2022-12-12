
<template>
<div>
<!-- Root Data : {{ taskFormData.taskOutput }}  -->
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
import PATFStepperMDP from "./PATFStepperMDP"
import * as Action from "@/../src-gen/action";
@Component({
  components: {
    FTaskStepper
  },
})
export default class PrepareAmendmentTask extends ModelVue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  // Creditor Info
  @Store.Getter.ClientFile.ClientFileSummary.fiCreditorInfo
  fiCreditorStore: Data.ClientFile.FiCreditorInfo;

  clientFileId = this.$route.params.clientFileId;

  taskId = this.$route.params.taskId;

  get stepperMetaData(): any {
    return new PATFStepperMDP({taskRoot: this}).getMetaData();
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
  taskFormOutputLocal: Data.Spine.AmendmentTaskOutput = new Data.Spine.AmendmentTaskOutput();

  get taskFormOutput() {
    console.log(this.taskDetails.isOutputEmpty)
    if(this.taskDetails.isOutputEmpty) {
      this.taskFormOutputLocal.newCreditorInfo = (this.taskDetails.inputJson as any).existingCreditorInfo 
      this.taskFormOutputLocal.newPaymentPlan = (this.taskDetails.inputJson as any).existingPaymentPlan;
    } else {
      this.taskFormOutputLocal  = Data.Spine.AmendmentTaskOutput.fromJson(this.taskDetails.outputJson);
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

    get taskStateTerminated() {
    return (
      this.taskDetails.taskState === "COMPLETED" ||
      this.taskDetails.taskState === "FORCE_COMPLETED" ||
      this.taskDetails.taskState === "CANCELLED" ||
      this.taskDetails.taskState === "RESET"
    );
  }
  //ACTION


  mounted() {
    this.getFiCreditorInfo();
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
  
   getFiCreditorInfo() {
    Action.ClientFile.GetCreditorInfo.execute1(this.clientFileId, (output) => {
      // this.schedulePaymentPlan();
    });
  }

  //Action
}

</script>

