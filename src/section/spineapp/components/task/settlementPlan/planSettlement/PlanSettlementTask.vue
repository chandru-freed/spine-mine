
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
import ModelVue from "@/components/generic/ModelVue";
import Task from "@/section/spineapp/util/Task";
import PSTFStepperMDP from "./PSTFStepperMDP";
import FTaskStepper from "@/components/generic/FTaskStepper.vue";
import * as Action from "@/../src-gen/action";
@Component({
  components: {
    FTaskStepper,
  },
})
export default class PlanSettlementTask extends ModelVue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  @Store.Getter.ClientFile.SettlementDetails.stPlanDetails
  stPlanDetails: Data.ClientFile.STPlanDetails;
  taskId = this.$route.params.taskId;
  clientFileId = this.$route.params.clientFileId;

  get stepperMetaData(): any {
    return new PSTFStepperMDP({ taskRoot: this }).getMetaData();
  }

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
  taskFormOutputLocal: Data.Spine.STPlanDetails =
    new Data.Spine.STPlanDetails();

  get taskFormOutput() {
    this.taskFormOutputLocal.stSpaEntryList = this.stPlanDetails.stSpaEntryList;
    this.taskFormOutputLocal.stFeeEntryList = this.stPlanDetails.stFeeEntryList;
    // this.taskFormOutputLocal = {
    //   ...this.taskDetailsOutput,
    //   stFeeEntryList: this.stPlanDetails.stFeeEntryList?this.stPlanDetails.stFeeEntryList:[],
    //   stSpaEntryList: this.stPlanDetails.stSpaEntryList?this.stPlanDetails.stSpaEntryList:[],
    // }
    return this.taskFormOutputLocal;
  }

  set taskFormOutput(newValue) {
    this.taskFormOutputLocal = newValue;
  }
  //Task Output

  //DATA
  get taskDisabled(): boolean {
    return Task.isTaskNotActionable(
      this.taskDetails.taskState,
      this.taskDetails.isSuspended
    );
  }

  get stPlanId() {
    return this.taskDetailsInput.stPlanInfo?.fiSettlementPlanId;
  }

  public getSTPaymentPlanDetailsHandler = (output: any) => {
    setTimeout(() => {
      this.getSTPaymentPlanDetails();
    }, 1000);
  };

  mounted() {
    this.getSTPaymentPlanDetails();
    Action.ClientFile.AddSTEntry.interested(this.getSTPaymentPlanDetailsHandler);

    Action.ClientFile.RemoveSTEntry.interested(this.getSTPaymentPlanDetailsHandler);

    Action.ClientFile.PresentSTEntry.interested(this.getSTPaymentPlanDetailsHandler);

    Action.ClientFile.UpdateSTEntryAccountDetails.interested(this.getSTPaymentPlanDetailsHandler);
  }

  destroyed() {
    Action.ClientFile.AddSTEntry.notInterested(this.getSTPaymentPlanDetailsHandler);

    Action.ClientFile.RemoveSTEntry.notInterested(this.getSTPaymentPlanDetailsHandler);

    Action.ClientFile.PresentSTEntry.notInterested(this.getSTPaymentPlanDetailsHandler);

    Action.ClientFile.UpdateSTEntryAccountDetails.notInterested(this.getSTPaymentPlanDetailsHandler);
  }

  getSTPaymentPlanDetails() {
    Action.ClientFile.GetSTPlanDetails.execute1(this.stPlanId, (output) => {});
  }

  getFiCreditorInfo() {
    Action.ClientFile.GetCreditorInfo.execute1(
      this.clientFileId,
      (output) => {}
    );
  }
  //ACTION
  saveAndMarkCompleteTask() {
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
  // gotoFile() {
  //   Helper.Router.gotoFile({
  //     router: this.$router,
  //     fileId: this.$route.params.fileId,
  //   });
  // }/
  //Action
}
</script>

