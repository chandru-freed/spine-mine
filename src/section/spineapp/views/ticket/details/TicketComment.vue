<template>
  <v-card flat>
    <!-- <v-card-text> -->
    <div class="justify-center align-content-start">
      <div>
        <v-textarea
          filled
          auto-grow
          label="Add Comment (CTRL + ENTER)"
          rows="3"
          placeholder="Add a Comment ..."
          outlined
          v-model="addCommentInput.comment"
          append-icon="mdi-send"
          @keypress.ctrl.enter="addComment"
          @click:append="addComment"
          :disabled="ticketCompleted"
          hint="CTRL + ENTER"
        >
        </v-textarea>
      </div>
    </div>
    <div class="justify-center align-content-start">
      <div>
        <v-list two-line>
          <template v-for="(ticketComment, index) in ticketCommentsList">
            <v-list-item :key="'comment' + index">
              <template v-slot:default="{}">
                <v-list-item-content disabled>
                  <v-list-item-title>{{
                    ticketComment.comment
                  }}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-action-text class="grey--text"
                    >{{ ticketComment.commentedTime | datetime }}
                    <v-chip x-small label class="px-1"
                      >@{{ ticketComment.commentedBy }}</v-chip
                    >
                  </v-list-item-action-text>
                </v-list-item-action>
              </template>
            </v-list-item>
            <v-divider
              v-if="index < ticketCommentsList.length - 1"
              :key="index"
            ></v-divider>
          </template>
        </v-list>
      </div>
    </div>
    <!-- </v-card-text> -->
  </v-card>
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
  @Prop({
    default: false,
  })
  ticketCompleted: boolean;
  @Store.Getter.Ticket.TicketSummary.ticketCommentsList
  ticketCommentsList: Data.Ticket.MyTicketCommentDetails[];

  @Store.Getter.Ticket.TicketSummary.ticketTaskDetails
  ticketTaskDetails: Data.Ticket.MyTicketTaskDetails;
  addCommentInput: Data.Ticket.AddCommentOnTicketInput =
    new Data.Ticket.AddCommentOnTicketInput();

  get ticketId() {
    return this.$route.params.myTicketId;
  }

  get isTicketActive() {
    return this.ticketTaskDetails.taskState !== "COMPLETED";
  }

  public getTicketCommentListHandler = (output: any) => {
    setTimeout(() => {
      this.getTicketCommentList();
    }, 500);
  };

  mounted() {
    this.getTicketCommentList();
    Action.Ticket.AddCommentOnTicket.interested(
      this.getTicketCommentListHandler
    );

    Action.Ticket.ReassignTicket.interested(
      this.getTicketCommentListHandler
    );
  }

  destroyed() {
    Action.Ticket.AddCommentOnTicket.notInterested(
      this.getTicketCommentListHandler
    );
    Action.Ticket.ReassignTicket.notInterested(
      this.getTicketCommentListHandler
    );
  }
  // getTicketCommentListWithDelay() {
  //   return () => {
  //     setTimeout(() => {
  //       this.getTicketCommentList();
  //     }, 500);
  //   };
  // }
  getTicketCommentList() {
    Action.Ticket.GetTicketCommentList.execute1(this.ticketId, (output) => {
    });
  }
  addComment() {
    this.addCommentInput.ticketId = this.ticketId;
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
