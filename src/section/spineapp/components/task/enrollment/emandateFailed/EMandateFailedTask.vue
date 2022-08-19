<template>
  <div>
    {{bigFormData}}
    <component
      :ref="stepperMetaData.myRefName"
      :is="stepperMetaData.componentName"
      v-model="bigFormData"
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
import EMandateFailedStepperMDP from "./EMandateFailedStepperMDP";

@Component({
  components: {
    FStepper,
    FBtn,
  },
})
export default class EMandateFailedTask extends Vue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  taskId = this.$route.params.taskId;

  bigFormDataLocal: any = {
    fileId: null, clientName: null, clientMobile: null, eMandateStatus: null
  };
  

  taskOutputJson() {
    return !!this.taskDetails && !!this.taskDetails.taskOutput
      ? JSON.parse(this.taskDetails.taskOutput)
      : {};
  }

  taskInputJson() {
    return !!this.taskDetails && !!this.taskDetails.taskInput
      ? JSON.parse(this.taskDetails.taskInput)
      : {};
  }

  get bigFormData() {
    console.log(this.taskInputJson);
    console.log(this.taskOutputJson());
    this.bigFormDataLocal = { ...this.taskInputJson(), ...this.taskOutputJson() }
    return this.bigFormDataLocal;
  }

  set bigFormData(value: any) {
    this.bigFormDataLocal = value;
  }

  get stepperMetaData(): any {
    return new EMandateFailedStepperMDP({
      taskRoot: this,
    }).getMetaData();
  }

  get taskDisabled(): boolean {
    return !(
      this.taskDetails.taskState === "STARTED" ||
      this.taskDetails.taskState === "PARTIALLY_COMPLETED"
    );
  }

  saveAndMarkCompleteTask() {
    const input = JSON.stringify(this.bigFormData);
    console.log("Save take is being called");
    Action.TaskList.Save.execute2(
      this.taskId,
      input,
      (output) => {
        // console.log(output);
        this.markComplete()
      },
      (err) => {
        console.error(err);
      },
      RemoteApiPoint.BenchApi
    );
  }

  markComplete() {
    Action.TaskList.Complete.execute1(
      this.taskId,
      (output) => {
        this.gotoFile();
      },
      (err) => {
        console.error(err);
      },
      RemoteApiPoint.BenchApi
    );
  }

  saveTask() {
    const input = JSON.stringify(this.bigFormData);
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

<style></style>
