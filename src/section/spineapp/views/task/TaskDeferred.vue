<template>
  <!-- TASK TAB -->
  <v-card class="pa-0 ma-0" color="white" outlined min-height="800px">
    <task-tab></task-tab>
    <v-data-table
      min-height="600px"
      :headers="headers"
      :items="taskList"
      sort-by="taskId"
      class="elevation-0"
      :search="search"
      v-model="selected"
      :single-select="false"
      show-select
      item-key="taskId"
      :disable-pagination="true"
      hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-col class="col-2">
            <v-select
              :disabled="selected.length === 0"
              :items="['Delete', 'Edit', 'Send']"
              label="Bulk Actions"
              single-line
              hide-details
              outlined
              rounded
              dense
            ></v-select>
          </v-col>
          <v-col class="col-7"></v-col>
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
      <template v-slot:item.taskName="{ item }">
        <f-btn :label="item.taskName" text color="primary" :onClick="()=>gotoTask(item)">
        </f-btn>
      </template>
      <template v-slot:item.displayId="{ item }">
        <f-btn :label="item.displayId" text color="secondary" :onClick="()=>gotoFile(item)">
        </f-btn>
      </template>
      <template v-slot:item.priority="{ item }">
        <v-chip label small>
          {{ item.priority }}
        </v-chip>
      </template>

      <template v-slot:item.readyTime="{ item }">
        <span class="grey--text">
          {{ item.readyTime | (date - time) }} ({{ item.readyTime | fromNow }})
        </span>
      </template>

      <template v-slot:item.actions="{ item }">
        <f-btn label="PULL" outlined small color="secondary" :onClick="pullTask(item)"></f-btn
        >
      </template>
      <!-- <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small class="mr-2" @click="deleteItem(item)">
            mdi-delete
          </v-icon>
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
        </template> -->
      <template v-slot:no-data> No Tasks Available </template>
    </v-data-table>
  </v-card>
  <!--  TASK TAB -->
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
// import store, * as Store from '@/../src-gen/store';
// import * as Data from '@/../src-gen/data';
// import * as ServerData from '@/../src-gen/server-data';
// import * as Action from '@/../src-gen/action';
import TaskTab from "@/section/spineapp/components/task/TaskTab.vue";

import moment from "moment";
import FBtn from "@/components/generic/FBtn.vue";

@Component({
  components: {
    "task-tab": TaskTab,
    "f-btn":FBtn
  },
})
export default class TaskDeferred extends Vue {
  public tab = 0;

  selected = [];
  search = "";
  headers = [
    { text: "File Number", value: "cid" },
    { text: "Client", value: "displayId" },
    {
      text: "Task",
      align: "start",
      sortable: false,
      value: "taskName",
    },
    { text: "Priority", value: "priority" },
    // { text: "Status", value: "taskStatus" },
    { text: "Ready On", value: "readyTime" },
    // { text: "Is Suspended", value: "isSuspended" },
    // { text: "Created On", value: "createdOn" },
    { text: "Actions", value: "actions", sortable: false },
  ];
  taskList = [];

  mounted() {
    this.initialize();
  }

  initialize() {
    this.taskList = [];
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

  getColor(calories: any) {
    if (calories > 400) return "red";
    else if (calories > 200) return "orange";
    else return "green";
  }

  gotoFile(item: any) {
    this.$router.push({
      name: "Root.ClientFile.Workarea",
      params: { clientFileNumber: item.cid },
    });
  }

  gotoTask(item: any) {
    this.$router.push({
      name: "Root.TaskList.Task.TaskDetails",
      params: { taskId: item.taskId },
    });
  }

  pullTask(item: any) {
    this.$router.push({
      name: "Root.TaskList.Task.TaskDetails",
      params: { taskId: item.taskId },
    });
  }
}
</script>

<style>
.f-btn {
  text-transform: unset !important;
}
</style>
