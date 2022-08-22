<template>
  <div>
    <!-- <h4>CollectClientProfileInfoTask</h4> -->
    Root Data : {{ bigFormData }}
    <!-- <f-text-field v-model="testLocal" label="First Name" ></f-text-field> -->
    <!-- <kbd> {{ testMetaData }}</kbd> -->

    <component
      :ref="stepperMetaData.myRefName"
      :is="stepperMetaData.componentName"
      :value="selectModel(bigFormData, undefined)"
      @input="(newValue) => updateModel(bigFormData, newValue, undefined)"
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

@Component({
  components: {
    FStepper,
    FBtn,
  },
})
export default class CollectClientInfoTask extends ModelVue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  taskId = this.$route.params.taskId;

  bigFormDataLocal: any = new Data.Spine.CollectClientInfoTask()
  //{
    // clientInfo: {
    //   firstName: "",
    //   lastName: "",
    //   email: "",
    //   mobile: "",
    //   gender: "",
    //   residentialAddress: {},
    // },
    // creditorList: [],
    // budgetInfo:{incomeSources: {salary: 0}, debtRepayments: {}, livingExpenses: {}, lifeStyleExpenses: {}, dependentExpenses: {}, incidentalExpenses: {}, miscellaneousExpenses: {}},
    // paymentPlan: {ppCalculator: {}, paymentSchedule: [], subscriptionFeeSchedule: []},
    // bankInfo: {accountNumber: "", ifscCode: "", accountType: "SAVINGS", accountHolderName: "", bankAddress: {addressLine1: "", city: "", state: "", country: "", pinCode: ""}},
    // fileDocumentList: [],
    // needVerification: false,
  // };
  

  taskOutputJson() {
    return !!this.taskDetails && !!this.taskDetails.taskOutput
      ? JSON.parse(this.taskDetails.taskOutput)
      : {};
  }


  get bigFormData() {
    
      if(this.taskOutputJson().clientInfo && this.taskOutputJson().clientInfo.firstName) {
        this.bigFormDataLocal.clientInfo = this.taskOutputJson().clientInfo
      }

      if(this.taskOutputJson().creditorInfo && this.taskOutputJson().creditorInfo.creditorList) {
        this.bigFormDataLocal.creditorInfo = this.taskOutputJson().creditorInfo
      }

      if(this.taskOutputJson().budgetInfo && this.taskOutputJson().budgetInfo.incomeSources) {
        this.bigFormDataLocal.budgetInfo.incomeSources = {...this.bigFormDataLocal.budgetInfo.incomeSources, ...this.taskOutputJson().budgetInfo.incomeSources}
        this.bigFormDataLocal.budgetInfo.debtRepayments = {...this.bigFormDataLocal.budgetInfo.debtRepayments, ...this.taskOutputJson().budgetInfo.debtRepayments}
      }

      if(this.taskOutputJson().paymentPlan && this.taskOutputJson().paymentPlan.ppCalculator && this.taskOutputJson().paymentPlan.ppCalculator.firstDraftDate) {
        this.bigFormDataLocal.paymentPlan = this.taskOutputJson().paymentPlan
      } else {
        this.bigFormDataLocal.paymentPlan.ppCalculator.firstDraftDate = moment().format("yyyy-MM-DD")
      }

      if(this.taskOutputJson().bankInfo && this.taskOutputJson().bankInfo.accountNumber) {
        this.bigFormDataLocal.bankInfo = this.taskOutputJson().bankInfo
      }

      if(this.taskOutputJson().fileDocumentList) {
        this.bigFormDataLocal.fileDocumentList = this.taskOutputJson().fileDocumentList
      }

    
    return this.bigFormDataLocal;
  }

  

  set bigFormData(value: any) {
    
    this.bigFormDataLocal = value;
    
  }

  setTotalDebtOutstanding() {
    console.log("I am in set debt outstanding");
    const totalDebtOutstanding = this.bigFormData.creditorList.map((creditor:any) => creditor.creditorBalance).reduce((accumulator: number, objValue: any) => {
        return accumulator + objValue;
      }, 0);
      console.log("totalDebtOutstanding : " + totalDebtOutstanding );
    this.bigFormData.totalDebtOutstanding = totalDebtOutstanding
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
