<template>
  <div>
    <!-- <h4>GenerateSSADocTask</h4>
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
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import FTaskStepper from "@/components/generic/FTaskStepper.vue";
import FBtn from "@/components/generic/FBtn.vue";
import ModelVue from "@/components/generic/ModelVue";

import GSSADTFStepperMDP from "./GSSADTFStepperMDP";
import Task from "@/section/spineapp/util/Task";
import Helper from "@/section/spineapp/util/Helper";
import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";

@Component({
  components: {
    FTaskStepper,
    FBtn,
  },
})
export default class GenerateSSADocTask extends ModelVue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;
  taskId = this.$route.params.taskId;

  // DATA

  // get taskDetailsOutput() {
  //   return !!this.taskDetails && !!this.taskDetails.taskOutput
  //     ? JSON.parse(this.taskDetails.taskOutput)
  //     : {};
  // }

  // get taskDetailsInput() {
  //   return !!this.taskDetails && !!this.taskDetails.taskInput
  //     ? JSON.parse(this.taskDetails.taskInput)
  //     : {};
  // }

  //METADATA
  get stepperMetaData() {
    return new GSSADTFStepperMDP({ taskRoot: this }).getMetaData();
  }
  //METADATA

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
  taskFormOutputLocal: Data.Spine.GenerateSSADocOutput = new Data.Spine.GenerateSSADocOutput(); // Initialize Task Output

  get taskFormOutput() {

    if(!this.taskDetails.isOutputEmpty) {
    this.taskFormOutputLocal = Data.Spine.GenerateSSADocOutput.fromJson(this.taskDetails.outputJson);
    }
    // this.taskFormOutputLocal.docId = this.taskDetailsOutput.docId;
    // this.taskFormOutputLocal.templateCode = this.taskDetailsOutput.templateCode;
    return this.taskFormOutputLocal;
  }

  set taskFormOutput(newValue) {
    this.taskFormOutputLocal = newValue;
  }
  //Task Output

  mounted() {
    Action.TaskList.Rescue.interested(this.getExecutiveTaskDetailsHandler);
  }

  public destroyed() {
    Action.TaskList.Rescue.notInterested(this.getExecutiveTaskDetailsHandler);
  }

  getExecutiveTaskDetailsHandler = (output: any) => {
     setTimeout(() => {
        this.getExecutiveTaskDetails();
      }, 1000);
  }

  getExecutiveTaskDetails() {
    Action.TaskList.GetExecutiveTaskDetails.execute1(
      this.$route.params.taskId,
      (output) => {
      }
    );
  }

  //DATA
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

  get taskDisabled(): boolean {
    return Task.isTaskNotActionable(this.taskDetails.taskState, this.taskDetails.isSuspended);
  }
}
</script>

<style></style>
