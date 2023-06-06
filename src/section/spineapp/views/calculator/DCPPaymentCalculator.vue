<template>
  <v-card flat>
    <v-container>
      <v-card outlined flat class="DCPPaymentCalculator">
        <f-loader v-if="showLoader" />
        <v-card-title>Calculator</v-card-title>
        <component
          :ref="dcpCalculatorFFormMetaData.myRefName"
          :is="dcpCalculatorFFormMetaData.componentName"
          @input="
            (newValue) =>
              updateModel(dcpCalcilatorFormData, newValue, undefined)
          "
          :value="selectModel(dcpCalcilatorFormData, undefined)"
          v-bind="dcpCalculatorFFormMetaData.props"
        ></component>
        <v-card-title>Register a client</v-card-title>
        <component
          :ref="registerMyCFFFormMetaData.myRefName"
          :is="registerMyCFFFormMetaData.componentName"
          :value="selectModel(registerDCPClientFormData, undefined)"
          v-bind="registerMyCFFFormMetaData.props"
        ></component>
      </v-card>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import Helper from "../../util/Helper";
import ErrorResponse from "@/error-response";
import DCPRegisterMyCFFFormMDP from "../file/dcp/calculator/DCPRegisterMyCFFFormMDP";
import DCPCalculatorFFormMDP from "../file/dcp/calculator/DCPCalculatorFFormMDP";
import FLoader from "@/components/generic/FLoader.vue";

@Component({
  components: {
    FForm,
    FLoader,
  },
})
export default class DCPPaymentCalculator extends ModelVue {
  @Prop()
  onCancelClick: () => void;

  showLoader: boolean = false;
  clientFileNumber: string;
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  registerDCPClientFormData: Data.DCPClientFile.RegisterAndAddClientFileToMyQInput =
    new Data.DCPClientFile.RegisterAndAddClientFileToMyQInput();
  addNoteInput: Data.FiNote.AddNoteInput = new Data.FiNote.AddNoteInput();

  dcpCalcilatorFormDataLocal: any = {
    loanAmount: 0,
    oneTimeFee: 0,
  };

  handleRegisterFormCancelClick() {
    this.onCancelClick();
  }

  get registerMyCFFFormMetaData() {
    return new DCPRegisterMyCFFFormMDP({
      root: this,
      hideCancel: !this.onCancelClick,
    }).getMetaData();
  }
  get dcpCalculatorFFormMetaData() {
    return new DCPCalculatorFFormMDP({
      root: this,
    }).getMetaData();
  }

  get dcpCalcilatorFormData() {
    this.dcpCalcilatorFormDataLocal.oneTimeFee = this.dcpCalcilatorFormDataLocal
      .loanAmount
      ? getFeeWithFreed(this.dcpCalcilatorFormDataLocal.loanAmount)
      : 0;
    return this.dcpCalcilatorFormDataLocal;
  }

  set dcpCalcilatorFormData(value: any) {
    this.dcpCalcilatorFormDataLocal = value;
  }

  getCFBasicInfoAndAddNote() {
    Action.ClientFile.GetClientFileBasicInfo.execute1(
      this.clientFileNumber,
      (output) => {
        setTimeout(() => {
          this.addNote();
        }, 1000);
      },
      (error) => {
        this.showLoader = false;
      }
    );
  }

  addNote() {
    this.addNoteInput.clientFileId = this.clientFileBasicInfo.clientFileId;
    this.addNoteInput.noteMessage = `Loan Amount: ${this.dcpCalcilatorFormDataLocal.loanAmount}, \n One Time Fee: ${this.dcpCalcilatorFormDataLocal.oneTimeFee}`;
    if (this.addNoteInput.noteMessage.length > 1) {
      Action.FiNote.AddNote.execute(
        this.addNoteInput,
        (output) => {
          this.showLoader = false;
          this.$router.replace({
            name: "Root.DCPCFile.DCPCFInfo.DCPCFClientInfo",
            params: { clientFileId: this.clientFileBasicInfo.clientFileId },
          });
        },
        (error) => {
          this.showLoader = false;
          ErrorResponse.handle(error);
        }
      );
    }
  }

  registerClient() {
    this.showLoader = true;
    this.registerDCPClientFormData.programCode =
      Data.DCPClientFile.PROGRAM_CODE.DCP;
    Action.DCPClientFile.RegisterAndAddClientFileToMyQ.execute(
      this.registerDCPClientFormData,
      (output) => {
        setTimeout(() => {
          this.clientFileNumber = output.clientFileNumber;
          this.getCFBasicInfoAndAddNote();
        }, 500);
      },
      (error) => {
        ErrorResponse.handle(error);
        this.showLoader = false;
      }
    );
  }
}

export const getFeeWithFreed = (amount: number) => {
  if (amount >= 50000 && amount < 200000) return 649;
  if (amount > 200001 && amount <= 300000) return 799;
  if (amount > 300001 && amount <= 450000) return 999;
  if (amount > 450001 && amount <= 600000) return 1299;
  if (amount > 600001 && amount <= 800000) return 1499;
  if (amount > 800001 && amount <= 1000000) return 1799;
  if (amount > 1000001 && amount <= 1200000) return 1999;
  if (amount > 1200000) return 2999;
};
</script>

<style></style>
