<template>
  <v-stepper
    :value="selectModel(selectedStep, undefined)"
    @change="(newVal) => changeStepQuery(newVal)"
    flat
    non-linear
  >
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
        <v-card color="grey lighten-4" flat min-height="600">
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
              <v-btn
                class="mr-2 elevation-0"
                v-if="taskStateNotStarted"
                color="primary"
                @click="pullAndStartTask"
                small
                >Start</v-btn
              >
              <v-spacer></v-spacer>
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
  },
})
export default class FTaskStepper extends ModelVue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  get taskStateNotStarted() {
    return (
      this.taskDetails.taskState === "ALLOCATED" ||
      this.taskDetails.taskState === "TO_BE_PULLED"
    );
  }

  selectedStep = 0

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

  changeStepQuery(val: any) {
    this.$router.push({
      query: { ...this.$route.query, step: val.toString() },
    });
  }

  gotoPreviousStep() {
    // this.changeStepQuery(this.selectedStep - 1);
    this.selectedStep = this.selectedStep - 1
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
    this.selectedStep = this.selectedStep + 1
  }

  pullAndStartTask() {
    Action.TaskList.PullStartAndMerge.execute1(
      this.$route.params.taskId,
      (output) => {
        // console.log("");
      }
    );
  }
}
</script>
