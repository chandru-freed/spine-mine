<template>
  <div>
    <!-- CLOSE TICKET -->
    <v-alert text class="ma-5" color="primary" v-if="closeTicketDialog">
      <div class="text-center py-3">
        Are you sure want to close this ticket?
      </div>
      <div
        class="d-flex flex-row align-start flex-wrap justify-space-around pa-2"
      >
        <FBtn
          label="Cancel"
          :on-click="() => (closeTicketDialog = false)"
          outlined
          color="primary"
        />
        <FBtn
          label="Close Ticket"
          :on-click="() => closeTicket()"
          outlined
          color="primary"
        />
      </div>
    </v-alert>
    <!-- CLOSE TICKET -->
    <!-- ASSIGN TICKET -->
    <v-card flat class="my-3" outlined v-if="reAssignTicketDialog">
      <v-card-title>Re Assign Ticket<v-spacer /> </v-card-title>
      <component
        v-if="!!reAssignTicketFormMetaData"
        :ref="reAssignTicketFormMetaData.myRefName"
        :is="reAssignTicketFormMetaData.componentName"
        v-model="reAssignTicketInput"
        v-bind="reAssignTicketFormMetaData.props"
      ></component>
    </v-card>
    <!-- ASSIGN TICKET -->

    <v-card flat outlined>
        <v-card-title
          >Ticket Summary<v-spacer />
          <v-btn
            class="mx-2"
            v-if="taskSummary.clientFileNumber"
            color="primary"
            @click="gotoFile"
            text
            >Go To File</v-btn
          >

          <v-btn
            color="primary"
            class="mx-2"
            @click="reAssignClicked()"
            outlined
            :disabled="taskCompleted"
            >Assign</v-btn
          >
          <v-btn
            :disabled="taskCompleted"
            color="primary"
            class="mx-2"
            @click="closeTicketDialog = true"
            >Close Ticket</v-btn
          >
        </v-card-title>
        <component
          v-if="!!ticketSummaryFormMetaData"
          :ref="ticketSummaryFormMetaData.myRefName"
          :is="ticketSummaryFormMetaData.componentName"
          v-model="taskSummary"
          v-bind="ticketSummaryFormMetaData.props"
        ></component>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import store, * as Store from "@/../src-gen/store";
// import AddCommentFFormMDP from './AddCommentFFormMDP';
import FForm from "@/components/generic/form/FForm.vue";
import * as Snackbar from "node-snackbar";
import TicketSummaryFFormMDP from "./TicketSummaryFFormMDP";
import FBtn from "@/components/generic/FBtn.vue";
import TicketComment from "./TicketComment.vue";
import ReAssignTicketFFormMDP from "./ReAssignTicketFFormMDP";
import FFooTab from "@/components/generic/FFooTab.vue";
@Component({
  components: {
    FForm,
    FBtn,
    "ticket-comment": TicketComment,
  },
})
export default class MyTicketTaskDetails extends Vue {
  @Store.Getter.Ticket.TicketSummary.ticketTaskDetails
  ticketTaskDetails: Data.Ticket.MyTicketDetails;

  @Store.Getter.Ticket.TicketSummary.ticketCommentsList
  ticketCommentsList: Data.Ticket.MyTicketCommentDetails[];

  reAssignTicketDialog: boolean = false;
  closeTicketDialog: boolean = false;
  reAssignTicketInput: Data.Ticket.ReAssignTicketInput =
    new Data.Ticket.ReAssignTicketInput();

  get ticketSummaryFormMetaData() {
    return new TicketSummaryFFormMDP({ root: this }).getMetaData();
  }

  get reAssignTicketFormMetaData() {
    return new ReAssignTicketFFormMDP({ root: this }).getMetaData();
  }

  get taskId() {
    return this.$route.params.myTicketId;
  }

  get taskSummary(): any {
    return this.ticketTaskDetails;
  }

  get taskCompleted() {
    return this.ticketTaskDetails.taskState === "COMPLETED";
  }
  mounted() {
    this.getMyTicketTaskDetails();
    Action.Ticket.CloseTicket.interested(
      this.getMyTicketTaskDetailsWithDelay()
    );

    Action.Ticket.AddSubscriberList.interested(
      this.getMyTicketTaskDetailsWithDelay()
    );
  }

  public destroyed() {
    Action.Ticket.CloseTicket.notInterested(
      this.getMyTicketTaskDetailsWithDelay()
    );

    Action.Ticket.AddSubscriberList.notInterested(
      this.getMyTicketTaskDetailsWithDelay()
    );
  }

  getMyTicketTaskDetails() {
    Action.Ticket.GetMyTicketTaskDetails.execute1(this.taskId, (output) => {});
  }

  getMyTicketTaskDetailsWithDelay() {
    return () => {
      setTimeout(() => {
        this.getMyTicketTaskDetails();
      }, 1000);
    };
  }

  reAssignTicket() {
    this.reAssignTicketInput.taskId = this.taskId;
    Action.Ticket.ReassignTicket.execute(this.reAssignTicketInput, (output) => {
      this.reAssignTicketDialog = false;
      Snackbar.show({
        text: "Succesfully reassigned",
        pos: "bottom-center",
      });
    });
  }

  reAssignClicked() {
    this.reAssignTicketInput = new Data.Ticket.ReAssignTicketInput();
    this.reAssignTicketDialog = true;
  }
  goBack() {
    this.$router.back();
  }
  cancelReAssignTicket() {
    this.reAssignTicketDialog = false;
  }
  closeTicket() {
    Action.Ticket.CloseTicket.execute2(this.taskId, undefined, (output) => {
      Snackbar.show({
        text: "Succesfully closed the ticket",
        pos: "bottom-center",
      });
      this.closeTicketDialog = false;
    });
  }

  gotoFile() {
    this.$router.push({
      name: "Root.ClientFile.Workarea",
      params: { clientFileNumber: this.taskSummary.clientFileNumber },
    });
  }
}
</script>
