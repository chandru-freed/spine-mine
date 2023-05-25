<template>
  <div class="col">

      <component
      v-if="!!showGenerateform"
      :ref="dcpCreateAgreementFFormMetaData.myRefName"
      :is="dcpCreateAgreementFFormMetaData.componentName"
      :value="selectModel(generateAgreementFromExcelInput, undefined)"
      @input="(newValue) => updateModel(generateAgreementFromExcelInput, newValue, undefined)"
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

import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import store, * as Store from '@/../src-gen/store';
import * as Data from '@/../src-gen/data';
import * as ServerData from '@/../src-gen/server-data';
import * as Action from '@/../src-gen/action';
import DCPAgreementListFDataTableMDP from './DCPAgreementListFDataTableMDP'
import FDataTable from '@/components/generic/table/FDataTable.vue';
import FForm from '@/components/generic/form/FForm.vue';
import DCPCreateAgreementFFormMDP from './DCPCreateAgreementFFormMDP';
import ModelVue from '@/components/generic/ModelVue';

@Component({
  components: {
    FDataTable,
    FForm
  }
})
export default class DCPCFAgreementInfo extends ModelVue {
  @Store.Getter.DCPClientFile.DCPClientFileSummary.allAgreementList
  allAgreementList: Data.DCPClientFile.FiSSASummaryForDCP[];
  clientFileId = this.$route.params.clientFileId;
  generateAgreementFromExcelInput: Data.DCPClientFile.GenerateAgreementFromExcelInput = new Data.DCPClientFile.GenerateAgreementFromExcelInput();
  showGenerateform: boolean = false;
  public mounted() {
    this.getAllAgreementList();
  }

  getAllAgreementList() {
    Action.DCPClientFile.GetAllSignAgreementListForDCP.execute1(this.clientFileId, output => {

    })
  }

  get DCPAgreementListFDataTableMetaData() {
        return new DCPAgreementListFDataTableMDP({parent: this}).getMetaData()
    }

    get dcpCreateAgreementFFormMetaData() {
          return new DCPCreateAgreementFFormMDP({parent: this}).getMetaData()
    }

    resetFormAndDialog() {
      this.generateAgreementFromExcelInput = new Data.DCPClientFile.GenerateAgreementFromExcelInput()
      this.showGenerateform = false; 
    }

}

</script>

<style>
</style>
