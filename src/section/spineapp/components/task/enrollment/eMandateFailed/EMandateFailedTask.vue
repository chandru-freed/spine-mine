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
// import CCITFStepperMDP from "./CCITFStepperMDP";
import FBtn from "@/components/generic/FBtn.vue";
import ModelVue from "@/components/generic/ModelVue";
import moment from "moment";
import EMandateFailedTaskIntf from "./EMandateFailedTaskIntf";
import EMFTFStepperMDP from "./EMFTFStepperMDP";
// import { CollectClientInfoTaskIntf } from "./CollectClientInfoTaskIntf";

@Component({
  components: {
    FStepper,
    FBtn,
  },
})
export default class EMandateFailedTask
  extends ModelVue
  implements EMandateFailedTaskIntf
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
  taskFormOutputLocal: any = new Data.Spine.EMandateFailedTaskOutput();

  get taskFormOutput() {
    if (this.taskDetailsOutput.eMandateRetry) {
      this.taskFormOutputLocal.eMandateRetry =
        this.taskDetailsOutput.eMandateRetry;
    }

    return this.taskFormOutputLocal;
  }

  set taskFormOutput(newValue) {
    this.taskFormOutputLocal = newValue;
  }
  //Task Output

  //DATA

  //METADATA
  get stepperMetaData() {
    return new EMFTFStepperMDP({ taskRoot: this }).getMetaData();
  }
  //METADATA

  get taskDisabled(): boolean {
    return !(
      this.taskDetails.taskState === "STARTED" ||
      this.taskDetails.taskState === "PARTIALLY_COMPLETED"
    );
  }

  //ACTION
  saveAndMarkCompleteTask() {
    const input = JSON.stringify(this.taskFormData.taskOutput);
    console.log("Save take is being called");
    Action.TaskList.SaveAndComplete.execute2(
      this.taskId,
      input,
      (output) => {},
      (err) => {
        console.error(err);
      },
      RemoteApiPoint.BenchApi
    );
  }

  saveTask() {
    const input = JSON.stringify(this.taskFormData.taskOutput);
    console.log("Save take is being called");
    Action.TaskList.Save.execute2(
      this.taskId,
      input,
      (output) => {
        // console.log(output);
      },
      (err) => {
        console.error(err);
      },
      RemoteApiPoint.BenchApi
    );
  }

  gotoFile() {
    this.$router.push({
      name: "Root.ClientFile.ClientFileDetails",
      params: { fileId: this.$route.params.fileId },
    });
  }
}
</script>
