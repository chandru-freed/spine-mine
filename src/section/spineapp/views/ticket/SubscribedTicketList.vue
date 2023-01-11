<template>
  <div class="CompletedTicket">
    <!-- TASK TAB -->
    <my-ticket-tab v-model="tab"></my-ticket-tab>
    <!-- TASK TAB -->

    <component
      v-if="!!subscribedTicketListFDataTableMDP"
      :ref="subscribedTicketListFDataTableMDP.myRefName"
      :is="subscribedTicketListFDataTableMDP.componentName"
      :value="selectModel(myTicketSubscribedList, undefined)"
      v-bind="subscribedTicketListFDataTableMDP.props"
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
import SubscribedTicketListFDataTableMDP from "./SubscribedTicketListFDataTableMDP";
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
export default class SubscribedTicketList extends ModelVue {
  tab: number = 1;

  search: string = "";

  @Store.Getter.Ticket.TicketSummary.myTicketSubscribedList
  myTicketSubscribedList: Data.Ticket.MyTicketDetails[];

  get subscribedTicketListFDataTableMDP() {
    return new SubscribedTicketListFDataTableMDP({
      parent: this,
    }).getMetaData();
  }

  mounted() {
    this.getMyTicketTaskList();
  }
  getMyTicketTaskList() {
    Action.Ticket.GetMyTicketSubscribedList.execute((output) => {});
  }

  gotoTask(item: any) {
    this.$router.push({
      name: "Root.MyTicket.MyTicketDetails.MyTicketCommentList",
      params: { myTicketId: item.taskId, ticketNumber: item.cid },
    });
  }
}
</script>
