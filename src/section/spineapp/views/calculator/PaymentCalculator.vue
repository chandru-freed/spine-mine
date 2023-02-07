<template>
  <v-card flat class="PaymentCalculator">
    <v-card-title>Calculator</v-card-title>
    <TMOSSimulatorEditable
      ref="tmosSimulator"
      :value="simulatorResultLocal"
      :simulatorInput="paymentPlanInfo"
    />

    <v-card-title>Register a client</v-card-title>

    <component
      :ref="registerMyCFFFormMetaData.myRefName"
      :is="registerMyCFFFormMetaData.componentName"
      :value="selectModel(registerClientFormData, undefined)"
      v-bind="registerMyCFFFormMetaData.props"
    ></component>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import TMOStimulator from "@/components/generic/tmoStimulator/TMOStimulator.vue";
import TMOSSimulatorEditable from "@/components/generic/tmoStimulator/TMOSSimulatorEditable.vue";
import RegisterMyCFFFormMDP from "../myfiles/RegisterMyCFFFormMDP";
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import Helper from "../../util/Helper";

@Component({
  components: {
    TMOSSimulatorEditable,
    FForm,
  },
})
export default class PaymentCalculator extends ModelVue {
  paymentPlanInfo: Data.ClientFile.FiPaymentPlanInfo =
    new Data.ClientFile.FiPaymentPlanInfo();
  registerClientFormData: Data.Client.RegisterAndAddClientFileForm =
    new Data.Client.RegisterAndAddClientFileForm();
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;
  addNoteInput: Data.FiNote.AddNoteInput = new Data.FiNote.AddNoteInput();
  clientFileNumber: string;
   simulatorResultLocal: any = {
    tenure: 0,
    settlementPercentage: 0,
    outstanding: 0,
    repaymentAmount: 0,
    monthlyPayment: 0,
    affordability: 0,
    msfAmount: 0,
    monthlyObligation: 0,
    firstSPADraftDate: "",
    tenureApproval: 0,
  };


  get registerMyCFFFormMetaData() {
    return new RegisterMyCFFFormMDP({ root: this,hideCancel: true }).getMetaData();
  }

  registerClient() {
    Action.Client.RegisterAndEnroll.execute(
      this.registerClientFormData,
      (output) => {
        setTimeout(() => {
          this.clientFileNumber = output.clientFileNumber;
          this.getCFBasicInfoAndAddNote();
        }, 500);
      }
    );
  }

  getCFBasicInfoAndAddNote() {
    Action.ClientFile.GetClientFileBasicInfo.execute1(
      this.clientFileNumber,
      (output) => {
        setTimeout(() => {
          this.addNote()
        }, 1000);
      }
    );
  }

  getSimulatorResult() {
    console.log((this.$refs['tmosSimulator'] as any)?.result,"(this.$refs['tmosSimulator'] as any)?.result")
    return (this.$refs['tmosSimulator'] as any)?.result;
  }

  addNote() {
    const result = this.getSimulatorResult();
    this.addNoteInput.clientFileId = this.clientFileBasicInfo.clientFileId;
    this.addNoteInput.noteMessage = `Outstanding Amount: ${result.outstanding}, \n Tenure: ${result.tenure} \n 
    Settlement Percentage: ${result.settlementPercentage},\n Monthly Payment: ${result.monthlyPayment},
    \n Affordability: ${result.affordability},
     \n MSF Amount: ${result.msfAmount}
     \n DraftDate: ${result.firstSPADraftDate}
     
    `
    if (this.addNoteInput.noteMessage.length > 1) {
      Action.FiNote.AddNote.execute(this.addNoteInput, (output) => {
        this.$router.replace({
            name: "Root.CFile.CFInfo.CFCreditorInfo",
            params: { clientFileId: this.clientFileBasicInfo.clientFileId },
          });
      });
    }
  }
}
</script>

<style>
</style>
