<template>
  <div class="CompletedTicket">
    <!-- TASK TAB -->
    <my-ticket-tab v-model="tab"></my-ticket-tab>
    <!-- TASK TAB -->
    <component
      v-if="!!completedTicketListFDataTableMDP"
      :ref="completedTicketListFDataTableMDP.myRefName"
      :is="completedTicketListFDataTableMDP.componentName"
      :value="selectModel(myCompletedTicketTaskList, undefined)"
      v-bind="completedTicketListFDataTableMDP.props"
    ></component>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import store, * as Store from "@/../src-gen/store";
import MyTicketTab from "../../components/tab/MyTicketTab.vue";
import FBtn from "@/components/generic/FBtn.vue";
import CompletedTicketListFDataTableMDP from "./CompletedTicketListFDataTableMDP";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
@Component({
  components: {
    "my-ticket-tab": MyTicketTab,
    "f-btn": FBtn,
    FDataTable,
    FForm,
  },
})
export default class CompletedTicketList extends ModelVue {
  tab: number = 1;

  search: string = "";
  @Store.Getter.Ticket.TicketSummary.myTicketCompletedList
  myCompletedTicketTaskList: Data.Ticket.MyTicketDetails[];

  get completedTicketListFDataTableMDP() {
    return new CompletedTicketListFDataTableMDP({ parent: this }).getMetaData();
  }

  mounted() {
    this.getMyTicketTaskList();
  }
  getMyTicketTaskList() {
    Action.Ticket.GetMyTicketCompletedList.execute((output) => {});
  }

  gotoTask(item: any) {
    this.$router.push({
      name: "Root.MyTicket.MyTicketDetails.MyTicketCommentList",
      params: { myTicketId: item.taskId, ticketNumber: item.cid },
    });
  }
}
</script>
