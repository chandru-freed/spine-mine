<template>
  <div class="row">
    <div class="col-12">
      <v-card outlined max-height="200px" class="overflow-y-auto">
        <v-card-text class="py-1">
          Sales Rep :
          <v-chip
            class="ml-1"
            color="secondary"
            outlined
            x-small
            label
            v-if="clientFileBasicInfo.assignedSalesRep"
            >{{ clientFileBasicInfo.assignedSalesRep }}</v-chip
          ></v-card-text
        >
        <v-divider class="" />
        <v-card-text class="py-1">
          RM :
          <v-chip
            class="mr-1"
            color="secondary"
            outlined
            x-small
            label
            v-if="clientFileBasicInfo.assignedRM"
            >{{ clientFileBasicInfo.assignedRM }}</v-chip
          ></v-card-text
        >
      </v-card>
    </div>
    <div class="col-12">
      <v-card outlined max-height="200px" class="overflow-y-auto">
        <v-card-text class="py-1 d-flex align-center">
          Active Tasks <v-spacer />
          <v-btn-toggle mandatory dense>
            <v-btn x-small @click="gotoTaskActiveList"> Active </v-btn>
            <v-btn x-small @click="gotoTaskCompletedList"> Completed </v-btn>
          </v-btn-toggle>
          <!-- <v-btn icon @click="gotoTaskList"
            ><v-icon small> mdi-open-in-new</v-icon></v-btn
          > -->
        </v-card-text>
        <v-divider />
        <v-card-text
          class="d-flex justify-center"
          v-if="cfTaskList.length == 0"
        >
          No Task to display
        </v-card-text>
        <v-list dense class="py-0" v-if="cfTaskList.length">
          <v-list-item v-for="(cfTask, j) in cfTaskList" :key="j">
            <v-list-item-content class="pa-0">
              <v-list-item-title>
                <v-btn
                color="primary"
                  class="px-0 text-left"
                  text
                  small
                  @click="gotoTaskDetails(cfTask)"
                >
                  <!-- <v-icon
                    v-if="taskStateIconMap[cfTask.taskState]?.icon"
                    class="mr-3"
                    :color="taskStateIconMap[cfTask.taskState]?.color"
                    >{{ taskStateIconMap[cfTask.taskState]?.icon }}</v-icon
                  >

                  <v-icon color="grey" class="mr-3" v-else
                    >mdi-pencil-circle-outline</v-icon
                  > -->

                  {{ cfTask.taskName }}
                </v-btn>
               
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
               <v-chip outlined x-small><v-icon
                small
                    v-if="taskStateIconMap[cfTask.taskState]?.icon"
                    class="mr-1"
                    :color="taskStateIconMap[cfTask.taskState]?.color"
                    >{{ taskStateIconMap[cfTask.taskState]?.icon }}</v-icon
                  >

                  <v-icon small color="grey" class="mr-1" v-else
                    >mdi-pencil-circle-outline</v-icon
                  > <span class="grey--text">{{cfTask.taskState}}</span>
                </v-chip>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                v-if="!cfTask.allocatedTo && cfTask.taskType === 'MANUAL'"
                @click="() => pullStartAndMerge(cfTask)"
                dense
                outlined
                x-small
                color="primary"
                >Start</v-btn
              >
              <!-- <v-icon small> mdi-chevron-right </v-icon> -->
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </div>

    <div class="col-12">
      <v-card outlined max-height="200px" class="overflow-y-auto">
        <v-card-text class="py-1 d-flex align-center">
          <CFActionList :useAsDropDown="true" /> <v-spacer />
          <v-btn-toggle mandatory dense>
            <v-btn x-small @click="gotoActionList"> All </v-btn>
          </v-btn-toggle>
          <!-- <v-btn icon @click="gotoActionList"
            ><v-icon small> mdi-open-in-new</v-icon></v-btn
          > -->
        </v-card-text>
        <v-divider />
        <v-list dense class="py-0">
          <v-list-item
            v-for="(actionItem, j) in actionList"
            :key="j"
            @click="takeAction(actionItem)"
          >
            <v-list-item-content class="pa-0">
              <v-list-item-title>{{ actionItem.actionName }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon
                small
                v-if="actionItem.icon"
                v-text="actionItem.icon"
              ></v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </div>

    <div class="col-12">
      <v-card outlined>
        <v-card-text class="py-1 d-flex align-center">
          Notes <v-spacer />
          <v-btn-toggle mandatory dense>
            <v-btn x-small @click="gotoNotes"> Notes </v-btn>
            <v-btn x-small @click="gotoNotesHighlight"> Highlighted </v-btn>
          </v-btn-toggle>
          <!-- <v-btn icon @click="gotoNotes"
            ><v-icon small> mdi-open-in-new</v-icon></v-btn
          > -->
        </v-card-text>
        <v-divider />
        <v-card-text class="pa-1">
          <v-textarea
            hide-details
            filled
            auto-grow
            label="Add Note (Ctrl + Enter)"
            rows="2"
            placeholder="Add a note ..."
            outlined
            v-model="addNoteInput.noteMessage"
            append-icon="mdi-send"
            @keypress.ctrl.enter="addNote"
            @click:append="addNote"
            hint="Press CTRL + ENTER"
          ></v-textarea>
          <div>
            <v-list max-height="140px" class="overflow-y-auto">
              <template v-for="(note, index) in fiNoteList">
                <v-list-item :key="'note' + index" dense>
                  <template>
                    <v-list-item-content disabled>
                      <v-list-item-subtitle
                        v-text="note.noteMesssage"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-list-item>

                <v-divider
                  v-if="index < fiNoteList.length - 1"
                  :key="index"
                ></v-divider>
              </template>
            </v-list>
          </div>
        </v-card-text>
      </v-card>
    </div>
    <div class="col-12">
      <v-card outlined>
        <v-card-text class="py-1 d-flex align-center">
          Tickets <v-spacer />
          <v-btn-toggle mandatory dense>
            <v-btn x-small @click="gotoActiveTicket"> Active </v-btn>
            <v-btn x-small @click="gotoCompletedTicket"> Completed </v-btn>
            <v-btn x-small @click="gotoSubscribedTicket"> Subscribed </v-btn>
          </v-btn-toggle>
          <!-- <v-btn icon @click="gotoTicket"
            ><v-icon small> mdi-open-in-new</v-icon></v-btn
          > -->
        </v-card-text>
        <v-divider />
        <v-card-text class="pa-1">
          <div>
            <v-card-text
              class="d-flex justify-center"
              v-if="myTicketActiveList.length == 0"
            >
              No Tickets to display
            </v-card-text>
            <v-list
              max-height="140px"
              class="overflow-y-auto"
              v-if="myTicketActiveList.length"
            >
              <template v-for="(myTicket, index) in myTicketActiveList">
                <v-list-item :key="'myTicket' + index" dense class="px-0">
                  <v-list-item-content>
                    <div class="d-flex justify-space-between align-center pa-0">
                      <f-btn
                        :label="myTicket.cid"
                        text
                        color="secondary"
                        small
                        :onClick="() => gotoTicketDetails(myTicket)"
                      ></f-btn>
                      <v-card-subtitle class="grey--text pa-0">
                        {{ myTicket.sla | date }}
                      </v-card-subtitle>
                      <v-chip outlined circle class="grey--text">{{
                        myTicket.priority
                      }}</v-chip>
                    </div>
                  </v-list-item-content>
                </v-list-item>

                <v-divider
                  v-if="index < myTicketActiveList.length - 1"
                  :key="index"
                ></v-divider>
              </template>
            </v-list>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import Helper from "../../util/Helper";
import AmeyoToolbarDialog from "@/components/generic/ameyo/AmeyoToolbarDialog.vue";
import CFActionList from "./action/CFActionList.vue";
import FBtn from "@/components/generic/FBtn.vue";

@Component({
  components: {
    AmeyoToolbarDialog,
    CFActionList,
    "f-btn": FBtn,
  },
})
export default class CFQuickNav extends Vue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.FiNote.FiNoteStore.fiHighlightedNoteList
  fiHighlightedNoteList: Data.FiNote.FiNote[];

  @Store.Getter.FiNote.FiNoteStore.fiNoteList
  fiNoteList: Data.FiNote.FiNote[];

  @Store.Getter.ClientFile.ClientFileSummary.fileSummary
  fileSummary: Data.ClientFile.FileSummary;

  @Store.Getter.TaskList.BenchTaskSummary.cfActiveTaskList
  cfTaskList: Data.TaskList.GetTaskListByCidGrid[];

  @Store.Getter.Ticket.TicketSummary.myTicketActiveList
  myTicketActiveList: Data.Ticket.MyTicketTaskDetailsGet;

  @Store.Getter.Ticket.TicketSummary.myTicketCompletedList
  myTicketCompletedList: Data.Ticket.MyTicketTaskDetailsGet;

  clientFileId = this.$route.params.clientFileId;
  selectedToggleType: any = 0;
  selectedToggleTypeTicket: any = 0;
  taskStateIconMap: any = {
    CREATED: { icon: "mdi-plus-circle-outline", color: "grey" },
    TO_BE_PULLED: { icon: "mdi-account-cancel-outline", color: "grey" },
    ALLOCATED: { icon: "mdi-account-circle-outline", color: "secondary" },
    STARTED: { icon: "mdi-pencil-circle-outline", color: "primary" },
    SAVED: { icon: "mdi-progress-pencil", color: "primary" },
    COMPLETED: { icon: "mdi-check-circle-outline", color: "success" },
    CANCELLED: { icon: "mdi-cancel", color: "grey" },
    EXCEPTION_Q: { icon: "mdi-alert-circle", color: "red" },
    EXIT_Q: { icon: "mdi-alert-circle", color: "red" },
  };
  addNoteInput: Data.FiNote.AddNoteInput = new Data.FiNote.AddNoteInput();
  addNote() {
    this.addNoteInput.clientFileId = this.clientFileId;
    Action.FiNote.AddNote.execute(this.addNoteInput, (output) => {
      this.addNoteInput = new Data.FiNote.AddNoteInput();
      this.getFiNoteList();
    });
  }

  // get fiHighlightedNoteListQuick() {
  //   return this.fiHighlightedNoteList.slice(0, 5);
  // }

  // get fiNoteListQuick() {
  //   if (this.selectedToggleType === 0) {
  //     return this.fiNoteList;
  //   } else {
  //     return this.fiHighlightedNoteList;
  //   }
  // }

  // get myTicketList() {
  //   if (this.selectedToggleTypeTicket === 0) {
  //     return this.myTicketActiveList;
  //   }
  // }

  mounted() {
    this.getFiNoteList();
    this.getTaskListForClientFile();
    this.getMyCFTicketActiveList();
    this.getMyCFTicketCompletedList();
  }

  getFiNoteList() {
    setTimeout(() => {
      Action.FiNote.GetFiNoteList.execute1(this.clientFileId, (output) => {
        // console.log(output);
      });
    }, 700);
  }

  getMyCFTicketActiveList() {
    Action.Ticket.GetMyCFTicketActiveList.execute1(
      this.clientFileId,
      (output) => {}
    );
  }
  getMyCFTicketCompletedList() {
    Action.Ticket.GetMyCFTicketCompletedList.execute1(
      this.clientFileId,
      (output) => {}
    );
  }

  getTaskListForClientFile() {
    Action.TaskList.GetTaskListByCid.execute1(this.clientFileId, (output) => {
      // this.cfTaskList = output;
    });
  }

  actionList = [
    {
      actionName: "Send Email",
      icon: "mdi-chevron-right",
      routerName: "Root.CFile.CFAction.CFSendEmail",
    },
    {
      actionName: "Send SMS",
      icon: "mdi-chevron-right",
      routerName: "Root.CFile.CFAction.CFSendSMS",
    },
    {
      actionName: "CHPP",
      icon: "mdi-chevron-right",
      command: this.createCHPPFlow,
    },
    // {
    //   actionName: "Enrollment Flow",
    //   icon: "mdi-chevron-right",
    //   command: this.createEnrollmentFlowV1,
    // },
    // {
    //   actionName: "More Action",
    //   icon: "mdi-chevron-right",
    //   routerName: "Root.CFile.CFAction.CFActionList",
    // },
  ];
  takeAction(actionItem: any) {
    if (actionItem.routerName) {
      this.goto(actionItem.routerName, actionItem.query);
    }

    if (actionItem.command) {
      actionItem.command();
    }
  }

  goto(routerName: string, query: any) {
    this.$router.push({ name: routerName, query: query });
  }

  gotoTaskActiveList() {
    this.$router.push({ name: "Root.CFile.CFTask.CFActiveTasks" });
  }

  gotoTaskCompletedList() {
    this.$router.push({ name: "Root.CFile.CFTask.CFCompletedTasks" });
  }

  gotoActionList() {
    this.$router.push({ name: "Root.CFile.CFAction.CFActionList" });
  }

  gotoNotes() {
    this.$router.push({ name: "Root.CFile.CFNote.CFNoteAllList" });
  }
  gotoNotesHighlight() {
    this.$router.push({ name: "Root.CFile.CFNote.CFNoteHighlightList" });
  }
  gotoActiveTicket() {
    this.$router.push({ name: "Root.CFile.CFTicket.CFActiveTickets" });
  }
  gotoCompletedTicket() {
    this.$router.push({ name: "Root.CFile.CFTicket.CFCompletedTickets" });
  }
  gotoSubscribedTicket() {
    this.$router.push({ name: "Root.CFile.CFTicket.CFSubscribedTickets" });
  }
  gotoTicketDetails(item: any) {
    this.$router.push({
      name: "Root.CFile.CFTicket.CFTicketDetails.CFTicketCommentList",
      params: { myTicketId: item.taskId },
    });
  }

  createEnrollmentFlow() {
    Action.Spine.CreateEnrollment.execute2(
      this.clientFileBasicInfo.clientFileNumber,
      undefined,
      (output) => {
        setTimeout(() => {
          this.gotoCFActiveTaskList();
        }, 400);
      }
    );
  }

  // createEnrollmentFlowV1() {
  //   Action.Spine.CreateEnrollment.execute2(
  //     this.clientFileBasicInfo.clientFileNumber,
  //     "V1Net",
  //     (output) => {
  //       setTimeout(() => {
  //         this.gotoCFActiveTaskList();
  //       }, 400);
  //     }
  //   );
  // }

  createCHPPFlow() {
    Action.Spine.CreateCHPP.execute1(
      this.clientFileBasicInfo.clientFileNumber,
      (output) => {
        setTimeout(() => {
          this.gotoCFActiveTaskList();
        }, 400);
      }
    );
  }

  getCFActiveTaskList() {
    Action.TaskList.GetTaskListByCid.execute1(
      this.clientFileBasicInfo.clientFileNumber,
      (output) => {}
    );
  }

  gotoCFActiveTaskList() {
    if (this.$route.name === "Root.CFile.CFTask.CFActiveTasks") {
      this.getCFActiveTaskList();
    } else {
      Helper.Router.gotoCFActiveTaskList({
        router: this.$router,
        clientFileId: this.clientFileId,
      });
    }
  }

  gotoTaskDetails(item: any) {
    const params = { ...this.$route.params, taskId: item.taskId };
    this.$router.push({
      name: "Root.CFile.CFTask.CFTaskDetails.CFTaskDetails",
      params: params,
    });
  }

  pullStartAndMerge(item: Data.TaskList.ToBePulledTaskGrid) {
    Action.TaskList.PullStartAndMerge.execute1(item.taskId, (output) => {
      console.log(item);
      this.gotoTaskDetails(item);
    });
  }
}
</script>

<style></style>
