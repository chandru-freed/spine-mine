
<template>
  <div class="SpaDashboard">
  <component
      class="my-2"
      :is="spaDashboardFDataTableMetaData.componentName"
      :ref="spaDashboardFDataTableMetaData.myRefName"
      :value="spaDashboardData.spaDashboardDataMonthlyList"
      v-bind="spaDashboardFDataTableMetaData.props"
    ></component>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
// import store, * as Store from '@/../src-gen/store';
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import FForm from "@/components/generic/form/FForm.vue";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import ModelVue from "@/components/generic/ModelVue";

import SpaDashboardFDataTableMDP from "./SpaDashboardFDataTableMDP";
import Helper from "@/section/spineapp/util/Helper";
@Component({
  components: {
    FForm,
    FDataTable,
  },
})
export default class SpaDashboard extends ModelVue {
  
  spaDashboardData: Data.Spine.SpaDashboardData = new Data.Spine.SpaDashboardData();
  spaDashboardInput: Data.Spine.GetSpaDashboardInput = new Data.Spine.GetSpaDashboardInput();
  currentSpaBalance: number = 0
  numOfSettledAccount:number = 0
  mounted() {
    this.getSpaDashboard();
  }
  getSpaDashboard(){
    this.spaDashboardInput.offset = 0;
    this.spaDashboardInput.count =100;
    Action.Spine.GetSpaDashboard.execute(this.spaDashboardInput, (output) => {
      this.spaDashboardData = output.spaDashboardData;
      this.currentSpaBalance =output.spaDashboardData.currentSPABalance
      this.numOfSettledAccount =output.spaDashboardData.noOfSettledAccountsTotal
    });
  }

  get spaDashboardFDataTableMetaData() {
    return new SpaDashboardFDataTableMDP({ parent: this }).getMetaData();
  }

  
}
</script>

<style>
</style>
