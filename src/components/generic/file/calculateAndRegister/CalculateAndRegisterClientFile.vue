<template>
  <v-card flat>
    <v-card outlined flat class="PaymentCalculator">
      <component
        v-if="showParseCreditReportForm && !showLoader"
        :is="parseCreditReportMetaData.componentName"
        :ref="parseCreditReportMetaData.myRefName"
        :value="selectModel(parseCreditReportInput, undefined)"
        @input="
          (newValue) => updateModel(parseCreditReportInput, newValue, undefined)
        "
        v-bind="parseCreditReportMetaData.props"
      ></component>
      <div class="d-flex align-center">
        <v-card-title>Calculator</v-card-title>
        <v-spacer />
        <v-btn
          class="mx-4"
          color="primary"
          small
          outlined
          @click="handleUploadCRClick"
        >
          Upload CreditReport<v-icon small>mdi-upload</v-icon></v-btn
        >
      </div>
      <TMOSSimulatorEditable
        ref="tmosSimulator"
        :value="simulatorResultLocal"
        :simulatorInput="paymentPlanInfo"
      />

      <!-- <component
          :value="[]"
          :is="fCreditorListFDataTableMetaData.componentName"
          :ref="fCreditorListFDataTableMetaData.myRefName"
          v-bind="fCreditorListFDataTableMetaData.props"
        ></component> -->

      <v-card-title>Register a client</v-card-title>

      <component
        :ref="registerMyCFFFormMetaData.myRefName"
        :is="registerMyCFFFormMetaData.componentName"
        :value="selectModel(registerClientFormData, undefined)"
        v-bind="registerMyCFFFormMetaData.props"
      ></component>
    </v-card>
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

import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import RegisterMyCFFFormMDP from "@/section/spineapp/views/myfiles/RegisterMyCFFFormMDP";
import FBtn from "../../FBtn.vue";
import FParseCreditReportFFormMDP from "../creditor/FParseCreditReportFFormMDP";
import ErrorResponse from "@/error-response";
import FCreditorListFDataTableMDP from "../creditor/FCreditorListFDataTableMDP";
import FDataTable from "../../table/FDataTable.vue";

@Component({
  components: {
    TMOSSimulatorEditable,
    FForm,
    FBtn,
    FDataTable
  },
})
export default class CalculateAndRegisterClientFile extends ModelVue {
  @Prop()
  onCancelClick: () => void;
  paymentPlanInfo: Data.ClientFile.FiPaymentPlanInfo =
    new Data.ClientFile.FiPaymentPlanInfo();
  registerClientFormData: Data.Client.RegisterAndAddClientFileForm =
    new Data.Client.RegisterAndAddClientFileForm();
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;
  addNoteInput: Data.FiNote.AddNoteInput = new Data.FiNote.AddNoteInput();
  clientFileNumber: string;
  showParseCreditReportForm: boolean = false;
  parseCreditReportOutput: Data.Spine.ParseCreditReportOutput = new Data.Spine.ParseCreditReportOutput();
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
  parseCreditReportInput: Data.Spine.ParseCreditReportInput =
    new Data.Spine.ParseCreditReportInput();
  showLoader: boolean = false;

  get registerMyCFFFormMetaData() {
    return new RegisterMyCFFFormMDP({
      root: this,
      hideCancel: !this.onCancelClick,
    }).getMetaData();
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
          this.addNote();
        }, 1000);
      }
    );
  }

  getSimulatorResult() {
    return (this.$refs["tmosSimulator"] as any)?.result;
  }

  addNote() {
    const result = this.getSimulatorResult();
    this.addNoteInput.clientFileId = this.clientFileBasicInfo.clientFileId;
    this.addNoteInput.noteMessage = `Outstanding Amount: ${result.outstanding}, \n Tenure: ${result.tenure} \n 
    Settlement Percentage: ${result.settlementPercentage},\n Monthly Payment: ${result.monthlyPayment},
    \n Affordability: ${result.affordability},
    \n MSF Amount: ${result.msfAmount}
    `;
    if (this.addNoteInput.noteMessage.length > 1) {
      Action.FiNote.AddNote.execute(this.addNoteInput, (output) => {
        this.$router.replace({
          name: "Root.CFile.CFInfo.CFCreditorInfo",
          params: { clientFileId: this.clientFileBasicInfo.clientFileId },
        });
      });
    }
  }
  handleRegisterFormCancelClick() {
    this.onCancelClick();
  }
  handleUploadCRClick() {
    this.showParseCreditReportForm = true;
  }

  get parseCreditReportMetaData() {
    return new FParseCreditReportFFormMDP({ parent: this }).getMetaData();
  }

  closeAndClearAllForms() {
    this.showParseCreditReportForm = false;
    this.parseCreditReportInput = new Data.Spine.ParseCreditReportInput();
  }

  addCreditorFromPDF() {
    this.showLoader = true;
    // const parsePdf = new ParsePDF({ parent: this, taskRoot: this.taskRoot });
    this.handleUploadCreditReportPDF();
  }

  handleUploadCreditReportPDF() {
    this.showLoader = true;
    Action.Spine.ParseCreditReport.execute(
      this.parseCreditReportInput,
      (output) => {
        this.parseCreditReportOutput = output;
        this.showLoader = false;
      },
      (error) => {
        ErrorResponse.handle(error);
        this.showLoader = false;
      }
    );
  }

  get fCreditorListFDataTableMetaData() {
    return new FCreditorListFDataTableMDP({ parent: this }).getMetaData();
  }
}
</script>

<style>
</style>
