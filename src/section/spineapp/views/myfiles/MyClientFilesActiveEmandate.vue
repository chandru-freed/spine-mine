<template>
  <v-card class="pa-0 ma-0" flat height="calc(100vh - 48px)">
    <component
      v-if="!!activeEmandateFDataTableMetaData"
      :ref="activeEmandateFDataTableMetaData.myRefName"
      :is="activeEmandateFDataTableMetaData.componentName"
      :value="selectModel(activeFiEmandateLis, undefined)"
      v-bind="activeEmandateFDataTableMetaData.props"
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
import FDataTable from "@/components/generic/table/FDataTable.vue";
import ModelVue from "@/components/generic/ModelVue";
import FForm from "@/components/generic/form/FForm.vue";
import MCFActiveEmandateFDataTableMDP from "./MCFActiveEmandateFDataTableMDP";
@Component({
  components: {
    FDataTable,
    FForm,
  },
})
export default class MyClientFilesActiveEmandate extends ModelVue {
  activeFiEmandateLis: Data.ClientFile.MyClientFile[] = [];

  mounted() {
    this.getMyClientFileList();
  }

  getMyClientFileList() {
    Action.ClientFile.GetMyClientFileList.execute((output) => {
      this.activeFiEmandateLis = output.filter(
        (value) => value.eMandateActive === true
      );
    });
  }
  get activeEmandateFDataTableMetaData() {
    return new MCFActiveEmandateFDataTableMDP({ parent: this }).getMetaData();
  }
}
</script>

<style></style>
