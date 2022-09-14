<template>
  <!-- TASK TAB -->
  <v-card class="pa-0 ma-0" color="white" outlined min-height="700px">
    <!-- <task-tab></task-tab> -->
    <!-- {{taskListFiltered}} -->
    <v-data-table
      dense
      min-height="600px"
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
        <v-toolbar flat dense>
          <v-col class="col-2">
            <v-btn-toggle x-small v-model="showOnlyActive">
              <v-btn x-small>
                <v-icon small>mdi-checkbox-intermediate-variant</v-icon>
              </v-btn>
              <v-btn x-small>
                <v-icon small>mdi-checkbox-intermediate</v-icon>
              </v-btn>
            </v-btn-toggle>
            <!-- <v-btn
              outlined
              x-small
              text
              v-if="!showOnlyActive"
              @click="showOnlyActive = true"
              >Show Active Only</v-btn
            >
            <v-btn
              outlined
              x-small
              text
              v-if="showOnlyActive"
              @click="showOnlyActive = false"
              >Show All</v-btn
            > -->
          </v-col>
          <v-col class="col-5"></v-col>
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
        <!-- </v-btn> -->
      </template>
      <template v-slot:item.taskName="{ item }">
        <v-btn text color="primary" @click="gotoTask(item)">
          {{ item.taskName }}
        </v-btn>
      </template>
      <template v-slot:item.displayId="{ item }">
        <v-btn text color="secondary" @click="gotoFile(item)">
          {{ item.displayId }}
        </v-btn>
      </template>
      <template v-slot:item.priority="{ item }">
        <v-chip small outlined>
          {{ item.priority }}
        </v-chip>
      </template>

      <template v-slot:item.allocatedTo="{ item }" >
        <!-- <v-chip outlined small v-if="item.assignedTo">
          <v-icon left small color="grey"> mdi-account-circle-outline </v-icon>
          {{ item.assignedTo }}
        </v-chip> -->
        <v-chip small class="" v-if="item.allocatedTo" label>
          <v-icon small left> mdi-account-circle-outline </v-icon>
          {{ item.allocatedTo }}
        </v-chip>
        <v-btn
          outlined
          small
          color="primary"
          v-if="!item.allocatedTo && item.taskType === 'MANUAL'"
          @click="pullTask(item)"
          >PULL</v-btn
        >
      </template>

      <template v-slot:item.lastUserActivityTime="{ item }">
        <span class="grey--text">
          {{ getLastUpdatedTime(item) | fromNow }}
        </span>
        <!-- <span class="grey--text" v-if="!item.lastUserActivityTime">
          {{ item.allocatedTime | fromNow }}
        </span> -->
      </template>

      <!-- <template v-slot:item.taskState="{ item }">
          <v-btn rounded outlined small color="secondary" @click="pullTask(item)">{{ item.taskState }}</v-btn>
        </template> -->

      <template v-slot:item.actions="{ item }">
        <!-- <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small class="mr-2" @click="deleteItem(item)">
            mdi-delete
          </v-icon> -->
        <v-menu
          offset-y
          left
          nudge-bottom="14"
          min-width="230"
          content-class="user-profile-menu-content"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-icon small v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
          </template>
          <v-list dense>
            <v-list-item link>
              <v-icon small class="mr-2">mdi-download</v-icon> Download
            </v-list-item>
            <v-list-item link>
              <v-icon small class="mr-2">mdi-eye</v-icon> Preview
            </v-list-item>
            <v-list-item link>
              <v-icon small class="mr-2">mdi-pencil</v-icon> Edit
            </v-list-item>
            <v-list-item link>
              <v-icon small class="mr-2">mdi-delete</v-icon> Delete
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

      <template v-slot:no-data> No Tasks Available </template>
    </v-data-table>
  </v-card>
  <!--  TASK TAB -->
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import TaskTab from "@/section/spineapp/components/task/TaskTab.vue";

import moment from "moment";
import * as RemoteApiPoint from "@/remote-api-point";
import Helper from "../../util/Helper";

@Component({
  components: {
    // "task-tab": TaskTab,
  },
})
export default class FileTaskList extends Vue {
  @Store.Getter.Login.LoginDetails.userName userName: string;

  public tab = 0;

  selected = [];
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

  showOnlyActive = 0;

  get clientFileNumber(): string {
    return this.$route.params.clientFileNumber;
  }

  mounted() {
    this.getToBePulledTaskList();
  }

  getToBePulledTaskList() {
    Action.TaskList.GetTaskListByCid.execute1(
      this.clientFileNumber,
      (output) => {
        this.taskList = output;
      },
      (err) => {},
      RemoteApiPoint.SpineApi
    );
  }

  get taskListFiltered() {
    if (this.showOnlyActive === 0) {
      const activeTaskList = this.taskList.filter((task) => {
        return (
          task.taskState === "CREATED" ||
          task.taskState === "TO_BE_PULLED" ||
          task.taskState === "ALLOCATED" ||
          task.taskState === "STARTED" ||
          task.taskState === "PARTIALLY_COMPLETED"
        );
      });

      return activeTaskList;
    } else {
      return this.taskList;
    }
  }

  gotoFile(item: any) {
    // this.$router.push({
    //   name: "Root.ClientFile.ClientFileDetails",
    //   params: { clientFileNumber: item.clientFileNumber },
    // });
    Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: item.displayId,
    });
  }

  gotoTask(item: any) {
    const params = { ...this.$route.params, taskId: item.taskId };

    this.$router.push({
      name: "Root.ClientFile.FileTask.FileTaskDetails",
      params: params,
    });
  }

  getLastUpdatedTime(item: any) {
    return item.lastUserActivityTime || item.allocatedTime || item.readyTime;
  }

  pullTask(item: Data.TaskList.ToBePulledTaskGrid) {
    Action.TaskList.PullTask.execute2(
      item.taskId,
      this.userName,
      (output) => {
        this.gotoTask(item);
      },
      (err) => {},
      RemoteApiPoint.BenchApi
    );
  }
}
</script>

<style>
.v-btn {
  text-transform: unset !important;
}
</style>
