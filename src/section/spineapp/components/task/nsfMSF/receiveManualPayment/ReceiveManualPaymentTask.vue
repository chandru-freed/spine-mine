<template>
  <div>
    <!-- {{taskFormData}} -->
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
import moment from "moment";
import FlowTaskIntf from "@/section/spineapp/util/task_intf/FlowTaskIntf";
import Task from "@/section/spineapp/util/Task";
import Helper from "@/section/spineapp/util/Helper";
// import * as Snackbar from "node-snackbar";
import RMPTFStepperMDP from "@/section/spineapp/components/task/nsfMSF/receiveManualPayment/RMPTFStepperMDP";
import FSnackbar from "@/fsnackbar";

@Component({
  components: {
    FTaskStepper,
    FBtn,
  },
})
export default class ReceiveManualPaymentTask extends ModelVue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  @Store.Getter.ClientFile.ClientFileSummary.fileSummary
  fileSummary: Data.ClientFile.FileSummary;

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  receiveMSFPaymentInput = new Data.Spine.ReceiveMSFPaymentInput();

  taskId = this.$route.params.taskId;

  //METADATA
  get stepperMetaData() {
    return new RMPTFStepperMDP({ taskRoot: this }).getMetaData();
  }
  //METADATA

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
  taskFormOutputLocal: any = new Data.Spine.MSFPaymentDetailsOutput();

  get taskFormOutput() {
    if (this.taskDetails.isOutputEmpty) {
      this.taskFormOutputLocal = new Data.Spine.MSFPaymentDetailsOutput();
      this.taskFormOutputLocal.msfPaymentDetails.msfAmount =
        this.fileSummary.msfAmount;
    } else {
      this.taskFormOutputLocal = { ...this.taskDetails.outputJson };
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
      clientFileNumber: this.$route.params.clientFileNumber,
    });
  }

  receiveMSFPayment() {
    this.receiveMSFPaymentInput.taskId = this.taskId;
    this.receiveMSFPaymentInput.clientFileId =
      this.clientFileBasicInfo.clientFileId;
    this.receiveMSFPaymentInput.msfAmount = this.fileSummary.msfAmount;
    Action.Spine.ReceiveMSFPayment.execute(
      this.receiveMSFPaymentInput,
      (output) => {
        FSnackbar.success("Succesfully assigned");
      }
    );
  }

  checkPaymentStatus() {
    let updatePaymentStatusInput = new Data.Spine.UpdateMsfPaymentStatusInput();
    updatePaymentStatusInput.taskId = this.taskId;
    updatePaymentStatusInput.clientFileId =
      this.clientFileBasicInfo.clientFileId;
    updatePaymentStatusInput.paymentId =
      this.taskFormData.taskOutput.msfPaymentDetails.paymentId;
    Action.Spine.UpdateMsfPaymentStatus.execute(
      updatePaymentStatusInput,
      (output) => {}
    );
  }

  saveAndMarkCompleteTask() {
    Task.Action.saveAndMarkCompleteTask({
      taskId: this.taskId,
      taskOutput: this.taskFormData.taskOutput,
    });
  }
}
</script>
