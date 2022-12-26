<template>
  <v-card class="pa-0 ma-0" flat height="calc(100vh - 48px)">
    <component
      v-if="!!amendmentFDataTableMetaData"
      :ref="amendmentFDataTableMetaData.myRefName"
      :is="amendmentFDataTableMetaData.componentName"
      :value="selectModel(myClientFileList, undefined)"
      v-bind="amendmentFDataTableMetaData.props"
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
import AmendmentFDataTableMDP from "./AmendmentFDataTableMDP";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import ModelVue from "@/components/generic/ModelVue";
import FForm from "@/components/generic/form/FForm.vue";
@Component({
  components: {
    FDataTable,
    FForm,
  },
})
export default class Amendment extends ModelVue {
  amendmentsListGridHeaderList = [
    { text: "Client File Number", value: "clientFileNumber", align: "start" },
    { text: "Amendment Token", value: "amndToken" },
    { text: "Created Date", value: "createdDate" },
    { text: "Cancel", value: "amndToken" },
  ];
  activeAendmentList: Data.ClientFile.AmendmentList[] = [];
  search: string = "";

  mounted() {
    this.getActiveAmendmentList();
  }

  getActiveAmendmentList() {
    Action.ClientFile.GetActiveAmendmentList.execute((output) => {
      this.activeAendmentList = output.AmendmentList;
    });
  }

  get amendmentFDataTableMetaData() {
    return new AmendmentFDataTableMDP({ parent: this }).getMetaData();
  }
}
</script>

<style></style>
