<template>
  <div>
    <v-card flat outlined>
      <v-card-text >
        <v-card-title>Ticket Summary</v-card-title>
         <component
          v-if="!!ticketSummaryFormMetaData"
          :ref="ticketSummaryFormMetaData.myRefName"
          :is="ticketSummaryFormMetaData.componentName"
          v-model="ticketTaskDetails.taskInput"
          v-bind="ticketSummaryFormMetaData.props"
        ></component>
      </v-card-text>
      <v-card-text >
        <v-card-title>Comments</v-card-title>
        <v-col class="col-12">
      <v-toolbar flat class="mt-5" color="white">
        <v-textarea
          filled
          auto-grow
          label="Comment"
          rows="2"
          
          placeholder="Add a comment ..."
          outlined
          v-model="addCommentInput.comment"
        >
          <template v-slot:append>
            <f-btn
              label="Comment"
              :disabled="addCommentInput.comment.length < 2"
              class="mx-0"
              depressed
              :onClick="() => addComment()"
              color="secondary"
            >
            </f-btn>
          </template>
        </v-textarea>
      </v-toolbar>
    </v-col>
      </v-card-text>
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
import * as Snackbar from 'node-snackbar';
import TicketSummaryFFormMDP from './TicketSummaryFFormMDP';
import FBtn from "@/components/generic/FBtn.vue";
@Component({
  components: {
    FForm,
    "f-btn": FBtn
  }
})
export default class TicketAssignedToMe extends Vue {
  @Store.Getter.Ticket.TicketSummary.ticketTaskDetails
  ticketTaskDetails: Data.Ticket.MyTicketTaskDetails
  addCommentInput: Data.Ticket.AddCommentOnTicketInput = new Data.Ticket.AddCommentOnTicketInput();

  get ticketSummaryFormMetaData() {
    return new TicketSummaryFFormMDP({root: this}).getMetaData();
  }

  get taskId() {
    return this.$route.params.taskId;
  }
  mounted() {
    this.getMyTicketTaskDetails();
    this.getTicketCommentList();
    Action.Ticket.AddCommentOnTicket.interested(this.getTicketCommentListWithDelay())
  }


  getTicketCommentListWithDelay() {
    return () => {
      setTimeout(() => {
        this.getTicketCommentList();
      }, 500);
    }
  }
  getTicketCommentList() {
    Action.Ticket.GetTicketCommentList.execute1(this.taskId, output => {
      console.log(output)
    });
  }
  getMyTicketTaskDetails() {
    Action.Ticket.GetMyTicketTaskDetails.execute1(this.taskId, output => {
    });
  }

  addComment() {
    this.addCommentInput.taskId = this.taskId;
    Action.Ticket.AddCommentOnTicket.execute(this.addCommentInput, (output) => {
      Snackbar.show({
        text: "Succesfully added a comment",
        pos: "bottom-center"
      });
    });
  }

  goBack() {
    this.$router.back();
  }
}
</script>
