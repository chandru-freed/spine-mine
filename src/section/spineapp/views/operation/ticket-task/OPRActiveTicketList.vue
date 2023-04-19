<template>
  <div class="OPRActiveTicketList">
    <component
      v-if="!!ticketSearchFFormMetaData"
      :ref="ticketSearchFFormMetaData.myRefName"
      :is="ticketSearchFFormMetaData.componentName"
      :value="selectModel(searchTicketInput, undefined)"
      @input="(newValue) => updateModel(searchTicketInput, newValue, undefined)"
      v-bind="ticketSearchFFormMetaData.props"
    ></component>

    <!-- TASK TAB -->
    <v-card flat>
      <component
        v-if="!!showReassignForm"
        :ref="reassignTaskFFormMetaData.myRefName"
        :is="reassignTaskFFormMetaData.componentName"
        :value="selectModel(reAssignTicketInput, undefined)"
        @input="
          (newValue) => updateModel(reAssignTicketInput, newValue, undefined)
        "
        v-bind="reassignTaskFFormMetaData.props"
      ></component>
      <component
        v-if="!!oprActiveTicketListFDataTableMDP"
        :ref="oprActiveTicketListFDataTableMDP.myRefName"
        :is="oprActiveTicketListFDataTableMDP.componentName"
        :value="selectModel(TicketListByCidList, undefined)"
        v-bind="oprActiveTicketListFDataTableMDP.props"
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
import OPRActiveTicketListFDataTableMDP from "./OPRActiveTicketListFDataTableMDP";
import ReassignTicketFFormMDP from "./ReassignTicketFFormMDP";
import FSnackbar from "@/fsnackbar";
import TicketSearchFFormMDP from "./TicketSearchFFormMDP";

@Component({
  components: {
    "f-btn": FBtn,
    FDataTable,
    FForm,
  },
})
export default class OPRActiveTicketList extends ModelVue {
  searchTicketInput: Data.Spine.SearchTicketInput =
    new Data.Spine.SearchTicketInput();

  reAssignTicketInput: Data.Ticket.ReAssignTicketInput =
    new Data.Ticket.ReAssignTicketInput();

  tab: number = 0;
  search: string = "";
  showReassignForm: boolean = false;
  taskTableRefName: string = "oprActiveTicketListFDataTableRef";

  taskIdList = [];

  TicketListByCidList: Data.Spine.MyTicketDetails[] = [];

  get oprActiveTicketListFDataTableMDP() {
    return new OPRActiveTicketListFDataTableMDP({ parent: this }).getMetaData();
  }

  get ticketSearchFFormMetaData() {
    return new TicketSearchFFormMDP({ parent: this }).getMetaData();
  }

  get reassignTaskFFormMetaData() {
    return new ReassignTicketFFormMDP({
      root: this,
    }).getMetaData();
  }

  mounted() {
    this.searchTicket();
  }
  searchTicket() {
    const searchTicketInput = Data.Spine.SearchTicketInput.fromJson(this.searchTicketInput.toJson());
    searchTicketInput.ticketState = searchTicketInput.ticketState.flat();
    Action.Spine.SearchTicket.execute(searchTicketInput, (output) => {
      this.TicketListByCidList = output;
    });
  }

  // getAllTicketActiveList() {
  //   Action.Spine.GetAllTicketActiveList.execute((output) => {
  //     this.TicketListByCidList = output;
  //   });
  // }

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

  handleReassignClick(item: any) {
    this.showReassignForm = true;
    this.taskIdList = item;
  }

  reassignTask() {
    this.taskIdList.map((item: any) => {
      this.submitReassignTicket(item.taskId);
    });
  }

  submitReassignTicket(taskId: string) {
    this.reAssignTicketInput.taskId = taskId;
    Action.Ticket.ReassignTicket.execute(this.reAssignTicketInput, (output) => {
      FSnackbar.success("Succesfully Updated");
      this.searchTicket();
      this.showReassignForm = false;
      this.clearSelectedItems();
    });
  }

  clearSelectedItems() {
    (this.$refs[this.taskTableRefName] as any).clearSelectedItems();
  }
}
</script>
