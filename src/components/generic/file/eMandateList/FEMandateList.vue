<template>
  <div class="col-12">
    EMandate list
    <component
      :ref="eMandateListFDataTableMetaData.myRefName"
      :is="eMandateListFDataTableMetaData.componentName"
      :value="selectModel(fiEMandateList, undefined)"
      v-bind="eMandateListFDataTableMetaData.props"
    ></component>


    <div v-for="formMetaData in formMetaDataList" :key="formMetaData.myRefName">
      <component
        :ref="formMetaData.myRefName"
        :is="formMetaData.componentName"
        :value="selectModel(modelValue, formMetaData.dataSelectorKey)"
        @input="
          (newValue) =>
            updateModel(modelValue, newValue, formMetaData.dataSelectorKey)
        "
        v-bind="formMetaData.props"
      ></component>
    </div>

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


  clientFileId = this.$route.params.clientFileId;

  @Store.Getter.ClientFile.ClientFileSummary.fiEMandateList
  fiEMandateList: Data.ClientFile.FiEMandateList;

  get actionMetaDataListFiltered() {
    return this.actionMetaDataList.filter(
      (actionMetaData) =>
        actionMetaData.condition === undefined ||
        actionMetaData.condition === true
    );
  }
  // Meta data
  get eMandateListFDataTableMetaData() {
    return new FEMandateListFDataTableMDP({ parent: this }).getMetaData();
  }
}
</script>
