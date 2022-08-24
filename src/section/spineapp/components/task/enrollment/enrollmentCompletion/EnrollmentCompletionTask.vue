<template>
  <div>
    <!-- <h4>EnrollmentCompletionTask</h4> -->
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
import * as Action from "@/../src-gen/action";
import * as RemoteApiPoint from "@/remote-api-point";
import FStepper from "@/components/generic/FStepper.vue";
import FBtn from "@/components/generic/FBtn.vue";
import ModelVue from "@/components/generic/ModelVue";
import moment from "moment";
import EnrollmentCompletionTaskIntf from "./EnrollmentCompletionTaskIntf";
import ECTFStepperMDP from "./ECTFStepperMDP";
import Task from "@/section/spineapp/util/Task";
@Component({
  components: {
    FStepper,
    FBtn,
  },
})
export default class EnrollmentCompletionTask
  extends ModelVue
  implements EnrollmentCompletionTaskIntf
{
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  taskId = this.$route.params.taskId;

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
  taskFormOutputLocal: any = {}; // Initialize Task Output

  get taskFormOutput() {
    return this.taskFormOutputLocal;
  }

  set taskFormOutput(newValue) {
    this.taskFormOutputLocal = newValue;
  }
  //Task Output

  //DATA

  //METADATA
  get stepperMetaData() {
    return new ECTFStepperMDP({ taskRoot: this }).getMetaData();
  }
  //METADATA
  get taskDisabled(): boolean {
    return !Task.isTaskActionable(this.taskDetails.taskState);
  }

  //DATA

  //ACTION
  saveAndMarkCompleteTask() {
    Task.Action.saveAndMarkCompleteTask({
      taskId: this.taskId,
      taskOutput: this.taskFormData.taskOutput,
    });
  }

  gotoFile() {
    this.$router.push({
      name: "Root.ClientFile.ClientFileDetails",
      params: { fileId: this.$route.params.fileId },
    });
  }
}
</script>
