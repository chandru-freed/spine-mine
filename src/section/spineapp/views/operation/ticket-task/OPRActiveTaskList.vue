<template>
  <div class="OPRActiveTaskList">
    <component
      v-if="!!taskSearchFFormMetaData"
      :ref="taskSearchFFormMetaData.myRefName"
      :is="taskSearchFFormMetaData.componentName"
      :value="selectModel(searchTaskInput, undefined)"
      @input="(newValue) => updateModel(searchTaskInput, newValue, undefined)"
      v-bind="taskSearchFFormMetaData.props"
    ></component>

    <!-- TASK TAB -->
    <v-card flat>
      <component
        v-if="!!showAssignForm"
        :ref="assignTaskFFormMetaData.myRefName"
        :is="assignTaskFFormMetaData.componentName"
        :value="selectModel(assignTaskInput, undefined)"
        @input="(newValue) => updateModel(assignTaskInput, newValue, undefined)"
        v-bind="assignTaskFFormMetaData.props"
      ></component>
      <component
        v-if="!!showReassignForm"
        :ref="reassignTaskFFormMetaData.myRefName"
        :is="reassignTaskFFormMetaData.componentName"
        :value="selectModel(reassignTaskInput, undefined)"
        @input="
          (newValue) => updateModel(reassignTaskInput, newValue, undefined)
        "
        v-bind="reassignTaskFFormMetaData.props"
      ></component>
      <component
        v-if="!!oprActiveTaskListFDataTableMDP"
        :ref="oprActiveTaskListFDataTableMDP.myRefName"
        :is="oprActiveTaskListFDataTableMDP.componentName"
        :value="selectModel(TaskListByCidList, undefined)"
        v-bind="oprActiveTaskListFDataTableMDP.props"
      ></component>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import * as Data from "@/../src-gen/data";
import store, * as Store from "@/../src-gen/store";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";

import FBtn from "@/components/generic/FBtn.vue";

import FDataTable from "@/components/generic/table/FDataTable.vue";
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import OPRActiveTaskListFDataTableMDP from "./OPRActiveTaskListFDataTableMDP";
import AssignTaskFFormMDP from "./AssignTaskFFormMDP";
import ReassignTaskFFormMDP from "./ReassignTaskFFormMDP";
import FSnackbar from "@/fsnackbar";
import TaskSearchFFormMDP from "./TaskSearchFFormMDP";
@Component({
  components: {
    "f-btn": FBtn,
    FDataTable,
    FForm,
  },
})
export default class OPRActiveTaskList extends ModelVue {
  assignTaskInput: Data.Spine.AssignInput = new Data.Spine.AssignInput();
  reassignTaskInput: Data.Spine.ReassignInput = new Data.Spine.ReassignInput();
  searchTaskInput: Data.Spine.SearchTaskInput =
    new Data.Spine.SearchTaskInput();

  taskTableRefName: string = "oprActiveTaskListFDataTableRef";

  tab: number = 0;
  search: string = "";
  showAssignForm: boolean = false;
  showReassignForm: boolean = false;

  TaskListByCidList: Data.Spine.TaskListByCid[] = [];
  taskIdList = [];

  get oprActiveTaskListFDataTableMDP() {
    return new OPRActiveTaskListFDataTableMDP({ parent: this }).getMetaData();
  }

  get assignTaskFFormMetaData() {
    return new AssignTaskFFormMDP({
      root: this,
    }).getMetaData();
  }
  get reassignTaskFFormMetaData() {
    return new ReassignTaskFFormMDP({
      root: this,
    }).getMetaData();
  }

  get taskSearchFFormMetaData() {
    return new TaskSearchFFormMDP({ parent: this }).getMetaData();
  }

  mounted() {
    this.searchTask();
  }
  searchTask() {
    Action.Spine.SearchTask.execute(this.searchTaskInput, (output) => {
      this.TaskListByCidList = output;
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
  clearSelectedItems() {
    (this.$refs[this.taskTableRefName] as any).clearSelectedItems();
  }

  handleAssignClick(item: any) {
    this.showAssignForm = true;
    this.showReassignForm = false;
    this.taskIdList = item;
  }

  assignTask() {
    this.taskIdList.map((item: any) => {
      this.submitAssignTask(item.taskId);
    });
  }

  submitAssignTask(taskId: string) {
    this.assignTaskInput.taskId = taskId;
    Action.Spine.Assign.execute(this.assignTaskInput, (output) => {
      FSnackbar.success("Succesfully Updated");
      this.searchTask();
      this.showAssignForm = false;
      this.clearSelectedItems();
    });
  }

  handleReassignClick(item: any) {
    this.showReassignForm = true;
    this.showAssignForm = false;
    this.taskIdList = item;
  }

  reassignTask() {
    this.taskIdList.map((item: any) => {
      this.submitReassignTask(item.taskId);
    });
  }

  submitReassignTask(taskId: string) {
    this.reassignTaskInput.taskId = taskId;
    Action.Spine.Reassign.execute(this.reassignTaskInput, (output) => {
      FSnackbar.success("Succesfully Updated");
      this.searchTask();
      this.showReassignForm = false;
      this.clearSelectedItems();
    });
  }
}
</script>
