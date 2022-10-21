<template>
  <div>
    <!-- <h4>Fill The Task Name</h4> -->
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
import FTaskStepper from "@/components/generic/FTaskStepper.vue";
import FBtn from "@/components/generic/FBtn.vue";
import ModelVue from "@/components/generic/ModelVue";
import moment from "moment";
import CollectMSFTaskFStepperMDP from "./CollectMSFTaskFStepperMDP";
import PaymentDetailsFFormMDP from "@/section/spineapp/views/clientfile/PaymentDetailsFFormMDP";
import FForm from "@/components/generic/form/FForm.vue";
import Task from "@/section/spineapp/util/Task";
import * as Snackbar from "node-snackbar";

@Component({
  components: {
    FTaskStepper,
    FForm,
  },
})
export default class CollectMSFTask extends ModelVue {
  paymentIdTemp: string;
  taskId: string = this.$route.params.taskId;

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;


  receiveMSFPaymentInput = new Data.Spine.ReceiveFirstMSFPaymentInput();

  //METADATA
  get stepperMetaData() {
    return new CollectMSFTaskFStepperMDP({ taskRoot: this }).getMetaData();
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

  get taskDisabled(): boolean {
    return Task.isTaskNotActionable(this.taskDetails.taskState);
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
  taskFormOutputLocal: any = new Data.Spine.FirstMSFPaymentDetailsOutput(); // Initialization

  get taskFormOutput() {
    if (this.taskDetailsOutput.firstMSFPaymentDetails) {
      this.taskFormOutputLocal = this.taskDetailsOutput;
    }
    return this.taskFormOutputLocal;
  }

  set taskFormOutput(newValue) {
    this.taskFormOutputLocal = newValue;
  }
  //Task Output

  receiveMSFPayment() {
    this.receiveMSFPaymentInput.taskId = this.taskId;
    this.receiveMSFPaymentInput.clientFileId =
      this.clientFileBasicInfo.clientFileId;
    console.log("clientFileBasicInfo : ", this.clientFileBasicInfo);
    this.receiveMSFPaymentInput.msfAmount =
      this.taskFormData.taskInput.paymentPlan.ppCalculator.msfDraftAmount;
    Action.Spine.ReceiveFirstMSFPayment.execute(
      this.receiveMSFPaymentInput,
      (output) => {
        Snackbar.show({
          text: "Succesfully assigned",
          pos: "bottom-center",
        });
      }
    );
  }

  checkPaymentStatus() {
    let updatePaymentStatusInput = new Data.Spine.UpdatePaymentStatusInput();
    updatePaymentStatusInput.taskId = this.taskId;
    updatePaymentStatusInput.clientFileId =
      this.clientFileBasicInfo.clientFileId;
    updatePaymentStatusInput.paymentId =
      this.taskFormData.taskOutput.firstMSFPaymentDetails.paymentId;
    Action.Spine.UpdatePaymentStatus.execute(
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
