<template>
  <div class="TaskAssignedToMe">
    <!-- TASK TAB -->
    <task-tab v-model="tab"></task-tab>
    <!-- TASK TAB -->
    
    <component
      v-if="!!taskAssignedToMeFDataTableMetaData"
      :ref="taskAssignedToMeFDataTableMetaData.myRefName"
      :is="taskAssignedToMeFDataTableMetaData.componentName"
      :value="selectModel(allocatedTaskList, undefined)"
      v-bind="taskAssignedToMeFDataTableMetaData.props"
    ></component>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import TaskTab from "@/section/spineapp/components/tab/TaskTab.vue";

import moment from "moment";
import FBtn from "@/components/generic/FBtn.vue";
import Helper from "../../util/Helper";
import TaskAssignedToMeFDataTableMDP from "./TaskAssignedToMeFDataTableMDP";
import ModelVue from "@/components/generic/ModelVue";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import FForm from "@/components/generic/form/FForm.vue";

@Component({
  components: {
    "task-tab": TaskTab,
    "f-btn": FBtn,
    FDataTable,
    FForm,
  },
})
export default class TaskAssignedToMe extends ModelVue {
  tab = 0;

  selected = [];
  search = "";

  allocatedTaskList: Data.TaskList.GetActiveTaskListAllocatedGrid[] = [];

  mounted() {
    // this.getAllocatedTaskList();
    this.getActiveTaskListAllocatedGrid();
  }

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

  gotoTask(item: any) {
    this.$router.push({
      name: "Root.CFTaskRedirect",
      params: { clientFileNumber: item.cid, taskId: item.taskId },
    });
  }

  gotoClient(clientId: string) {
    this.$router.push({
      name: "Root.Client.ClientDetails",
      params: { clientId: clientId },
    });
  }

  get taskAssignedToMeFDataTableMetaData() {
    return new TaskAssignedToMeFDataTableMDP({ parent: this }).getMetaData();
  }
}
</script>

<style></style>
