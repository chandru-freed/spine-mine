<template>
  <div>
    <h4>CollectClientProfileInfoTask</h4>
    Root Data : {{ bigFormData }}
    <kbd>{{ testLocal }}</kbd>
    <!-- <f-text-field v-model="testLocal" label="First Name" ></f-text-field> -->
    <!-- <kbd> {{ testMetaData }}</kbd> -->

    <component
      :is="testMetaData.componentName"
      v-model="testLocal"
      v-bind="testMetaData.props"
    ></component>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as RemoteApiPoint from "@/remote-api-point";
import FTextFieldMDP from "@/components/generic/FTextFieldMDP";
import FStepper from "@/components/generic/FStepper.vue";
import FFormMDP from "@/components/generic/FFormMDP";
import FStepperMDP from "@/components/generic/FStepperMDP";
import CCITFStepperMDP from "./CCITFStepperMDP";

@Component({
  components: {
    FStepper,
  },
})
export default class CollectClientInfoTask extends Vue {
  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  taskId = this.$route.params.taskId;

  testLocal = { firstName: "Deepak", lastName: "Kumar" };

  testFunc() {
    console.log("I am in test Func");
  }

  get testMetaData(): any {
    return new CCITFStepperMDP().getMetaData()
  }

  bigFormDataLocal: any = {
    clientInfo: { name: "John", email: "", mobile: null },
    budgetInfo: {
      incomeSources: {},
      debtRepayments: {},
      livingExpense: {},
      lifestyleExpense: {},
      dependentExpense: {},
      incidentalExpense: {},
      miscellaneousExpense: {},
    },
    creditorList: [],
    needVerification: false,
    paymentPlan: { paymentPlanCalculator: {}, paymentSchedule: [] },
    bankInfo: {
      accountNumber: "",
      accountType: "",
      ifscCode: "",
      nameInBank: "",
    },
    docList: [],
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
    return "";
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
