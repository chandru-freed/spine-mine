<template>
  <div>
    Root Data : {{ bigFormData }}
    <component
      v-if="!!taskDetails"
      :ref="stepperMetaData.myRef"
      :is="stepperMetaData.componentName"
      v-model="bigFormData"
      v-bind="stepperMetaData.props"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as RemoteApiPoint from "@/remote-api-point";


import {
  CollectClientInfoTaskInf,
  FStepper,
  CollectClientInfoTaskFStepperMDP,
} from "./CollectClientInfoTaskIntf";

@Component({
  components: {
    FStepper,
  },
})
export default class CollectClientInfoTask
  extends Vue
  implements CollectClientInfoTaskInf
{
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  taskId = this.$route.params.taskId;

  bigFormDataLocal: any = {
    clientInfo: { name: "John", email: "", mobile: "" },
    budgetInfo: { incomeSources: {}, debtRepayments: {}, livingExpense: {}, lifestyleExpense: {}, dependentExpense: {}, incidentalExpense: {}, miscellaneousExpense: {}},
    creditorList: [],
    needVerification: false,
  };

  taskOutputJson() {
    return !!this.taskDetails && !!this.taskDetails.taskOutput
      ? JSON.parse(this.taskDetails.taskOutput)
      : {};
  }

  get bigFormData() {
    if (this.taskOutputJson().clientInfo) {
      this.bigFormDataLocal.clientInfo = this.taskOutputJson().clientInfo;
    }
    return this.bigFormDataLocal;
  }

  set bigFormData(value: any) {
    this.bigFormDataLocal = value;
  }

  get stepperMetaData(): any {
    return new CollectClientInfoTaskFStepperMDP({
      root: this,
    }).getMetaData();
  }

  get formDisabled(): boolean {
    return !(
      this.taskDetails.taskState === "STARTED" ||
      this.taskDetails.taskState === "PARTIALLY_COMPLETED"
    );
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
