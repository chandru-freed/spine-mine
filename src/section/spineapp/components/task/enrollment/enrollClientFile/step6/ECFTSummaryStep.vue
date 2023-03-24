<template>
  <div class="col-12">
     <div class="mt-5" v-for="formMetaData in formMetaDataList" :key="formMetaData.myRefName">
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
    <component
      :is="clientInfoSummaryMetaData.componentName"
      :ref="clientInfoSummaryMetaData.myRefName"
      :value="selectModel(modelValue)"
      v-bind="clientInfoSummaryMetaData.props"
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
export default class ECFTSummaryStep extends ModelVue {
  @Prop({
    default: () => [],
  })
  actionMetaDataList: any[];

  @Prop()
  clientInfoSummaryMetaData: any;

  @Prop()
  formMetaDataList: any;

  clientFileId = this.$route.params.clientFileId;


  get actionMetaDataListFiltered() {
    return this.actionMetaDataList.filter(
      (actionMetaData) =>
        actionMetaData.condition === undefined ||
        actionMetaData.condition === true
    );
  }

  handleExceptionSwitchChange(value: boolean) {
    console.log(value,"Exception have?");
  }
}
</script>
