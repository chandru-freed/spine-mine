<template>
  <div>
    <!-- CLIENT FILE LIST -->
    <v-card class="pa-0 ma-0">
      <component
        v-if="showAssignRMFForm"
        :ref="assignRMFFormMetaData.myRefName"
        :is="assignRMFFormMetaData.componentName"
        :value="selectModel(assignRMListInput, undefined)"
        @input="
          (newValue) => updateModel(assignRMListInput, newValue, undefined)
        "
        v-bind="assignRMFFormMetaData.props"
      ></component>
      <component
        v-if="!!unAssignedCFFDataTableMetaData"
        :ref="unAssignedCFFDataTableMetaData.myRefName"
        :is="unAssignedCFFDataTableMetaData.componentName"
        :value="selectModel(searchResultList, undefined)"
        v-bind="unAssignedCFFDataTableMetaData.props"
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

import ClientFileSearchIntf from "./ClientFileSearchIntf";
import ModelVue from "@/components/generic/ModelVue";
import Helper from "../../util/Helper";
import FBtn from "@/components/generic/FBtn.vue";
import UnAssignedCFFDataTableMDP from "./UnAssignedCFFDataTableMDP";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import AssignRMFFormMDP from "./AssignRMFFormMDP";
import * as Snackbar from "node-snackbar";
@Component({
  components: {
    FForm,
    "f-btn": FBtn,
    FDataTable,
  },
})
export default class UnAssignedCFSearch
  extends ModelVue
  implements ClientFileSearchIntf
{
  @Store.Getter.ClientFile.ClientFileSearchStore.searchCriteria
  searchCriteria: Data.ClientFile.SearchClientFileInput;

  @Store.Getter.ClientFile.ClientFileSearchStore.searchResultList
  searchResultList: Data.ClientFile.SearchClientFileOutput;

  assignRMInputList: Data.ClientFile.AssignRMInput[] = [];
  showAssignRMFForm: boolean = false;
  searchClientFileInput: Data.ClientFile.SearchClientFileInput =
    new Data.ClientFile.SearchClientFileInput();
  assignRMListInput: any = {
    assignedRM: "",
  };

  unAssignedCFTableRef: string = "UnAssignedCFTableRef";

  get unAssignedCFFDataTableMetaData() {
    return new UnAssignedCFFDataTableMDP({
      parent: this,
    }).getMetaData();
  }

  get assignRMFFormMetaData() {
    return new AssignRMFFormMDP({ taskRoot: this }).getMetaData();
  }

  mounted() {
    this.searchClientFile();
  }

  resetClientSearchInput() {
    Store.Mutation.ClientFile.ClientFileSearchStore.UPDATE_SEARCH_CRITERIA(
      new Data.ClientFile.SearchClientFileInput()
    );
  }

  destroyed() {
    this.resetClientSearchInput();
  }

  searchClientFile() {
    this.searchClientFileInput.clientFileStatus =
      Data.ClientFile.ClientFileStatus.ENROLLED.name;
    this.searchClientFileInput.rmNotAssigned = true;
    console.log(this.searchClientFileInput);
    Action.ClientFile.SearchClientFile.execute(
      this.searchClientFileInput,
      (output) => {
        console.log("Client search file uploaded successfully");
      }
    );
  }

  gotoFile(clientFileNumber: string) {
    Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: clientFileNumber,
    });
  }

  handleAssignRMClick(itemList: any[], callback: () => void) {
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
            this.searchClientFile();
            this.resetFormAndTable();
          }
        });
      }
    );
  }

  resetFormAndTable() {
    this.showAssignRMFForm = false;
    (this.$refs["unAssignedCFListFDataTableRef"] as any).resetSelectedItems();
    this.assignRMListInput = {
      assignedRM: "",
    };
  }

  gotoClient(clientId: string) {
    this.$router.push({
      name: "Root.Client.ClientDetails",
      params: { clientId: clientId },
    });
  }
}
</script>
