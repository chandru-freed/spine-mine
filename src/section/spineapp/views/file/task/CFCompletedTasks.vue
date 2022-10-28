<template>
  <v-data-table
    dense
    :headers="headers"
    :items="taskListFiltered"
    sort-by="taskId"
    class="elevation-0"
    :search="search"
    item-key="taskId"
    :disable-pagination="true"
    hide-default-footer
  >
    <template v-slot:top>
      <v-toolbar flat dense class="mt-1">
        <v-col class="col-2"> </v-col>
        <v-col class="col-5"> </v-col>
        <v-col>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search Item"
            single-line
            hide-details
            outlined
            rounded
            dense
            class="shrink"
          ></v-text-field>
        </v-col>
        <v-btn icon class="mr-3" small text @click="getTaskListForClientFile()"
          ><v-icon>mdi-refresh</v-icon></v-btn
        >
      </v-toolbar>
    </template>
    <template v-slot:item.taskState="{ item }">
      <!-- <v-btn icon small> -->

      <v-icon color="grey" v-if="item.taskState === 'CREATED'"
        >mdi-plus-circle-outline</v-icon
      >
      <v-icon color="grey" v-if="item.taskState === 'TO_BE_PULLED'"
        >mdi-account-cancel-outline</v-icon
      >
      <v-icon color="secondary" v-if="item.taskState === 'ALLOCATED'"
        >mdi-account-circle-outline</v-icon
      >
      <v-icon color="primary" v-if="item.taskState === 'STARTED'"
        >mdi-pencil-circle-outline</v-icon
      >
      <v-icon color="primary" v-if="item.taskState === 'SAVED'"
        >mdi-progress-pencil</v-icon
      >

      <v-icon color="success" v-if="item.taskState === 'COMPLETED'"
        >mdi-check-circle-outline</v-icon
      >

      <v-icon color="grey" v-if="item.taskState === 'CANCELLED'"
        >mdi-cancel</v-icon
      >
      <v-icon
        color="red"
        v-if="item.taskState === 'EXCEPTION_Q' || item.taskState === 'EXIT_Q'"
        >mdi-alert-circle</v-icon
      >
      <!-- </v-btn> -->
    </template>
    <template v-slot:item.taskName="{ item }">
      <f-btn
        :label="item.taskName"
        text
        color="primary"
        :onClick="() => gotoTask(item)"
      ></f-btn>
    </template>
    <template v-slot:item.displayId="{ item }">
      <f-btn
        :label="item.displayId"
        text
        color="secondary"
        :onClick="() => gotoFile(item)"
      ></f-btn>
    </template>
    <template v-slot:item.priority="{ item }">
      <v-chip small outlined>
        {{ item.priority }}
      </v-chip>
    </template>

    <template v-slot:item.allocatedTo="{ item }">
      <v-chip small class="" v-if="item.allocatedTo" label>
        <v-icon small left> mdi-account-circle-outline </v-icon>
        {{ item.allocatedTo }}
      </v-chip>
      <f-btn
        label="START"
        outlined
        small
        color="primary"
        v-if="!item.allocatedTo && item.taskType === 'MANUAL'"
        :onClick="() => pullStartAndMerge(item)"
      ></f-btn>
    </template>

    <template v-slot:item.lastUserActivityTime="{ item }">
      <span class="grey--text">
        {{ getLastUpdatedTime(item) | fromNow }}
      </span>
    </template>
    <template v-slot:no-data> No Tasks Available </template>
  </v-data-table>
  <!-- </v-card> -->
  <!--  TASK TAB -->
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";

import FBtn from "@/components/generic/FBtn.vue";
import Helper from "@/section/spineapp/util/Helper";

@Component({
  components: {
    // "task-tab": TaskTab
    "f-btn": FBtn,
  },
})
export default class CFCompletedTasks extends Vue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;
  search = "";
  headers = [
    {
      text: "Task",
      align: "start",
      sortable: false,
      value: "taskName",
    },
    { text: "", value: "priority" },
    { text: "Assigned", value: "allocatedTo", sortable: false },
    { text: "Status", value: "taskState", sortable: false },
    { text: "", value: "lastUserActivityTime" },
    { text: "", value: "actions" },
  ];

  taskList: Data.TaskList.GetTaskListByCidGrid[] = [];

  showOnlyActive = 1;

  get clientFileNumber(): string {
    return this.clientFileBasicInfo.clientFileNumber;
  }

  mounted() {
    this.getTaskListForClientFile();
  }

  getTaskListForClientFile() {
    setTimeout(() => {
      Action.TaskList.GetTaskListByCid.execute1(
        this.clientFileNumber,
        (output) => {
          this.taskList = output;
        }
      );
    }, 1000);
  }

  get taskListFiltered() {
    const completedTaskList = this.taskList.filter((task) => {
      return task.taskState === "COMPLETED";
    });
    return completedTaskList;
  }

  gotoFile(item: any) {
    Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: item.displayId,
    });
  }

  gotoTask(item: any) {
    const params = { ...this.$route.params, taskId: item.taskId };

    this.$router.push({
      name: "Root.CFile.CFTask.CFTaskDetails.CFTaskDetails",
      params: params,
    });
  }

  getLastUpdatedTime(item: any) {
    return item.lastUserActivityTime || item.allocatedTime || item.readyTime;
  }

  pullStartAndMerge(item: Data.TaskList.ToBePulledTaskGrid) {
    Action.TaskList.PullStartAndMerge.execute1(item.taskId, (output) => {
      this.gotoTask(item);
    });
  }
}
</script>

<style>
.v-btn {
  text-transform: unset !important;
}
</style>
