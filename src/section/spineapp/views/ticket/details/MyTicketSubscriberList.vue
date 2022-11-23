<template>
  <v-card-text>
    <my-ticket-details-tab v-model="tab"></my-ticket-details-tab>
    <!-- {{ticketTaskDetails}} -->
    <component
      v-if="showAddForm"
      :ref="addSubscriberFFormMetaData.myRefName"
      :is="addSubscriberFFormMetaData.componentName"
      :value="selectModel(addSubscriberListInput, undefined)"
      v-bind="addSubscriberFFormMetaData.props"
    ></component>

    <f-data-table
      :items="ticketTaskDetails.subscriberList"
      :headers="ticketSubscriberListColumns"
      :actions="ticketSubscriberListActions"
    >
    </f-data-table>
  </v-card-text>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import MyTicketDetailsTab from "../../../components/tab/MyTicketDetailsTab.vue";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import AttachTicketDocumentFFormMDP from "./AttachTicketDocumentFFormMDP";
import ModelVue from "@/components/generic/ModelVue";
import FForm from "@/components/generic/form/FForm.vue";
import FDataTable, { ActionType } from "@/components/generic/FDataTable.vue";
import AddSubscriberFFormMDP from "./AddSubscriberFFormMDP";

@Component({
  components: {
    MyTicketDetailsTab,
    FForm,
    FDataTable,
  },
})
export default class MyTicketSubscriberList extends ModelVue {
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
    console.log(this.ticketTaskDetails.subscriberList);
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

  

  closeAndClearAllForms() {
    this.addSubscriberListInput =
      new Data.Ticket.AddSubscriberListInput();
    this.showAddForm = false;
  }
}
</script>

<style>
</style>
