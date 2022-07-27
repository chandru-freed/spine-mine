<template>
  <div>
    Root Data : {{ bigFormDataComputed }}
    <collect-client-info-task-stepper
      :ref="stepperMetaData.stepperRef"
      :step-meta-data-list="stepperMetaData.stepMetaDataList"
      v-model="bigFormDataComputed"
    ></collect-client-info-task-stepper>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as RemoteApiPoint from "@/remote-api-point";

import CollectClientInfoTaskStepper from "./components/CollectClientInfoTaskStepper.vue";
import { CollectClientInfoTaskStep1 } from "./CollectClientInfoTaskStep1";
import CollectClientInfoTaskInf from "./CollectClientInfoTaskInf";

import { StepperMetaData } from "@/../src-def/form/FormComponentDef";
// import { CollectClientInfoTaskDef } from "@/../src-def/task/CollectClientInfoTaskDef";

@Component({
  components: {
    "collect-client-info-task-stepper": CollectClientInfoTaskStepper
  },
})
export default class CollectClientInfoTask
  extends Vue
  implements CollectClientInfoTaskInf
{
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  taskId = this.$route.params.taskId;

  bigFormData: any = {
    clientInfo: { name: "", address: {} },
    budgetInfo: { },
    creditorList: [],
    needVerification: false,
  };

  get bigFormDataComputed() {
    return this.bigFormData
  }

  set bigFormDataComputed(value: any) {
    this.bigFormData.totalDebtAmount = 1231234
    this.bigFormData = value
  }

  public rootRef = "taskStepperRef";

  get stepperMetaData(): StepperMetaData {
    return new StepperMetaData({
      stepperRef: this.rootRef,
      stepMetaDataList: [
        new CollectClientInfoTaskStep1(this).getMetaData()
      ],
    });
  }

  get formDisabled(): boolean {
    return !(
      this.taskDetails.taskState === "STARTED" ||
      this.taskDetails.taskState === "PARTIALLY_COMPLETED"
    );
  }

  mounted() {
    if (!!this.taskDetails && !!this.taskDetails.taskOutput) {
      this.bigFormData = JSON.parse(this.taskDetails.taskOutput);
    }
  }

  completeTask() {
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
    Action.TaskList.Save.execute2(
      this.taskId,
      JSON.stringify(this.bigFormData),
      (output) => {},
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
