<template>
  <div>
    <!-- <h4>EnrollmentCompletionTask</h4> -->
    <!-- Root Data : {{ bigFormData }} -->
    <!-- <f-text-field v-model="testLocal" label="First Name" ></f-text-field> -->
    <!-- <kbd> {{ testMetaData }}</kbd> -->

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
import EnrollmentCompletionStepperMDP from "./EnrollmentCompletionStepperMDP";

@Component({
  components: {
    FStepper,
    FBtn,
  },
})
export default class EnrollmentCompletionTask extends Vue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  taskId = this.$route.params.taskId;

  bigFormDataLocal: any = {
    clientInfo: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      gender: "",
      residentialAddress: {},
    },
    creditorList: [],
    budgetInfo:{incomeSources: {}, debtRepayments: {}, livingExpenses: {}, lifeStyleExpenses: {}, dependentExpenses: {}, incidentalExpenses: {}, miscellaneousExpenses: {}},
    paymentPlan: {ppCalculator: {}, paymentSchedule: [], subscriptionFeeSchedule: []},
    bankInfo: {accountNumber: "", ifscCode: "", accountType: "SAVINGS", accountHolderName: "", bankAddress: {addressLine1: "", city: "", state: "", country: "", pinCode: ""}},
    fileDocumentList: [],
    needVerification: false,
  };
  

  taskOutputJson() {
    return !!this.taskDetails && !!this.taskDetails.taskOutput
      ? JSON.parse(this.taskDetails.taskOutput)
      : {};
  }

  get bigFormData() {
    
      this.bigFormDataLocal.clientInfo = this.taskOutputJson().clientInfo ? this.taskOutputJson().clientInfo : {};
      this.bigFormDataLocal.creditorList = this.taskOutputJson().creditorList ? this.taskOutputJson().creditorList: [];
      this.bigFormDataLocal.budgetInfo = (this.taskOutputJson().budgetInfo && this.taskOutputJson().budgetInfo.incomeSources) ? this.taskOutputJson().budgetInfo : {incomeSources: {}, debtRepayments: {}, livingExpenses: {}, lifeStyleExpenses: {}, dependentExpenses: {}, incidentalExpenses: {}, miscellaneousExpenses: {}};
      this.bigFormDataLocal.paymentPlan = this.taskOutputJson().paymentPlan && this.taskOutputJson().paymentPlan.ppCalculator ? this.taskOutputJson().paymentPlan : {ppCalculator: {}, paymentSchedule: [], subscriptionFeeSchedule: []};
      this.bigFormDataLocal.bankInfo = this.taskOutputJson().bankInfo && this.taskOutputJson().bankInfo.accountNumber ?  this.taskOutputJson().bankInfo: {accountNumber: "", ifscCode: "", accountType: "SAVINGS", accountHolderName: "", bankAddress: {addressLine1: "", city: "", state: "", country: "", pinCode: ""}};
      this.bigFormDataLocal.fileDocumentList = this.taskOutputJson().fileDocumentList ? this.taskOutputJson().fileDocumentList : [];
    
    return this.bigFormDataLocal;
  }

  set bigFormData(value: any) {
    this.bigFormDataLocal = value;
  }

  get stepperMetaData(): any {
    return new EnrollmentCompletionStepperMDP({
      taskRoot: this,
    }).getMetaData();
  }

  get taskDisabled(): boolean {
    return !(
      this.taskDetails.taskState === "STARTED" ||
      this.taskDetails.taskState === "PARTIALLY_COMPLETED"
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
