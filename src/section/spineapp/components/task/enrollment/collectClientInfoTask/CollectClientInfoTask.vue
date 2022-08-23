<template>
  <div>
    <!-- <h4>CollectClientProfileInfoTask</h4> -->
    <!-- Root Data : {{ taskFormData }} -->
    <!-- <f-text-field v-model="testLocal" label="First Name" ></f-text-field> -->
    <!-- <kbd> {{ testMetaData }}</kbd> -->

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
import CCITFStepperMDP from "./CCITFStepperMDP";
import FBtn from "@/components/generic/FBtn.vue";
import ModelVue from "@/components/generic/ModelVue";
import moment from "moment";
import { CollectClientInfoTaskIntf } from "./CollectClientInfoTaskIntf";

@Component({
  components: {
    FStepper,
    FBtn,
  },
})
export default class CollectClientInfoTask extends ModelVue implements CollectClientInfoTaskIntf{
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  taskId = this.$route.params.taskId;

  
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

  taskFormDataLocal: any = {taskInput: {}, taskOutput: new Data.Spine.CollectClientInfoTask()}

  taskFormOutputLocal: any =  new Data.Spine.CollectClientInfoTask()

  get taskFormOutput() {
    if(this.taskDetailsOutput.clientInfo && this.taskDetailsOutput.clientInfo.firstName) {
        this.taskFormOutputLocal.clientInfo = this.taskDetailsOutput.clientInfo
      }

      // if(this.taskOutput.creditorInfo && this.taskOutput.creditorInfo.creditorList) {
      //   this.taskFormDataLocal.taskOutput.creditorInfo = this.taskOutput.creditorInfo
      // }

      // if(this.taskOutput.budgetInfo && this.taskOutput.budgetInfo.incomeSources) {
      //   this.taskFormDataLocal.taskOutput.budgetInfo.incomeSources = {...this.taskFormDataLocal.budgetInfo.incomeSources, ...this.taskOutput.budgetInfo.incomeSources}
      //   this.taskFormDataLocal.taskOutput.budgetInfo.debtRepayments = {...this.taskFormDataLocal.budgetInfo.debtRepayments, ...this.taskOutput.budgetInfo.debtRepayments}
      // }

      // if(this.taskOutput.paymentPlan && this.taskOutput.paymentPlan.ppCalculator && this.taskOutput.paymentPlan.ppCalculator.firstDraftDate) {
      //   this.taskFormDataLocal.taskOutput.paymentPlan = this.taskOutput.paymentPlan
      // } else {
      //   this.taskFormDataLocal.taskOutput.paymentPlan.ppCalculator.firstDraftDate = moment().format("yyyy-MM-DD")
      // }

      // if(this.taskOutput.bankInfo && this.taskOutput.bankInfo.accountNumber) {
      //   this.taskFormDataLocal.taskOutput.bankInfo = this.taskOutput.bankInfo
      // }

      // if(this.taskOutput.fileDocumentList) {
      //   this.taskFormDataLocal.taskOutput.fileDocumentList = this.taskOutput.fileDocumentList
      // }
    return this.taskFormOutputLocal
  }

  set taskFormOutput(newValue) {
    this.taskFormOutputLocal = newValue
  }
  
  get taskFormData() {
    return {taskInput: this.taskDetailsInput, taskOutput: this.taskFormOutput}
  }

  

  set taskFormData(value: any) {
    this.taskFormDataLocal = value;
  }


  get stepperMetaData(): any {
    return new CCITFStepperMDP({
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
    const input = JSON.stringify(this.taskFormData.taskOutput);
    console.log("Save take is being called");
    Action.TaskList.SaveAndComplete.execute2(
      this.taskId,
      input,
      (output) => {
      },
      (err) => {
        console.error(err);
      },
      RemoteApiPoint.BenchApi
    );
  }

  private markComplete() {
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
    const input = JSON.stringify(this.taskFormData);
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
