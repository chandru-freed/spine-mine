<template>
  <div class="FPPCLientList">
    <task-tab></task-tab>

    <component
      v-if="!!fppClientListFDataTableMetaData"
      :ref="fppClientListFDataTableMetaData.myRefName"
      :is="fppClientListFDataTableMetaData.componentName"
      :value="selectModel(activePartnerList, undefined)"
      v-bind="fppClientListFDataTableMetaData.props"
    ></component>
  </div>
</template>

<script lang="ts">
import FForm from "@/components/generic/form/FForm.vue";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
// import store, * as Store from '@/../src-gen/store';
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import RequestedPartnerListFDataTableMDP from "./RequestedPartnerListFDataTableMDP";
import ModelVue from "@/components/generic/ModelVue";
import DashboardTab from "@/section/spineapp/components/tab/DashboardTab.vue";
import RequestedPartnerListDateSearchFFormMDP from "./RequestedPartnerListDateSearchFFormMDP";
import FPPCLientListFDataTableMDP from "./FPPCLientListFDataTableMDP";

@Component({
  components: {
    FForm,
    FDataTable,
    "task-tab": DashboardTab,
  },
})
export default class RequestedPartnerList extends ModelVue {
  // Meta data

  get fppClientListFDataTableMetaData() {
    return new FPPCLientListFDataTableMDP({ parent: this }).getMetaData();
  }
  // Meta data
}
</script>

<style></style>
