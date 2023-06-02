
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
  @Store.Getter.ClientFile.ClientFileSummary.budgetInfo
  budgetInfoStore: Data.ClientFile.BudgetInfo;

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;
  

  taskId = this.$route.params.taskId;
  amendmentDetails: Data.ClientFile.AmendmentDetails =
    new Data.ClientFile.AmendmentDetails();
  amendmentToken: string = "";
  clientFileId = this.$route.params.clientFileId;

  get stepperMetaData(): any {
    return new PAVTFStepperMDP({ taskRoot: this }).getMetaData();
  }

  mounted() {
    this.getAmendmentDetails();
    this.getBudgetInfo();
    this.getPaymentPlan();
    Action.ClientFile.AddFiCreditorForAmendment.interested(
      this.getAmendmentDetailsHandler
    );

    Action.ClientFile.UpdateFiCreditorForAmendment.interested(
      this.getAmendmentDetailsHandler
    );

    Action.ClientFile.UpdateIncludeClCreditorForAmendment.interested(
      this.getAmendmentDetailsHandler
    );

    Action.ClientFile.ExcludeFiCreditorInProgramAmendment.interested(
      this.getAmendmentDetailsHandler
    );

    Action.Spine.RecalculatePSPlanForPM.interested(this.getAmendmentDetailsHandler);
    Action.ClientFile.ModifyAmountWithFixedTenure.interested(
      this.getAmendmentDetailsHandler
    );
    Action.Spine.UploadPaymentSchedulePlanExcel.interested(
      this.getAmendmentDetailsHandler
    );
    Action.Spine.RecalculatePSPlanWithTenure.interested(
      this.getAmendmentDetailsHandler
    );
    Action.Spine.RecalculatePSPlanWithTMO.interested(this.getAmendmentDetailsHandler);
    Action.ClientFile.ApplyDiscountOnMsfAmendment.interested(this.getAmendmentDetailsHandler);
  }

    getBudgetInfo() {
    Action.ClientFile.GetBudgetInfo.execute1(this.clientFileId, (output) => {});
  }

  getPaymentPlan() {
    Action.ClientFile.GetPaymentPlanInfo.execute1(this.clientFileId, (output) => {});
  }


  destroyed() {
    Action.ClientFile.AddFiCreditorForAmendment.notInterested(
      this.getAmendmentDetailsHandler
    );

    Action.ClientFile.UpdateFiCreditorForAmendment.notInterested(
      this.getAmendmentDetailsHandler
    );

    Action.ClientFile.UpdateIncludeClCreditorForAmendment.notInterested(
      this.getAmendmentDetailsHandler
    );

    Action.ClientFile.ExcludeFiCreditorInProgramAmendment.notInterested(
      this.getAmendmentDetailsHandler
    );



    Action.Spine.RecalculatePSPlanForPM.notInterested(this.getAmendmentDetailsHandler);
    Action.ClientFile.ModifyAmountWithFixedTenure.notInterested(
      this.getAmendmentDetailsHandler
    );
    Action.Spine.UploadPaymentSchedulePlanExcel.notInterested(
      this.getAmendmentDetailsHandler
    );
    Action.Spine.RecalculatePSPlanWithTenure.notInterested(
      this.getAmendmentDetailsHandler
    );
    Action.Spine.RecalculatePSPlanWithTMO.notInterested(this.getAmendmentDetailsHandler);
    Action.ClientFile.ApplyDiscountOnMsfAmendment.notInterested(this.getAmendmentDetailsHandler);
  }
  getAmendmentDetailsHandler = () => {
    setTimeout(() => {
      this.getAmendmentDetails();
      this.getClientCreditorList();
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
      taskInput: {...this.taskDetails.inputJson,existingBudgetInfo: this.budgetInfoStore},
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
    this.taskFormOutputLocal.payload.creditorInfo =
      this.amendmentDetails.amendmentFiCreditorInfo;
    this.taskFormOutputLocal.payload.paymentPlan = this.amendmentDetails.newPaymentPlan;
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

  getClientCreditorList() {
    Action.ClientFile.GetClCreditorList.execute1(
      this.clientFileBasicInfo.clientBasicInfo.clientId,
      (output) => {}
    );
  }

  //Action
}
</script>

