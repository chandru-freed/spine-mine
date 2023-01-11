<template>
  <v-card class="pa-0 ma-0" flat height="calc(100vh - 48px)">
    <component
      v-if="!!amendmentFDataTableMetaData"
      :ref="amendmentFDataTableMetaData.myRefName"
      :is="amendmentFDataTableMetaData.componentName"
      :value="selectModel(amendmentList, undefined)"
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

  amendmentList: Data.ClientFile.Amendment[] = [];
  activeAendmentListOutput: Data.ClientFile.AmendmentListOutput =
    new Data.ClientFile.AmendmentListOutput();
  activeAendmentListInput: Data.ClientFile.ActiveAmendmentListInput =
    new Data.ClientFile.ActiveAmendmentListInput();

  mounted() {
    this.getActiveAmendmentList();
  }

  getActiveAmendmentList() {
    this.activeAendmentListInput.offset = 0;
    this.activeAendmentListInput.count = 100;
    Action.ClientFile.GetActiveAmendmentList.execute(
      this.activeAendmentListInput,
      (output) => {
        this.activeAendmentListOutput = output;
        this.amendmentList = output.amendmentList;
      }
    );
  }

  get amendmentFDataTableMetaData() {
    return new AmendmentFDataTableMDP({ parent: this }).getMetaData();
  }
}
</script>

<style></style>
