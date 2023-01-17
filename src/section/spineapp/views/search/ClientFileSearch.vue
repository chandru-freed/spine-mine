<template>
  <div>
    <v-card class="pa-0 ma-0" color="transparent">
      <component
        v-if="!!clientFileSearchFormMetaData"
        :ref="clientFileSearchFormMetaData.myRefName"
        :is="clientFileSearchFormMetaData.componentName"
        :value="selectModel(clientFileSearchForm, undefined)"
        @input="
          (newValue) => updateModel(clientFileSearchForm, newValue, undefined)
        "
        v-bind="clientFileSearchFormMetaData.props"
      ></component>
    </v-card>
    <!-- CLIENT FILE LIST -->
    <v-card class="pa-0 ma-0" color="transparent">
      <component
        v-if="!!allClientFileListFDataTableMetaData"
        :ref="allClientFileListFDataTableMetaData.myRefName"
        :is="allClientFileListFDataTableMetaData.componentName"
        :value="selectModel(searchResultList, undefined)"
        v-bind="allClientFileListFDataTableMetaData.props"
      ></component>
    </v-card>
    <!-- CLIENT FILE LIST  -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import moment from "moment";
import FForm from "@/components/generic/form/FForm.vue";

import ClientFileSearchFFormMDP from "./ClientFileSearchFFormMDP";
import ClientFileSearchIntf from "./ClientFileSearchIntf";
import ModelVue from "@/components/generic/ModelVue";
import Helper from "../../util/Helper";
import FBtn from "@/components/generic/FBtn.vue";
import AllClientFileListFDataTableMDP from "./AllClientFileListFDataTableMDP";
import FDataTable from "@/components/generic/table/FDataTable.vue";
@Component({
  components: {
    FForm,
    "f-btn": FBtn,
    FDataTable,
  },
})
export default class ClientFileSearch
  extends ModelVue
  implements ClientFileSearchIntf
{
  @Store.Getter.ClientFile.ClientFileSearchStore.searchCriteria
  searchCriteria: Data.ClientFile.SearchClientFileInput;

  @Store.Getter.ClientFile.ClientFileSearchStore.searchResultList
  searchResultList: Data.ClientFile.SearchClientFileOutput;

  search = "";

  clientFileSearchFormLocal: any = new Data.ClientFile.SearchClientFileInput();

  get clientFileSearchForm() {
    this.clientFileSearchFormLocal = this.searchCriteria;
    return this.clientFileSearchFormLocal;
  }

  get allClientFileListFDataTableMetaData() {
    return new AllClientFileListFDataTableMDP({
      parent: this,
    }).getMetaData();
  }
  set clientFileSearchForm(value: any) {
    this.clientFileSearchFormLocal = value;
  }

  get clientFileSearchFormMetaData(): any {
    return new ClientFileSearchFFormMDP({ taskRoot: this }).getMetaData();
  }

  mounted() {
    this.resetClientSearchInput();
    this.searchClientFile();
  }
  resetClientSearchInput() {
    this.clientFileSearchForm = new Data.ClientFile.SearchClientFileInput();
  }

  searchClientFile() {
    Action.ClientFile.SearchClientFile.execute(
      this.clientFileSearchFormLocal,
      (output) => {
      }
    );
  }

  gotoFile(clientFileNumber: string) {
    Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: clientFileNumber,
    });
  }

  gotoClient(clientId: string) {
    this.$router.push({
      name: "Root.Client.ClientDetails",
      params: { clientId: clientId },
    });
  }
}
</script>
