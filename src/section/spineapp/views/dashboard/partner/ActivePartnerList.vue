<template>
  <div class="ActivePartnerList">
    <task-tab></task-tab>
    <component
      v-if="!!activePartnerListFDataTableMetaData"
      :ref="activePartnerListFDataTableMetaData.myRefName"
      :is="activePartnerListFDataTableMetaData.componentName"
      :value="selectModel(activePartnerList, undefined)"
      v-bind="activePartnerListFDataTableMetaData.props"
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
import ActivePartnerListFDataTableMDP from "./ActivePartnerListFDataTableMDP";
import ModelVue from "@/components/generic/ModelVue";
import DashboardTab from "@/section/spineapp/components/tab/DashboardTab.vue";

@Component({
  components: {
    FForm,
    FDataTable,
    "task-tab": DashboardTab,
  },
})
export default class ActivePartnerList extends ModelVue {
  activePartnerList: Data.Spine.Partner[] = [];

  public mounted() {
    this.getActivePartnerList();
  }
  

  getActivePartnerList() {
    Action.Spine.GetActivePartnerList.execute((output) => {
      this.activePartnerList = output;
    });
  }

  // Meta data

  get activePartnerListFDataTableMetaData() {
    return new ActivePartnerListFDataTableMDP({ parent: this }).getMetaData();
  }
}
</script>

<style>
</style>
