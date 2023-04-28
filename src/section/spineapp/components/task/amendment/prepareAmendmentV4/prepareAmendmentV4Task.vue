
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
import Helper from "@/section/spineapp/util/Helper";
import FTaskStepper from "@/components/generic/FTaskStepper.vue";
import PAVTFStepperMDP from "./PAVTFStepperMDP";
import * as Action from "@/../src-gen/action";
@Component({
  components: {
    FTaskStepper,
  },
})
export default class PrepareAmendmentV4Task extends ModelVue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;
  taskId = this.$route.params.taskId;
  amendmentDetails: Data.ClientFile.AmendmentDetails =
    new Data.ClientFile.AmendmentDetails();
  amendmentToken: string = "";

  get stepperMetaData(): any {
    return new PAVTFStepperMDP({ taskRoot: this }).getMetaData();
  }

  mounted() {
    this.getAmendmentDetails();
    Action.ClientFile.AddFiCreditorForAmendment.interested(
      this.getAmendmentDetailsHandler
    );

    Action.ClientFile.UpdateFiCreditorForAmendment.interested(
      this.getAmendmentDetailsHandler
    );

    Action.ClientFile.IncludeFiCreditorToProgram.interested(
      this.getAmendmentDetailsHandler
    );

    Action.ClientFile.ExcludeFiCreditorFromProgram.interested(
      this.getAmendmentDetailsHandler
    );
  }

  destroyed() {
    Action.ClientFile.AddFiCreditorForAmendment.notInterested(
      this.getAmendmentDetailsHandler
    );

    Action.ClientFile.UpdateFiCreditorForAmendment.notInterested(
      this.getAmendmentDetailsHandler
    );

    Action.ClientFile.IncludeFiCreditorToProgram.notInterested(
      this.getAmendmentDetailsHandler
    );

    Action.ClientFile.ExcludeFiCreditorFromProgram.notInterested(
      this.getAmendmentDetailsHandler
    );
  }
  getAmendmentDetailsHandler = () => {
    setTimeout(() => {
      this.getAmendmentDetails();
    }, 1000);
  };
  getAmendmentDetails() {
    const { amndToken } = this.taskDetails.inputJson as any;
    this.amendmentToken = amndToken;
    console.log(amndToken, "Amendment Token");
    Action.ClientFile.GetAmendmentDetails.execute1(amndToken, (output) => {
      console.log(output, "output");
      this.amendmentDetails = output.amendmentDetails;
    });
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
  taskFormOutputLocal: Data.ClientFile.AmendmentV4TaskOutput =
    new Data.ClientFile.AmendmentV4TaskOutput();

  get taskFormOutput() {
    this.taskFormOutputLocal.creditorInfo =
      this.amendmentDetails.amendmentFiCreditorInfo;
    this.taskFormOutputLocal.paymentPlan = this.amendmentDetails.newPaymentPlan;
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

  //Action
}
</script>

