<template>
  <v-card class="pa-0 ma-0" flat height="calc(100vh - 48px)">
    <component
      v-if="!!pendingFirstMSFFDataTableMetaData"
      :ref="pendingFirstMSFFDataTableMetaData.myRefName"
      :is="pendingFirstMSFFDataTableMetaData.componentName"
      :value="selectModel(myClientFileList, undefined)"
      v-bind="pendingFirstMSFFDataTableMetaData.props"
    ></component>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import Helper from "../../util/Helper";
import MyCFFileFDataTableMDP from "./MyCFFileFDataTableMDP";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import ModelVue from "@/components/generic/ModelVue";
import FForm from "@/components/generic/form/FForm.vue";
import MCFPendingEmandateFDataTableMDP from "./MCFPendingEmandateFDataTableMDP";
import MCFFMSFPendingFDataTableMDP from "./MCFFMSFPendingFDataTableMDP";
@Component({
  components: {
    FDataTable,
    FForm,
  },
})
export default class MyClientFilesFMSFPending extends ModelVue {
  myClientFileList: Data.ClientFile.MyClientFile[] = [];

  mounted() {
    this.getMyClientFileList();
  }

  getMyClientFileList() {
    Action.ClientFile.GetMyClientFileList.execute((output) => {
      this.myClientFileList = output.filter(
        (value: any) =>
          value.firstMSFPaid === false &&
          value.eMandateActive === true
      );
    });
  }

  get pendingFirstMSFFDataTableMetaData() {
    return new MCFFMSFPendingFDataTableMDP({ parent: this }).getMetaData();
  }
}
</script>

<style></style>
