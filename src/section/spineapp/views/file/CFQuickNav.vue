<template>
  <div class="row">
    <div class="col-12">
      <v-card outlined height="200px">
        <v-card-text class="pt-1 pb-0">
          <div>Quick Actions</div>
        </v-card-text>
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
            <div class="d-flex mt-4">
              <v-spacer />
              <v-btn-toggle v-model="selectedToggleType" mandatory dense>
                <v-btn> All </v-btn>
                <v-btn> Highlighted </v-btn>
              </v-btn-toggle>
            </div>

            <v-list height="200px" class="overflow-y-auto">
              <template v-for="(note, index) in fiNoteListQuick">
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
                  v-if="index < fiNoteListQuick.length - 1"
                  :key="index"
                ></v-divider>
              </template>
            </v-list>
          </div>
        </v-card-text>
      </v-card>
    </div>
    <div class="col-12"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import Helper from "../../util/Helper";

@Component({
  components: {},
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

  clientFileId = this.$route.params.clientFileId;
  selectedToggleType: any = 0;
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

  get fiNoteListQuick() {
    if (this.selectedToggleType === 0) {
      return this.fiNoteList;
    } else {
      return this.fiHighlightedNoteList;
    }
  }

  mounted() {
    this.getFiNoteList();
  }

  getFiNoteList() {
    setTimeout(() => {
      Action.FiNote.GetFiNoteList.execute1(this.clientFileId, (output) => {
        console.log(output);
      });
    }, 700);
  }

  actionList = [
    {
      actionName: "Send Email",
      icon: "mdi-chevron-right",
      routerName: "Root.CFile.CFAction.CFSendEmail",
    },
    {
      actionName: "Draft Payment ",
      icon: "mdi-chevron-right",
      routerName: "Root.CFile.CFAction.CFDraftPayment",
    },
    {
      actionName: "Enrollment Flow",
      icon: "mdi-chevron-right",
      command: this.createEnrollmentFlow,
    },
    {
      actionName: "More Action",
      icon: "mdi-chevron-right",
      routerName: "Root.CFile.CFAction.CFActionList",
    },
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

  createEnrollmentFlow() {
    Action.Spine.CreateEnrollment.execute1(
      this.clientFileBasicInfo.clientFileNumber,
      (output) => {
        setTimeout(() => {
          this.gotoCFActiveTaskList();
        }, 400);
      }
    );
  }

  gotoCFActiveTaskList() {
    Helper.Router.gotoCFActiveTaskList({
      router: this.$router,
      clientFileId: this.clientFileId,
    });
  }
}
</script>

<style></style>
