<template>
  <div class="ActiveTicket">
    <!-- TASK TAB -->
    <my-ticket-tab v-model="tab"></my-ticket-tab>
    <component
      v-if="!!activeTicketListFDataTableMDP"
      :ref="activeTicketListFDataTableMDP.myRefName"
      :is="activeTicketListFDataTableMDP.componentName"
      :value="selectModel(myTicketTaskList, undefined)"
      v-bind="activeTicketListFDataTableMDP.props"
    ></component>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import * as Data from "@/../src-gen/data";
import store, * as Store from "@/../src-gen/store";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";

import MyTicketTab from "../../components/tab/MyTicketTab.vue";
import FBtn from "@/components/generic/FBtn.vue";
import ActiveTicketListFDataTableMDP from "./ActiveTicketListFDataTableMDP";
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
export default class ActiveTicketList extends ModelVue {
  tab: number = 0;
  search: string = "";
  @Store.Getter.Ticket.TicketSummary.myTicketActiveList
  myTicketTaskList: Data.Ticket.MyTicketDetails[];

  get activeTicketListFDataTableMDP() {
    return new ActiveTicketListFDataTableMDP({ parent: this }).getMetaData();
  }

  mounted() {
    this.getMyTicketTaskList();
  }
  getMyTicketTaskList() {
    Action.Ticket.GetMyTicketActiveList.execute((output) => {});
  }

  gotoTask(item: any) {
    this.$router.push({
      name: "Root.MyTicket.MyTicketDetails.MyTicketCommentList",
      params: { myTicketId: item.taskId, ticketNumber: item.cid },
    });
  }
}
</script>
