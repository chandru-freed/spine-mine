<template>
  <div class="col">
    <v-card class="mb-5" v-if="!!showViewAgreementForm">
      <component
        :ref="dcpAgreementDetailsMetaData.myRefName"
        :is="dcpAgreementDetailsMetaData.componentName"
        :value="selectModel(serviceSignAgreementDetailsOutput, undefined)"
        v-bind="dcpAgreementDetailsMetaData.props"
      ></component>
      <div class="pa-5">
        <component
          :ref="dcpClientCreditorListFDataTableMetaData.myRefName"
          :is="dcpClientCreditorListFDataTableMetaData.componentName"
          :value="selectModel(dcpClientCreditorList, undefined)"
          v-bind="dcpClientCreditorListFDataTableMetaData.props"
        ></component>
      </div>

      <div class="d-flex justify-center pa-3">
        <v-btn color="primary" outlined small @click="resetDCPAgreementForm()"
          >Cancel</v-btn
        >
      </div>
    </v-card>
    <component
      v-if="!!showGenerateform"
      :ref="dcpCreateAgreementFFormMetaData.myRefName"
      :is="dcpCreateAgreementFFormMetaData.componentName"
      :value="selectModel(generateAgreementFromExcelInput, undefined)"
      @input="
        (newValue) =>
          updateModel(generateAgreementFromExcelInput, newValue, undefined)
      "
      v-bind="dcpCreateAgreementFFormMetaData.props"
    ></component>

    <component
      v-if="!!DCPAgreementListFDataTableMetaData"
      :ref="DCPAgreementListFDataTableMetaData.myRefName"
      :is="DCPAgreementListFDataTableMetaData.componentName"
      :value="allAgreementList"
      v-bind="DCPAgreementListFDataTableMetaData.props"
    ></component>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import DCPAgreementListFDataTableMDP from "./DCPAgreementListFDataTableMDP";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import FForm from "@/components/generic/form/FForm.vue";
import DCPCreateAgreementFFormMDP from "./DCPCreateAgreementFFormMDP";
import ModelVue from "@/components/generic/ModelVue";
import DCPAgreementDetailsFFormMDP from "./DCPAgreementDetailsFFormMDP";
import DCPClientCreditorListFDataTableMDP from "./DCPClientCreditorListFDataTableMDP";

@Component({
  components: {
    FDataTable,
    FForm,
  },
})
export default class DCPCFAgreementInfo extends ModelVue {
  @Store.Getter.DCPClientFile.DCPClientFileSummary.allAgreementList
  allAgreementList: Data.DCPClientFile.FiSSASummaryForDCP[];
  clientFileId = this.$route.params.clientFileId;
  generateAgreementFromExcelInput: Data.DCPClientFile.GenerateAgreementFromExcelInput =
    new Data.DCPClientFile.GenerateAgreementFromExcelInput();
  showGenerateform: boolean = false;
  showViewAgreementForm: boolean = false;
  serviceSignAgreementDetailsOutput: any;
  dcpClientCreditorList: any = [];

  public mounted() {
    this.getAllAgreementList();
  }

  get tenureList() {
    return Array.from({ length: 72 - 5 }, (_, index) => index + 6);
  }

  get roiList() {
    return Array.from({ length: 35 - 9 }, (_, index) => index + 10);
  }

  getAllAgreementList() {
    Action.DCPClientFile.GetAllSignAgreementListForDCP.execute1(
      this.clientFileId,
      (output) => {}
    );
  }

  get DCPAgreementListFDataTableMetaData() {
    return new DCPAgreementListFDataTableMDP({ parent: this }).getMetaData();
  }

  get dcpCreateAgreementFFormMetaData() {
    return new DCPCreateAgreementFFormMDP({ parent: this }).getMetaData();
  }

  resetFormAndDialog() {
    this.generateAgreementFromExcelInput =
      new Data.DCPClientFile.GenerateAgreementFromExcelInput();
    this.showGenerateform = false;
  }

  get dcpAgreementDetailsMetaData() {
    return new DCPAgreementDetailsFFormMDP({ parent: this }).getMetaData();
  }

  get dcpClientCreditorListFDataTableMetaData() {
    return new DCPClientCreditorListFDataTableMDP({
      parent: this,
    }).getMetaData();
  }

  handleInfoClick(item: any) {
    this.serviceSignAgreementDetailsOutput = item.agreementDetailsInfo;
    this.dcpClientCreditorList = item.agreementDetailsInfo.dcpClientCreditorList;
    this.showViewAgreementForm = true;
  }

  resetDCPAgreementForm() {
    this.showViewAgreementForm = false;
  }
}
</script>

<style></style>
