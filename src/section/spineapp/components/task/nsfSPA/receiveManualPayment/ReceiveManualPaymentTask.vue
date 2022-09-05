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
import * as Action from "@/../src-gen/action";
import * as RemoteApiPoint from "@/remote-api-point";
import FStepper from "@/components/generic/FStepper.vue";
import FBtn from "@/components/generic/FBtn.vue";
import ModelVue from "@/components/generic/ModelVue";
import moment from "moment";
import FlowTaskIntf from "@/section/spineapp/util/task_intf/FlowTaskIntf";
import Task from "@/section/spineapp/util/Task";
import Helper from "@/section/spineapp/util/Helper";
import NSPARMPTFStepperMDP from "@/section/spineapp/components/task/nsfSPA/receiveManualPayment/NSPARMPTFStepperMDP";

@Component({
  components: {
    FStepper,
    FBtn,
  },
})
export default class ReceiveManualPaymentTask
  extends ModelVue
  implements FlowTaskIntf
{
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  taskId = this.$route.params.taskId;

  //METADATA
  get stepperMetaData() {
    return new NSPARMPTFStepperMDP({ taskRoot: this }).getMetaData();
  }
  //METADATA

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
  taskFormOutputLocal: any = new Data.Spine.ReceiveManualPaymentTaskOutput();

  get taskFormOutput() {
    if (this.taskDetailsOutput.paymentSuccessfull) {
      this.taskFormOutputLocal.paymentSuccessfull =
        this.taskDetailsOutput.paymentSuccessfull;
    }
    if (this.taskDetailsOutput.failureCode) {
      this.taskFormOutputLocal.failureCode = this.taskDetailsOutput.failureCode;
    }
    if (this.taskDetailsOutput.failureReason) {
      this.taskFormOutputLocal.failureReason =
        this.taskDetailsOutput.failureReason;
    }
    return this.taskFormOutputLocal;
  }

  set taskFormOutput(newValue) {
    this.taskFormOutputLocal = newValue;
  }
  //Task Output

  get taskDisabled(): boolean {
    return Task.isTaskNotActionable(this.taskDetails.taskState);
  }

  //DATA

  //ACTION

  rescueTask() {
    Task.Action.rescueTask({
      taskId: this.taskId,
      taskOutput: this.taskFormData.taskOutput,
    });
  }
  forceCompleteTask() {
    Task.Action.forceCompleteTask({
      taskId: this.taskId,
      taskOutput: this.taskFormData.taskOutput,
    });
  }

  gotoFile() {
    Helper.Router.gotoFile({
      router: this.$router,
      fileId: this.$route.params.fileId,
    });
  }
}
</script>
