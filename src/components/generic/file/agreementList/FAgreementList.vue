<template>
  <div class="col-12">
    <component
      :ref="ecfAgreementListMetaData.myRefName"
      :is="ecfAgreementListMetaData.componentName"
      :value="selectModel(fiSignAgreementList, undefined)"
      v-bind="ecfAgreementListMetaData.props"
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
      class="d-flex flex-row align-start flex-wrap justify-space-around pa-2 my-5"
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
import FAgreementListFDataTableMDP from "./FAgreementListFDataTableMDP";
import store, * as Store from "@/../src-gen/store";
import * as Action from "@/../src-gen/action";
import * as Data from "@/../src-gen/data";

@Component({
  components: {
    FBtn,
    StepSummary,
    FForm,
    FDataTable,
  },
})
export default class FAgreementList extends ModelVue {
  @Prop({
    default: () => [],
  })
  actionMetaDataList: any[];

  @Prop()
  taskRoot: any;

  clientFileId = this.$route.params.clientFileId;

  @Store.Getter.ClientFile.ClientFileSummary.fiSignAgreementList
  fiSignAgreementList: Data.ClientFile.FiSSASummary[];

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  get actionMetaDataListFiltered() {
    return this.actionMetaDataList.filter(
      (actionMetaData) =>
        actionMetaData.condition === undefined ||
        actionMetaData.condition === true
    );
  }
  // Meta data
  get ecfAgreementListMetaData() {
    return new FAgreementListFDataTableMDP({
      parent: this,
      taskRoot: this.taskRoot,
    }).getMetaData();
  }

  getClientFileBasicInfo() {
    Action.ClientFile.GetClientFileBasicInfo.execute1(
      this.clientFileBasicInfo.clientFileNumber,
      (output) => {}
    );
  }
}
</script>
