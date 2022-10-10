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
import FStepper from "@/components/generic/FStepper.vue";
import FBtn from "@/components/generic/FBtn.vue";
import ModelVue from "@/components/generic/ModelVue";
import moment from "moment";
import CollectMSFTaskFStepperMDP from "./CollectMSFTaskFStepperMDP";

@Component({
  components: {
    FStepper,
    FBtn,
  },
})
export default class CollectMSFTask extends ModelVue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  taskDetails: Data.TaskList.ExecutiveTaskDetails;
  receiveMSFPaymentInput = new Data.ClientFile.ReceiveMSFPaymentInput();


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
  taskFormOutputLocal: any = new Data.Spine.CollectMSFTaskOutput(); // Initialization

  get taskFormOutput() {
    return this.taskFormOutputLocal;
  }

  set taskFormOutput(newValue) {
    this.taskFormOutputLocal = newValue;
  }
  //Task Output

  receiveMSFPayment() {
    this.receiveMSFPaymentInput.clientFileId =
      this.clientFileBasicInfo.clientFileId;
    Action.ClientFile.ReceiveMSFPayment.execute(
      this.receiveMSFPaymentInput,
      (output) => {
        Snackbar.show({
          text: "Succesfully assigned",
          pos: "bottom-center",
        });
      }
    );
  }

  // checkPaymentStatus() {
  //   Action.ClientFile.CheckPaymentStatus.execute1(this.paymentId, (output) => {
  //     // this.getFiPaymentDetails();
  //   });
  // }
}
</script>
