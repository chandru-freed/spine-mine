<template>
  <div class="OPRActiveTicketList">
    <!-- TASK TAB -->
    <misreports-tab :value="3"></misreports-tab>
    <v-card>
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
import MISReportsTab from "@/section/spineapp/components/tab/MISReportsTab.vue";
import OPRActiveTicketListFDataTableMDP from "./OPRActiveTicketListFDataTableMDP";
import ReassignTicketFFormMDP from "./ReassignTicketFFormMDP";
import FSnackbar from "@/fsnackbar";

@Component({
  components: {
    "f-btn": FBtn,
    FDataTable,
    FForm,
    "misreports-tab": MISReportsTab,
  },
})
export default class OPRActiveTicketList extends ModelVue {
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

  get reassignTaskFFormMetaData() {
    return new ReassignTicketFFormMDP({
      root: this,
    }).getMetaData();
  }

  mounted() {
    this.getAllTicketActiveList();
  }
  getAllTicketActiveList() {
    Action.Spine.GetAllTicketActiveList.execute((output) => {
      this.TicketListByCidList = output;
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
      this.getAllTicketActiveList();
      this.showReassignForm = false;
      this.clearSelectedItems();
    });
  }

  clearSelectedItems() {
    (this.$refs[this.taskTableRefName] as any).clearSelectedItems();
  }
}
</script>
