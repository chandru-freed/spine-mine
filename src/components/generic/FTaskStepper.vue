<template>
  <!--  @change="(newVal) => changeStepQuery(newVal)" -->
  <v-stepper :value="selectModel(selectedStep, undefined)" flat non-linear>
    <v-stepper-header flat>
      <v-stepper-step
        :editable="!linearProgress"
        :complete="selectedStep > stepIndx"
        :step="stepIndx"
        v-for="(step, stepIndx) in stepMetaDataList"
        :key="stepIndx"
      >
        {{ step.stepName }}
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content
        class="pa-4"
        :step="stepIndx"
        v-for="(step, stepIndx) in stepMetaDataList"
        :key="stepIndx"
      >
        <component
          v-if="suspendTask"
          :ref="suspendTaskFFormMetaData.myRefName"
          :is="suspendTaskFFormMetaData.componentName"
          :value="selectModel(suspendTaskInput, undefined)"
          @input="
            (newValue) => updateModel(suspendTaskInput, newValue, undefined)
          "
          v-bind="suspendTaskFFormMetaData.props"
        ></component>
        <component
          v-if="cancelTaskForm"
          :ref="cancelTaskFFormMetaData.myRefName"
          :is="cancelTaskFFormMetaData.componentName"
          :value="selectModel(cancelTaskInput, undefined)"
          @input="
            (newValue) => updateModel(cancelTaskInput, newValue, undefined)
          "
          v-bind="cancelTaskFFormMetaData.props"
        ></component>
        <component
          v-if="cancelFlowForm"
          :ref="cancelFlowFFormMetaData.myRefName"
          :is="cancelFlowFFormMetaData.componentName"
          :value="selectModel(cancelTaskInput, undefined)"
          @input="
            (newValue) => updateModel(cancelTaskInput, newValue, undefined)
          "
          v-bind="cancelFlowFFormMetaData.props"
        ></component>
        <v-card color="grey lighten-4" flat min-height="600">
          <v-alert
            v-if="taskRescue"
            dense
            outlined
            text
            color="red"
            class="ma-2"
          >
            <v-card-text class="pa-1">{{
              taskDetails.exceptionInfo.exceptionSummary
            }}</v-card-text>
            <v-card-text class="pa-1">{{
              taskDetails.exceptionInfo.exceptionTime | dateTimeDuration
            }}</v-card-text>
          </v-alert>

          <v-card-text class="pa-0">
            <div class="d-flex justify-space-around pa-3">
              <v-btn
                :disabled="selectedStep == 0"
                small
                outlined
                color="primary"
                @click="gotoPreviousStep()"
                >Previous</v-btn
              >
              <v-spacer></v-spacer>
              <!-- <v-btn
                v-if="isTaskActionable() && !taskDetails.isSuspended"
                outlined
                class="mr-2 elevation-0"
                color="primary"
                small
                @click="suspendTaskAdd()"
                >Suspend</v-btn
              >
              <v-btn
                v-if="isTaskActionable() && taskDetails.isSuspended"
                outlined
                class="mr-2 elevation-0"
                color="primary"
                small
                @click="resumeTaskOn()"
                >Resume</v-btn
              > -->
              <v-btn
                class="mr-2 elevation-0"
                v-if="taskStateNotStarted"
                color="primary"
                @click="pullAndStartTask"
                small
                >Start</v-btn
              >
              <v-btn
                class="mr-2 elevation-0"
                color="primary"
                small
                v-if="taskRescue"
                @click="rescueTask(step)"
                >Rescue</v-btn
              >
              <!-- <v-btn
                class="mr-2 elevation-0"
                color="primary"
                small
                outlined
                v-if="isTaskActionable()"
                @click="cancelFlow()"
                >Cancel Flow</v-btn
              >
              <v-btn
                class="mr-2 elevation-0"
                color="primary"
                small
                outlined
                v-if="isTaskActionable()"
                @click="cancelTask()"
                >Cancel Task</v-btn
              > -->
              <v-spacer></v-spacer>
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    dense
                    small
                    outlined
                    class="mr-2"
                  >
                    Actions
                    <v-icon small>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(action, index) in filteredActions"
                    :key="index"
                    link
                    :disabled="!action.condition()"
                    @click="() => action.handleOtherActionClick()"
                  >
                    <v-list-item-title>{{ action.label }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-btn
                class="mr-2"
                small
                v-if="actionable && step.submitFunc"
                outlined
                color="primary"
                @click="saveStep(step)"
                >Save</v-btn
              >
              <v-btn
                v-if="!(actionable && step.submitFunc)"
                small
                :disabled="selectedStep === stepMetaDataList.length - 1"
                outlined
                color="primary"
                @click="gotoNextStep(step)"
                >Next</v-btn
              >

              <v-btn
                small
                v-if="actionable && step.submitFunc"
                :disabled="selectedStep === stepMetaDataList.length - 1"
                outlined
                color="primary"
                @click="submitAndGotoNextStep(step)"
                >Save & Next</v-btn
              >
            </div>

            <component
              :ref="step.stepContent.myRefName"
              :is="step.stepContent.componentName"
              :value="selectModel(modelValue, step.stepContent.dataSelectorKey)"
              @input="
                (newValue) =>
                  updateModel(
                    modelValue,
                    newValue,
                    step.stepContent.dataSelectorKey
                  )
              "
              v-bind="step.stepContent.props"
            />
          </v-card-text>
        </v-card>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import ModelVue from "./ModelVue";
import FForm from "@/components/generic/form/FForm.vue";
import FCreditor from "@/components/generic/file/creditor/FCreditor.vue";
import FBudget from "@/components/generic/file/budget/FBudget.vue";
import FPaymentPlan from "@/components/generic/file/paymentPlan/FPaymentPlan.vue";
import FDocument from "@/components/generic/file/documentUpload/FDocument.vue";
import CLProfile from "./clientProfile/CLProfile.vue";
import FMarkComplete from "./file/markcomplete/FMarkComplete.vue";
import FEMandate from "./file/eMandate/FEMandate.vue";
import Task from "@/section/spineapp/util/Task";
import FSettlementPlan from "./file/settlementPlan/FSettlementPlan.vue";
import FAmendmentCreditor from "./file/amendmentCreditor/FAmendmentCreditor.vue";
import FAmendmentPaymentPlan from "./file/amendmentPaymentPlan/FAmendmentPaymentPlan.vue";
import FEPaymentPlan from "./file/paymentPlan/enrollmentPaymentPlan/FEPaymentPlan.vue";
import FCFPaymentPlan from "./file/paymentPlan/cfPaymentPlan/FCFPaymentPlan.vue";
import FBPaymentPlan from "./file/paymentPlan/balloonPaymentPlan/FBPaymentPlan.vue";
import FSuspendTaskFFormMDP from "./suspend/FSuspendTaskFFormMDP";
import CMSFTCDraftPaymentStep from "@/section/spineapp/components/task/enrollment/collectMSFThroughCashfree/step1/CMSFTCDraftPaymentStep.vue";
import CNSFMSFTCDraftPaymentStep from "@/section/spineapp/components/task/enrollment/collectNSFMSFThroughCashfree/step1/CNSFMSFTCDraftPaymentStep.vue";
import FCancelFlowFFormMDP from "./cancelTask/FCancelFlowFFormMDP";
import FCancelTaskFFormMDP from "./cancelTask/FCancelTaskFFormMDP";
import FSnackbar from "@/fsnackbar";
import FDocumentCHPP from "./file/documentUploadCHPP/FDocumentCHPP.vue";

@Component({
  components: {
    FForm,
    CLProfile,
    FCreditor,
    FBudget,
    FPaymentPlan,
    FDocument,
    FMarkComplete,
    FEMandate,
    FSettlementPlan,
    FAmendmentCreditor,
    FAmendmentPaymentPlan,
    FEPaymentPlan,
    FCFPaymentPlan,
    FBPaymentPlan,
    CMSFTCDraftPaymentStep,
    CNSFMSFTCDraftPaymentStep,
    FDocumentCHPP
  },
})
export default class FTaskStepper extends ModelVue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  suspendTaskInput: Data.TaskList.SuspendTaskInput =
    new Data.TaskList.SuspendTaskInput();

  cancelTaskInput: Data.TaskList.CancelFlowAndCancelTaskInput =
    new Data.TaskList.CancelFlowAndCancelTaskInput();

  taskId = this.$route.params.taskId;

  get taskStateNotStarted() {
    return (
      this.taskDetails.taskState === "ALLOCATED" ||
      this.taskDetails.taskState === "TO_BE_PULLED"
    );
  }

  get taskRescue(): boolean {
    return (
      this.taskDetails.taskState === "EXCEPTION_Q" ||
      this.taskDetails.taskState === "EXIT_Q"
    );
  }

  selectedStep = 0;
  suspendTask: boolean = false;
  cancelTaskForm: boolean = false;
  cancelFlowForm: boolean = false;
  filteredActionsLocal: any = [];

  get filteredActions() {
    this.filteredActionsLocal = [
      {
        label: "Suspend",
        handleOtherActionClick: this.suspendTaskAdd,
        condition: this.suspendStatus,
      },
      {
        label: "Resume",
        handleOtherActionClick: this.resumeTaskOn,
        condition: this.resumeStatus,
      },
      {
        label: "Cancel Flow",
        handleOtherActionClick: this.cancelFlow,
        condition: this.isTaskActionable,
      },
      // {
      //   label: "Cancel Task",
      //   handleOtherActionClick: this.cancelTask,
      //   condition: this.isTaskActionable,
      // },
    ];
    return this.filteredActionsLocal;
  }

  set filteredActions(value: any) {
    this.filteredActions = value;
  }

  suspendStatus() {
    return this.isTaskActionable() && !this.taskDetails.isSuspended;
  }
  resumeStatus() {
    return this.isTaskActionable() && this.taskDetails.isSuspended;
  }

  // get selectedStep(): number {
  //   if (this.$route.query.step) {
  //     return Number(this.$route.query.step);
  //   }
  //   return 0;
  // }

  @Prop()
  myRefName: string;

  @Prop()
  stepMetaDataList: any[];

  @Prop({
    default: false,
  })
  linearProgress: boolean;

  @Prop()
  actionable: boolean;

  // changeStepQuery(val: any) {
  //   this.$router.push({
  //     query: { ...this.$route.query, step: val.toString() },
  //   });
  // }

  get suspendTaskFFormMetaData() {
    return new FSuspendTaskFFormMDP({
      taskRoot: this,
    }).getMetaData();
  }

  get cancelTaskFFormMetaData() {
    return new FCancelTaskFFormMDP({
      taskRoot: this,
    }).getMetaData();
  }
  get cancelFlowFFormMetaData() {
    return new FCancelFlowFFormMDP({
      taskRoot: this,
    }).getMetaData();
  }

  gotoPreviousStep() {
    // this.changeStepQuery(this.selectedStep - 1);
    this.selectedStep = this.selectedStep - 1;
  }

  saveStep(step: any) {
    step.submitFunc();
  }

  submitAndGotoNextStep(step: any) {
    step.submitFunc(() => {
      this.gotoNextStep(this.selectedStep);
    });
  }

  gotoNextStep(step: any) {
    // this.changeStepQuery(this.selectedStep + 1);
    this.selectedStep = this.selectedStep + 1;
  }

  gotoSpecifiedStep(step: any) {
    // this.changeStepQuery(this.selectedStep + 1);
    this.selectedStep = step;
  }

  pullAndStartTask() {
    Action.TaskList.PullStartAndMerge.execute1(this.taskId, (output) => {
      // console.log("");
    });
  }

  resumeTaskOn() {
    Action.TaskList.Resume.execute1(this.taskId, (output) => {
      FSnackbar.success("Succesfully assigned");
    });
  }

  rescueTask(step: any) {
    step.rescueFunc((taskOutput: any) => {
      Task.Action.rescueTask({
        taskId: this.taskId,
        taskOutput: taskOutput,
      });
    });
  }

  retryTask() {
    return Task.Action.retryTask({ taskId: this.taskId });
  }

  isTaskActionable() {
    return Task.isTaskActionable(this.taskDetails.taskState);
  }

  cancelFlowRestForm() {
    this.cancelTaskInput = new Data.TaskList.CancelFlowAndCancelTaskInput();
  }

  cancelFlow() {
    this.cancelFlowForm = true;
  }

  closeCancelFlow() {
    this.cancelFlowForm = false;
  }

  handleCancelFlowClick() {
    this.cancelTaskInput.taskId = this.taskId;
    Action.TaskList.CancelFlow.execute(this.cancelTaskInput, (output) => {
      this.closeCancelFlow();
      this.cancelFlowRestForm();
      FSnackbar.success("Succesfully assigned");
    });
  }

  cancelTask() {
    this.cancelTaskForm = true;
  }
  closeCancelTask() {
    this.cancelTaskForm = false;
  }
  handleCancelTaskClick() {
    this.cancelTaskInput.taskId = this.taskId;
    Action.TaskList.CancelTask.execute(this.cancelTaskInput, (output) => {
      this.closeCancelTask();
      this.cancelFlowRestForm();
      FSnackbar.success("Succesfully assigned");
    });
  }

  suspendTaskAdd() {
    this.suspendTask = true;
  }
  suspendTaskCancel() {
    this.suspendTask = false;
    this.suspendResetForms();
  }

  suspendResetForms() {
    this.suspendTaskInput = new Data.TaskList.SuspendTaskInput();
  }
}
</script>
<style scoped>
.v-stepper__header {
    height: 48px !important;
}
.v-stepper__step {
    padding: 0px 12px !important;
}
</style>
