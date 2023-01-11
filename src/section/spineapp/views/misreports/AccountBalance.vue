<template>
  <div class="TaskAssignedToMe">
    <!-- MIS REPORTS TAB -->
    <misreports-tab v-model="tab"></misreports-tab>
    <!-- MIS REPORTS TAB -->
    <v-card>
      <component
        v-if="!!accountBalanceFDataTableMetaData"
        :ref="accountBalanceFDataTableMetaData.myRefName"
        :is="accountBalanceFDataTableMetaData.componentName"
        :value="selectModel(allocatedTaskList, undefined)"
        v-bind="accountBalanceFDataTableMetaData.props"
      ></component>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import MISReportsTab from "@/section/spineapp/components/tab/MISReportsTab.vue";

import moment from "moment";
import FBtn from "@/components/generic/FBtn.vue";
import Helper from "../../util/Helper";
import AccountBalanceFDataTableMDP from "./AccountBalanceFDataTableMDP";
import ModelVue from "@/components/generic/ModelVue";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import FForm from "@/components/generic/form/FForm.vue";

@Component({
  components: {
    "misreports-tab": MISReportsTab,
    "f-btn": FBtn,
    FDataTable,
    FForm,
  },
})
export default class AccountBalance extends ModelVue {
  tab = 0;

  selected = [];
  search = "";

  allocatedTaskList: Data.TaskList.GetActiveTaskListAllocatedGrid[] = [];
  suspendTaskInput: Data.TaskList.SuspendTaskInput =
    new Data.TaskList.SuspendTaskInput();
  showSuspendForm: boolean = false;
  taskTableRefName: string = "taskAssignedToMeFDataTableRef";

  public getActiveTaskListAllocatedGridHandler = (output: any) => {
    setTimeout(() => {
      this.getActiveTaskListAllocatedGrid();
    }, 1000);
  };

  mounted() {
    this.getActiveTaskListAllocatedGrid();
    Action.TaskList.Suspend.interested(this.getActiveTaskListAllocatedGridHandler);
  }

  destroyed() {
    Action.TaskList.Suspend.notInterested(this.getActiveTaskListAllocatedGridHandler);
  }

  // getActiveTLAllocatedWithDelay() {
  //   setTimeout(() => {
  //     this.getActiveTaskListAllocatedGrid();
  //   }, 1000);
  // }
  getActiveTaskListAllocatedGrid() {
    Action.TaskList.GetActiveTaskListAllocated.execute((output) => {
      this.allocatedTaskList = output;
    });
  }

  gotoFile(item: any) {
    Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: item.cid,
    });
  }

  gotoClient(clientId: string) {
    this.$router.push({
      name: "Root.Client.ClientDetails",
      params: { clientId: clientId },
    });
  }

  get accountBalanceFDataTableMetaData() {
    return new AccountBalanceFDataTableMDP({
      parent: this,
      myRefName: this.taskTableRefName,
    }).getMetaData();
  }
}
</script>

<style></style>
