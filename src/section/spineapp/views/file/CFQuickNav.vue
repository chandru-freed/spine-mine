<template>
  <!-- <v-card flat color="transparent" height="800px" >
     <v-card outlined height="200px" >
     </v-card>
     <v-card outlined height="200px" >
     </v-card>
     <v-card outlined height="200px" >
     </v-card>
     <v-card outlined height="200px" >
     </v-card>
    
  </v-card> -->
  <div class="row">
    <div class="col-12 ">
      <v-card outlined height="200px" >
        <v-card-text class="pt-1">
        <div>Quick Actions</div>
        </v-card-text>
      </v-card>
    </div>

    <div class="col-12 ">
      <v-card outlined height="200px" >
      </v-card>
    </div>
    
    <div class="col-12 ">
      <v-card outlined height="300px">
        <v-card-text class="pa-1">
          <v-textarea
            hide-details
            filled
            auto-grow
            label="Add Note"
            rows="2"
            placeholder="Add a note ..."
            outlined
            v-model="addNoteInput.noteMessage"
            append-icon="mdi-comment-text"
            @keypress.ctrl.enter="addNote"
          ></v-textarea>
          <div>
          <v-list >
              <template v-for="(note, index) in fiHighlightedNoteList" >
                <v-list-item :key="'note' + index" dense>
                  <template v-slot:default="{ active }">
                    <v-list-item-content disabled>
                      <!-- <v-list-item-title  >{{note.noteMesssage}}</v-list-item-title> -->

                      <!-- <v-list-item-subtitle
                        class="text--primary"
                        v-text="note.noteMesssage"
                      ></v-list-item-subtitle> -->

                      <v-list-item-subtitle v-text="note.noteMesssage"></v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <!-- <v-list-item-action-text class="grey--text">{{ note.createdOn | datetime}}  <v-chip x-small label class="px-1">@{{note.createdBy}}</v-chip> </v-list-item-action-text> -->

                      <v-icon
                        small
                        color="secondary"
                        @click="highlightNote(note.noteId)"
                      >
                        mdi-star-outline
                      </v-icon>

                      
                    </v-list-item-action>
                  </template>
                </v-list-item>

                <v-divider
                  v-if="index < fiHighlightedNoteList.length - 1"
                  :key="index"
                ></v-divider>
              </template>
            <!-- </v-list-item-group> -->
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

@Component
export default class CFQuickNav extends Vue {
  @Store.Getter.FiNote.FiNoteStore.fiHighlightedNoteList
  fiHighlightedNoteList: Data.FiNote.FiNote[];

  @Store.Getter.FiNote.FiNoteStore.fiNoteList
  fiNoteList: Data.FiNote.FiNote[];

  @Store.Getter.ClientFile.ClientFileSummary.fileSummary
  fileSummary: Data.ClientFile.FileSummary;

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;


  addNoteInput: Data.FiNote.AddNoteInput = new Data.FiNote.AddNoteInput();
  addNote() {
    this.addNoteInput.clientFileId = this.clientFileBasicInfo.clientFileId;
    Action.FiNote.AddNote.execute(this.addNoteInput, (output) => {
      this.addNoteInput = new Data.FiNote.AddNoteInput();
      //this.getFiNoteList();
    });
  }
  mounted() {
    this.getFiNoteList();
  }

  getFiNoteList() {
    setTimeout(() => {
      Action.FiNote.GetFiNoteList.execute1(
        this.clientFileBasicInfo.clientFileId,
        (output) => {
          console.log(output);
        }
      );
    }, 700);
  }


}

</script>

<style>
</style>
