<template>
  <v-card flat>
    <div class="row">
      <div class="col-12">
        <!-- <v-autocomplete
        v-model="selectedTask"
        :items="availableTaskList"
        dense
        filled
        label="Filled"
      ></v-autocomplete> -->
        <!-- {{selectedComponent}} -->
      </div>
    </div>
    <v-card-actions class="pb-0">
      <v-btn text @click="gotoFile">
        <v-icon>mdi-chevron-left</v-icon> All Tasks</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn
        outlined
        color="primary"
        @click="startTask"
        v-if="taskDetails.taskState === 'ALLOCATED'"
        >START</v-btn
      >

      <v-btn
        outlined
        color="primary"
        @click="pullTask"
        v-if="taskDetails.taskState === 'TO_BE_PULLED'"
        >PULL</v-btn
      >
    </v-card-actions>
    <v-card-text class="pa-0">
      <!-- {{taskDetails}} -->
      <component
        :disabled="taskFormDisabled"
        :is="selectedComponent"
      ></component>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";

import CollectClientInfoTask from "@/section/spineapp/components/task/enrollment/CollectClientInfoTask.vue";
import ProvideFirstNumberTask from "@/section/spineapp/components/task/sample/ProvideFirstNumberTask.vue";

import * as RemoteApiPoint from "@/remote-api-point";

@Component({
  components: {
    CollectClientInfoTask,
    ProvideFirstNumberTask
  },
})
export default class FileTaskArea extends Vue {
  @Store.Getter.Login.LoginDetails.userName userName: string;

  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  availableTaskList = ["CollectClientInfoTask"];

  TASK_COMPONENT_MAP = new Map([["ProvideFirstNumber", "ProvideFirstNumberTask"]]);

  taskId = this.$route.params.taskId;

  get selectedComponent() {
    return this.TASK_COMPONENT_MAP.get(this.taskDetails.taskName);
  }

  get taskFormDisabled() {
    return !(
      this.taskDetails.taskState === "STARTED" ||
      this.taskDetails.taskState === "PARTIALLY_COMPLETED"
    );
  }

  public getExecutiveTaskDetailsHandler = (output: string) =>
    this.getExecutiveTaskDetails();

  public mounted() {
    Action.TaskList.PullTask.interested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.Start.interested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.Save.interested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.Complete.interested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.SaveAndComplete.interested(
      this.getExecutiveTaskDetailsHandler
    );
    Action.TaskList.Suspend.interested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.Resume.interested(this.getExecutiveTaskDetailsHandler);

    this.buildTaskMap();

    this.getExecutiveTaskDetails();
  }

  buildTaskMap() {
    this.TASK_COMPONENT_MAP.set("CollectClientInfo", "CollectClientInfoTask");
    this.TASK_COMPONENT_MAP.set(
      "ClientInfoVerification",
      "ClientInfoVerificationTask"
    );
  }

  getExecutiveTaskDetails() {
    Action.TaskList.GetExecutiveTaskDetails.execute1(
      this.$route.params.taskId,
      (output) => {
        // console.log(output);
      },
      (err) => {
        // console.error(err);
      },
      RemoteApiPoint.BenchApi
    );
  }

  startTask() {
    Action.TaskList.Start.execute1(
      this.$route.params.taskId,
      (output) => {},
      (err) => {
        // console.error(err);
      },
      RemoteApiPoint.BenchApi
    );
  }

  pullTask() {
    Action.TaskList.PullTask.execute2(
      this.$route.params.taskId,
      this.userName,
      (output) => {
        // this.gotoTask(item);
      },
      (err) => {
        // console.error(err);
      },
      RemoteApiPoint.BenchApi
    );
  }

  gotoFile() {
    this.$router.push({
      name: "Root.ClientFile.ClientFileDetails",
      params: { fileId: this.$route.params.fileId },
    });
  }

  gotoTask(item: any) {
    const params = { ...this.$route.params, taskId: item.taskId };
    // console.log(" gotoTask ------------------ ");
    // console.log(params);
    this.$router.push({
      name: "Root.ClientFile.FileTask.FileTaskDetails",
      params: params,
    });
  }

  public destroyed() {
    Action.TaskList.PullTask.notInterested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.Start.notInterested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.Save.notInterested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.Complete.notInterested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.SaveAndComplete.notInterested(
      this.getExecutiveTaskDetailsHandler
    );
    Action.TaskList.Suspend.notInterested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.Resume.notInterested(this.getExecutiveTaskDetailsHandler);
  }
}
</script>

<style></style>
