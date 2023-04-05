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
    <!-- <v-card class="pa-0 ma-0" color="transparent"> -->
    <v-card flat v-if="showAssignRMFForm">
      <v-card-title>Assign RM</v-card-title>
      <component
        :ref="assignRMFFormMetaData.myRefName"
        :is="assignRMFFormMetaData.componentName"
        :value="selectModel(assignRMListInput, undefined)"
        @input="
          (newValue) => updateModel(assignRMListInput, newValue, undefined)
        "
        v-bind="assignRMFFormMetaData.props"
      ></component>
    </v-card>

    <component
      v-if="!!allClientFileListFDataTableMetaData"
      :ref="allClientFileListFDataTableMetaData.myRefName"
      :is="allClientFileListFDataTableMetaData.componentName"
      :value="selectModel(searchResultList, undefined)"
      v-bind="allClientFileListFDataTableMetaData.props"
    ></component>
    <!-- </v-card> -->
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

import ModelVue from "@/components/generic/ModelVue";

import FBtn from "@/components/generic/FBtn.vue";
import AllClientFileListFDataTableMDP from "./AllClientFileListFDataTableMDP";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import Helper from "@/section/spineapp/util/Helper";
import AssignRMFFormMDP from "./AssignRMFFormMDP";

@Component({
  components: {
    FForm,
    "f-btn": FBtn,
    FDataTable,
  },
})
export default class OPRClientFileSearch extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSearchStore.searchCriteria
  searchCriteria: Data.ClientFile.SearchClientFileInput;

  @Store.Getter.ClientFile.ClientFileSearchStore.searchResultList
  searchResultList: Data.ClientFile.SearchClientFileOutput;

  search = "";

  clientFileSearchFormLocal: any = new Data.ClientFile.SearchClientFileInput();

  showAssignRMFForm: boolean = false;
  assignRMInputList: Data.ClientFile.AssignRMInput[] = [];
  assignRMListInput: any = {
    assignedRM: "",
  };

  get clientFileSearchForm() {
    this.clientFileSearchFormLocal = this.searchCriteria;
    return this.clientFileSearchFormLocal;
  }

  get allClientFileListFDataTableMetaData() {
    return new AllClientFileListFDataTableMDP({
      parent: this,
    }).getMetaData();
  }

  get assignRMFFormMetaData() {
    return new AssignRMFFormMDP({ taskRoot: this }).getMetaData();
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
      (output) => {}
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

  handleAssignRMClick(itemList: any[]) {
    this.assignRMInputList = itemList.map((item) => {
      const assignRMInput = Data.ClientFile.AssignRMInput.fromJson(item);
      return assignRMInput;
    });
    this.showAssignRMFForm = true;
  }

  assignRM() {
    this.assignRMInputList.forEach(
      (assignRMInput: Data.ClientFile.AssignRMInput, index: number) => {
        assignRMInput.assignedRM = this.assignRMListInput.assignedRM;
        Action.ClientFile.AssignRM.execute(assignRMInput, (output) => {
          if (index === this.assignRMInputList.length - 1) {
            setTimeout(() => {
              this.searchClientFile();
              this.resetFormAndTable();
            }, 500);
          }
        });
      }
    );
  }

  resetFormAndTable() {
    this.hideAssignRMFForm();
    (this.$refs["allClientFileListFDataTableRef"] as any).clearSelectedItems();
    this.assignRMListInput = {
      assignedRM: "",
    };
  }

  hideAssignRMFForm() {
    this.showAssignRMFForm = false;
  }
}
</script>
