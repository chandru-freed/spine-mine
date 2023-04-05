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

import ModelVue from "@/components/generic/ModelVue";

import FBtn from "@/components/generic/FBtn.vue";
import UnAssignedCFFDataTableMDP from "./UnAssignedCFFDataTableMDP";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import AssignRMFFormMDP from "./AssignRMFFormMDP";
import * as Snackbar from "node-snackbar";
import Helper from "@/section/spineapp/util/Helper";
@Component({
  components: {
    FForm,
    "f-btn": FBtn,
    FDataTable,
  },
})
export default class OPRUnAssignedCFSearch
  extends ModelVue
{
  @Store.Getter.ClientFile.ClientFileSearchStore.searchCriteria
  searchCriteria: Data.ClientFile.SearchClientFileInput;

  @Store.Getter.ClientFile.ClientFileSearchStore.searchResultList
  searchResultList: Data.ClientFile.SearchClientFileOutput;

  @Store.Getter.Login.LoginDetails.roleList
  roleList: string[];

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
    // this.searchClientFileInput.clientFileStatus =
    //   Data.ClientFile.CLIENT_FILE_STATUS.ENROLLED.name;
    this.searchClientFileInput.rmNotAssigned = true;
    this.searchClientFileInput.clientFileStatus = Data.ClientFile.CLIENT_FILE_STATUS.ACTIVE.name
    Action.ClientFile.SearchClientFile.execute(
      this.searchClientFileInput,
      (output) => {}
    );
  }

  gotoFile(clientFileNumber: string) {
    Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: clientFileNumber,
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
            this.searchClientFile();
            this.resetFormAndTable();
          }
        });
      }
    );
  }

  resetFormAndTable() {
    this.hideAssignRMFForm();
    (this.$refs["unAssignedCFListFDataTableRef"] as any).clearSelectedItems();
    this.assignRMListInput = {
      assignedRM: "",
    };
  }

  hideAssignRMFForm() {
    this.showAssignRMFForm = false;
  }

  gotoClient(clientId: string) {
    this.$router.push({
      name: "Root.Client.ClientDetails",
      params: { clientId: clientId },
    });
  }
  get isSalesLead() {
    return this.roleList.includes("SalesLead");
  }
  get isSalesRep() {
    return this.roleList.includes("SalesRep");
  }
}
</script>
