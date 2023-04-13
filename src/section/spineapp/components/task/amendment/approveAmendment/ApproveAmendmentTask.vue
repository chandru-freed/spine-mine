
<template>
  <div>
    <!-- Root Data : {{ taskFormData.taskOutput }}  -->
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
import ModelVue from "@/components/generic/ModelVue";
import Task from "@/section/spineapp/util/Task";
import Helper from "@/section/spineapp/util/Helper";
import FTaskStepper from "@/components/generic/FTaskStepper.vue";
import AATFStepperMDP from "./AATFStepperMDP";
import * as Action from "@/../src-gen/action";
@Component({
  components: {
    FTaskStepper,
  },
})
export default class ApproveAmendmentTask extends ModelVue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  // Creditor Info
  @Store.Getter.ClientFile.ClientFileSummary.fiCreditorInfo
  fiCreditorStore: Data.ClientFile.FiCreditorInfo;

  newPaymentPlan: Data.Spine.FiPSPlanInfo = new Data.Spine.FiPSPlanInfo();

  clientFileId = this.$route.params.clientFileId;

  taskId = this.$route.params.taskId;

  get stepperMetaData(): any {
    return new AATFStepperMDP({ taskRoot: this }).getMetaData();
  }

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
  taskFormOutputLocal: Data.Spine.ApproveAmendmentTaskOutput =
    new Data.Spine.ApproveAmendmentTaskOutput();

  get taskFormOutput() {
    if (this.taskDetails.isOutputEmpty) {
      this.taskFormOutputLocal.creditorInfo = (
        this.taskDetails.inputJson as any
      ).creditorInfo;
    } else {
      this.taskFormOutputLocal = Data.Spine.ApproveAmendmentTaskOutput.fromJson(
        this.taskDetails.outputJson
      );

      // this.taskFormOutputLocal.creditorInfo.totalDebt =
    }

      // const newPaymentPlan = (
      //   this.taskDetails.inputJson as any
      // ).paymentPlan;
    this.taskFormOutputLocal.paymentPlan = this.newPaymentPlan;
    this.taskFormOutputLocal.amendmentApproved = true;
    
    return this.taskFormOutputLocal;
  }

  set taskFormOutput(newValue) {
    this.taskFormOutputLocal = newValue;
  }
  //Task Output

  public getPSPlanInfoHandler = (output: any) => {
    this.getPSPlanInfo();
  }

  getPSPlanInfo() {
    setTimeout(() => {
      const newPSPlanId = (this.taskDetails.inputJson as any).newPSPlanId;
      Action.Spine.GetPSPlanInfo.execute1(newPSPlanId, (output) => {
        this.newPaymentPlan = output;
      });
    }, 1000);
  }

  //DATA
  get taskDisabled(): boolean {
    return Task.isTaskNotActionable(this.taskDetails.taskState, this.taskDetails.isSuspended);
  }

  get taskStateTerminated() {
    return (
      this.taskDetails.taskState === "COMPLETED" ||
      this.taskDetails.taskState === "FORCE_COMPLETED" ||
      this.taskDetails.taskState === "CANCELLED" ||
      this.taskDetails.taskState === "RESET"
    );
  }
  //ACTION

  mounted() {
    this.getFiCreditorInfo();
    this.getPSPlanInfo();
    Action.Spine.RecalculatePSPlanForPM.interested(this.getPSPlanInfoHandler)
    Action.ClientFile.ModifyAmountWithFixedTenure.interested(this.getPSPlanInfoHandler);
    Action.Spine.UploadPaymentSchedulePlanExcel.interested(this.getPSPlanInfoHandler);
  }

  destroyed() {
    Action.Spine.RecalculatePSPlanForPM.notInterested(this.getPSPlanInfoHandler)
    Action.ClientFile.ModifyAmountWithFixedTenure.notInterested(this.getPSPlanInfoHandler);
    Action.Spine.UploadPaymentSchedulePlanExcel.notInterested(this.getPSPlanInfoHandler);
  }
  saveAndMarkCompleteTask() {
    console.log(this.taskFormData.taskOutput)
    Task.Action.saveAndMarkCompleteTask({
      taskId: this.taskId,
      taskOutput: this.taskFormData.taskOutput,
    });
  }
  saveTask() {
    Task.Action.saveTask({
      taskId: this.taskId,
      taskOutput: this.taskFormData.taskOutput,
    });
  }

  getFiCreditorInfo() {
    Action.ClientFile.GetCreditorInfo.execute1(this.clientFileId, (output) => {
      // this.schedulePaymentPlan();
    });
  }

  //Action
}
</script>

