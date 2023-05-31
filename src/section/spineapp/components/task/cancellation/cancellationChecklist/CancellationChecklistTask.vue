
<template>
  <div>
    <component
      :ref="stepperMetaData.myRefName"
      :is="stepperMetaData.componentName"
      :value="selectModel(taskFormData, stepperMetaData.dataSelectorKey)"
      @input="
        (newValue) =>
          updateModel(taskFormData, newValue, stepperMetaData.dataSelectorKey)
      "
      v-bind="stepperMetaData.props"
    ></component>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import ModelVue from "@/components/generic/ModelVue";
import Task from "@/section/spineapp/util/Task";
import Helper from "@/section/spineapp/util/Helper";
import FTaskStepper from "@/components/generic/FTaskStepper.vue";
import CCTFStepperMDP from "./CCTFStepperMDP";
import { cancellationCheckList } from "./CCTFinalStepFFormMDP";
import FSnackbar from "@/fsnackbar";
@Component({
  components: {
    FTaskStepper,
  },
})
export default class CancellationChecklistTask extends ModelVue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;
  taskId = this.$route.params.taskId;
  clientFileId = this.$route.params.clientFileId;

  get stepperMetaData(): any {
    return new CCTFStepperMDP({ taskRoot: this }).getMetaData();
  }

  //FORM

  taskFormDataLocal: any = {
    taskInput: {},
    taskOutput: {},
  };

  get taskDetailsOutput() {
    return !!this.taskDetails && !!this.taskDetails.taskOutput
      ? JSON.parse(this.taskDetails.taskOutput)
      : {};
  }

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
  taskFormOutputLocal: Data.Spine.CancellationChecklistTaskOutput =
    new Data.Spine.CancellationChecklistTaskOutput();

  get taskFormOutput() {
    if(this.taskDetailsOutput.payload) {
    this.taskFormOutputLocal.payload.cancellationCheckList =
      this.taskDetailsOutput.payload.cancellationCheckList;
    this.taskFormOutputLocal.payload.cancellationDetails =
      this.taskDetailsOutput.payload.cancellationDetails;
    }
    return this.taskFormOutputLocal;
  }

  set taskFormOutput(newValue) {
    this.taskFormOutputLocal = newValue;
  }
  //Task Output

  //DATA
  get taskDisabled(): boolean {
    return Task.isTaskNotActionable(
      this.taskDetails.taskState,
      this.taskDetails.isSuspended
    );
  }
  //ACTION
  saveAndMarkCompleteTask() {
    FSnackbar.confirm({
      onConfirm: () => {
        const cancelInput: Data.ClientFile.CancelInput =
          new Data.ClientFile.CancelInput();
        cancelInput.clientFileId = this.clientFileId;
        cancelInput.reasonDetails =
          this.taskFormData.taskOutput?.payload?.cancellationDetails;
        Action.ClientFile.Cancel.execute(cancelInput, (output) => {
          Task.Action.saveAndMarkCompleteTask({
            taskId: this.taskId,
            taskOutput: this.taskFormData.taskOutput,
          });
        });
      },
      message:"Are you sure want to cancel this file.(This will cancel all the tasks related to this file)"
    });
  }
  saveTask() {
    Task.Action.saveTask({
      taskId: this.taskId,
      taskOutput: this.taskFormData.taskOutput,
    });
  }
  checkListNotSuccess() {
    return (
      this.taskFormData.taskOutput.payload.cancellationCheckList.length <
      cancellationCheckList.length
    );
  }

  //Action
}
</script>

