<template>
  <div class="col-12">
    <component
      v-if="showInitiateForm"
      :ref="initiateEMandateFFormMetaData.myRefName"
      :is="initiateEMandateFFormMetaData.componentName"
      :value="selectModel(initiateEMandateInput, undefined)"
      @input="
        (newValue) => updateModel(initiateEMandateInput, newValue, undefined)
      "
      v-bind="initiateEMandateFFormMetaData.props"
    ></component>
    <v-card class="my-4" outlined v-if="showViewEMandateForm" flat>
      <v-alert
        dense
        outlined
        text
        color="red"
        class="ma-5"
        v-if="
          selectedEMandateSummaryToView.status.name === 'REJECTED' &&
          selectedEMandateSummaryToView.reasonDesc
        "
        >{{ selectedEMandateSummaryToView.reasonCode }}:
        {{ selectedEMandateSummaryToView.reasonDesc }} ,{{
          selectedEMandateSummaryToView.rejectedBy
        }}
      </v-alert>
      <component
        :ref="eMandateDetailsFFormMetaData.myRefName"
        :is="eMandateDetailsFFormMetaData.componentName"
        :value="selectModel(selectedEMandateSummaryToView, undefined)"
        v-bind="eMandateDetailsFFormMetaData.props"
      ></component>
    </v-card>

    <component
      :ref="eMandateListFDataTableMetaData.myRefName"
      :is="eMandateListFDataTableMetaData.componentName"
      :value="selectModel(fiEMandateSummaryList, undefined)"
      v-bind="eMandateListFDataTableMetaData.props"
    ></component>

    <div
      class="
        d-flex
        flex-row
        align-start
        flex-wrap
        justify-space-around
        pa-2
        my-5
      "
      v-if="!disabled"
    >
      <component
        v-for="(actionMetaData, index) of actionMetaDataListFiltered"
        :key="'action' + index"
        :is="actionMetaData.componentName"
        :ref="actionMetaData.myRefName"
        v-bind="actionMetaData.props"
      ></component>
    </div>
  </div>
</template>

<script lang="ts">
import FBtn from "@/components/generic/FBtn.vue";
import StepSummary from "@/components/generic/file/summary/StepSummary.vue";
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import { Component, Prop } from "vue-property-decorator";
import FEMandateListFDataTableMDP from "./FEMandateListFDataTableMDP";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import InitiateEMandateFFormMDP from "./InitiateEMandateFFormMDP";
import EMandateDetailsFFormMDP from "./EMandateDetailsFFormMDP";
import FSnackbar from "@/fsnackbar";
@Component({
  components: {
    FBtn,
    StepSummary,
    FForm,
    FDataTable,
  },
})
export default class FEMandateList extends ModelVue {
  @Prop({
    default: () => [],
  })
  actionMetaDataList: any[];

  @Store.Getter.ClientFile.ClientFileSummary.fiPaymentPlanInfo
  fiPaymentPlanInfoStore: Data.ClientFile.FiPaymentPlanInfo;

  initiateEMandateInput: Data.ClientFile.InitiateEMandateInput =
    new Data.ClientFile.InitiateEMandateInput();
  showInitiateForm: boolean = false;
  showViewEMandateForm: boolean = false;

  clientFileId = this.$route.params.clientFileId;

  @Store.Getter.ClientFile.ClientFileSummary.fiEMandateSummaryList
  fiEMandateSummaryList: Data.ClientFile.FiEMandateSummary[];

  selectedEMandateSummaryToView: Data.ClientFile.FiEMandateSummary =
    new Data.ClientFile.FiEMandateSummary();

  get actionMetaDataListFiltered() {
    return this.actionMetaDataList.filter(
      (actionMetaData) =>
        actionMetaData.condition === undefined ||
        actionMetaData.condition === true
    );
  }

  prepopulateDetails() {
    this.initiateEMandateInput.collectionAmount = this.fiPaymentPlanInfoStore?.ppCalculator?.totalMonthlyObligation || 0
    this.initiateEMandateInput.clientBankInfo.nupayBankId = this.fiEMandateSummaryList[0]?.nupayBankId;
    this.initiateEMandateInput.clientBankInfo.accountNumber = this.fiEMandateSummaryList[0]?.accountNumber;
    this.initiateEMandateInput.clientBankInfo.ifscCode = this.fiEMandateSummaryList[0]?.ifscCode;
    this.initiateEMandateInput.clientBankInfo.accountHolderName = this.fiEMandateSummaryList[0]?.accountHolderName;
  }

  initiateEMandate() {
    this.initiateEMandateInput.clientFileId = this.clientFileId;
    Action.ClientFile.InitiateEMandate.execute(
      this.initiateEMandateInput,
      (output) => {
        this.showInitiateForm = false;
      }
    );
  }
  // Meta data
  get eMandateListFDataTableMetaData() {
    return new FEMandateListFDataTableMDP({ parent: this }).getMetaData();
  }

  get initiateEMandateFFormMetaData() {
    return new InitiateEMandateFFormMDP({ parent: this }).getMetaData();
  }

  get eMandateDetailsFFormMetaData() {
    return new EMandateDetailsFFormMDP({ parent: this }).getMetaData();
  }

  // Meta Data

  handleInfoClick(item: Data.ClientFile.FiEMandateSummary) {
    this.selectedEMandateSummaryToView = item;
    this.showViewEMandateForm = true;
  }

  checkAndUpdateEMandate() {
    Action.ClientFile.CheckAndUpdateEMandate.execute1(
      this.selectedEMandateSummaryToView.eMandateId,
      (output) => {
        FSnackbar.success("Successfully checked the emandate status");
        this.getEMandateDetails(this.selectedEMandateSummaryToView.eMandateId);
      }
    );
  }

  getEMandateDetails(eMandateId: string) {
    Action.ClientFile.GetEMandateDetails.execute1(eMandateId, (output: any) => {
      this.selectedEMandateSummaryToView = output;
    });
  }

  isActive() {
    return this.selectedEMandateSummaryToView.status.id===Data.ClientFile.EMANDATE_STATUS.ACTIVE.id
  }
}
</script>
