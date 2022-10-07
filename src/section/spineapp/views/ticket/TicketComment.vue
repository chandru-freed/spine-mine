<template>
  <v-card-text>
    <!-- <v-card-title v-if="!isTicketActive">Comments</v-card-title> -->

    <v-col class="col-12" v-if="isTicketActive">
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

    <v-col
      class="col-12 px-6 pb-0"
      v-for="(note, index) in ticketCommentsList"
      :key="'note' + index"
    >
      <v-hover v-slot="{ hover }">
        <v-card flat :elevation="hover ? 1 : 0" color="grey lighten-4">
          <v-card-subtitle class="pb-0 pt-3">
            {{ note.comment }}</v-card-subtitle
          >
          <v-card-actions class="pt-0 pb-0">
            <v-btn color="primary" text small>
              <strong>{{ note.commentedBy }}</strong> @{{
                note.commentedTime | fromNow
              }}
            </v-btn>

            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-hover>
    </v-col>
  </v-card-text>
</template>

<script lang="ts">
import FBtn from "@/components/generic/FBtn.vue";
import Vue from "vue";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import store, * as Store from "@/../src-gen/store";
import { Prop, Component } from "vue-property-decorator";
import * as Snackbar from "node-snackbar";
@Component({
  components: { "f-btn": FBtn },
})
export default class TicketComment extends Vue {
  @Store.Getter.Ticket.TicketSummary.ticketCommentsList
  ticketCommentsList: Data.Ticket.MyTicketCommentDetails[];

  @Store.Getter.Ticket.TicketSummary.ticketTaskDetails
  ticketTaskDetails: Data.Ticket.MyTicketTaskDetails;
  addCommentInput: Data.Ticket.AddCommentOnTicketInput =
    new Data.Ticket.AddCommentOnTicketInput();

  get taskId() {
    return this.$route.params.taskId;
  }

  get isTicketActive() {
    return this.ticketTaskDetails.taskState !== "COMPLETED";
  }

  mounted() {
    this.getTicketCommentList();
    Action.Ticket.AddCommentOnTicket.interested(
      this.getTicketCommentListWithDelay()
    );
  }

  destroyed() {
    Action.Ticket.AddCommentOnTicket.notInterested(
      this.getTicketCommentListWithDelay()
    );
  }
  getTicketCommentListWithDelay() {
    return () => {
      setTimeout(() => {
        this.getTicketCommentList();
      }, 500);
    };
  }
  getTicketCommentList() {
    Action.Ticket.GetTicketCommentList.execute1(this.taskId, (output) => {
      console.log(output);
    });
  }
  addComment() {
    this.addCommentInput.taskId = this.taskId;
    Action.Ticket.AddCommentOnTicket.execute(this.addCommentInput, (output) => {
      Snackbar.show({
        text: "Succesfully added a comment",
        pos: "bottom-center",
      });
      this.addCommentInput = new Data.Ticket.AddCommentOnTicketInput();
    });
  }
}
</script>
