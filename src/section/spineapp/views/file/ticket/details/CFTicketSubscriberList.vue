<template>
  <div>
    <cf-ticket-details-tab v-model="tab"></cf-ticket-details-tab>
    <v-card flat outlined class="my-3" v-if="showAddForm">
      <component
        :ref="addSubscriberFFormMetaData.myRefName"
        :is="addSubscriberFFormMetaData.componentName"
        :value="selectModel(addSubscriberListInput, undefined)"
        v-bind="addSubscriberFFormMetaData.props"
      ></component>
    </v-card>
    <v-card flat>
      <component
      v-if="ticketTaskDetails.subscriberList"
      :ref="subscriberTableMetaData.myRefName"
      :is="subscriberTableMetaData.componentName"
      :value="ticketTaskDetails.subscriberList"
      v-bind="subscriberTableMetaData.props"
    ></component>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";

import ModelVue from "@/components/generic/ModelVue";
import FForm from "@/components/generic/form/FForm.vue";
import FDataTable, { ActionType } from "@/components/generic/table/FDataTable.vue";
import CFTicketDetailsTab from "@/section/spineapp/components/tab/CFTicketDetailsTab.vue";
import AddSubscriberFFormMDP from "@/section/spineapp/views/ticket/details/AddSubscriberFFormMDP";
import MTSubscriberListFTableMDP from "../../../ticket/details/MTSubscriberListFTableMDP";

@Component({
  components: {
    FForm,
    FDataTable,
    "cf-ticket-details-tab": CFTicketDetailsTab,
  },
})
export default class CFTicketSubscriberList extends ModelVue {
  public tab: number = 2;
  @Store.Getter.Ticket.TicketSummary.ticketTaskDetails
  ticketTaskDetails: Data.Ticket.MyTicketDetails;

  ticketId: string = this.$route.params.myTicketId;
  addSubscriberListInput: Data.Ticket.AddSubscriberListInput =
    new Data.Ticket.AddSubscriberListInput();
  showAddForm: boolean = false;

  ticketSubscriberListColumns = [
    { text: "Name", value: "fullName" },
    { text: "Email Id", value: "emailId" },
    { text: "Mobile", value: "mobile" },
  ];

  ticketSubscriberListActions = [
    {
      type: ActionType.ADD,
      onClick: () => this.handleAddClick(),
      label: "Add Subscriber",
    },
  ];

  mounted() {
  }

  handleAddClick() {
    this.showAddForm = true;
  }
  addSubscriber() {
    this.addSubscriberListInput.ticketId = this.ticketId;
    Action.Ticket.AddSubscriberList.execute(
      this.addSubscriberListInput,
      (output) => {
        this.closeAndClearAllForms();
      }
    );
  }

  get addSubscriberFFormMetaData() {
    return new AddSubscriberFFormMDP({
      root: this,
    }).getMetaData();
  }

   get subscriberTableMetaData() {
    return new MTSubscriberListFTableMDP({root: this}).getMetaData();
  }

  closeAndClearAllForms() {
    this.addSubscriberListInput = new Data.Ticket.AddSubscriberListInput();
    this.showAddForm = false;
  }
}
</script>

<style>
</style>
