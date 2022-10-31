<template>
  <div class="mt-8">
    <v-card
      outlined
    >
      <v-toolbar flat>
        <v-btn icon>
          <v-icon> mdi-comment-text</v-icon>
        </v-btn>

        <v-toolbar-title>Notes</v-toolbar-title>

        <v-spacer></v-spacer>


       
      </v-toolbar>
      <v-card-text>
      <div class="row justify-center align-content-start">
        <div class="col-10">
          <v-textarea
            filled
            auto-grow
            label="Add Note"
            rows="3"
            placeholder="Add a note ..."
            outlined
            v-model="addNoteInput.noteMessage"
            append-icon="mdi-comment-text"
            @keypress.ctrl.enter="addNote"
          >
          </v-textarea>
        </div>
        <!-- <div class="col-1">
          <v-btn outlined color="primary">Send</v-btn>
        </div> -->

      </div>
      <div>
        <v-list two-line >
          <!-- <v-list-item-group
            :value="selected"
            active-class="secondary--text"
            multiple
          > -->
            <template v-for="(note, index) in fiNoteList" >
              <v-list-item :key="'note' + index" >
                <template v-slot:default="{ active }">
                  <v-list-item-content disabled>
                    <v-list-item-title  >{{note.noteMesssage}}</v-list-item-title>

                    <!-- <v-list-item-subtitle
                      class="text--primary"
                      v-text="note.noteMesssage"
                    ></v-list-item-subtitle>

                    <v-list-item-subtitle v-text="note.noteMesssage"></v-list-item-subtitle> -->
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-list-item-action-text class="grey--text">{{ note.createdOn | datetime}}  <v-chip x-small label class="px-1">@{{note.createdBy}}</v-chip> </v-list-item-action-text>
                    <!-- <v-list-item-action-text ></v-list-item-action-text> -->

                    <v-icon
                      v-if="isHighlighted(note.noteId)"
                      color="secondary"
                      @click="unTagHighlightNote(note.noteId)"
                    >
                      mdi-star-outline
                    </v-icon>

                    <v-icon
                      v-if="!isHighlighted(note.noteId)"
                      color="grey"
                      @click="highlightNote(note.noteId)"
                    >
                      mdi-star-outline
                    </v-icon>

                    
                  </v-list-item-action>
                </template>
              </v-list-item>

              <v-divider
                v-if="index < fiNoteList.length - 1"
                :key="index"
              ></v-divider>
            </template>
          <!-- </v-list-item-group> -->
        </v-list>
      </div>
      </v-card-text>
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
import FBtn from "@/components/generic/FBtn.vue";

@Component({
  components: {
    "f-btn": FBtn,
  },
})
export default class CFNotes extends ModelVue {
  

  @Store.Getter.FiNote.FiNoteStore.fiHighlightedNoteList
  fiHighlightedNoteList: Data.FiNote.FiNote[];

  addNoteInput: Data.FiNote.AddNoteInput = new Data.FiNote.AddNoteInput();
  tagNoteInput: Data.FiNote.TagNoteInput = new Data.FiNote.TagNoteInput();
  expandedNoteIdList: string[] = [];

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.FiNote.FiNoteStore.fiNoteList
  fiNoteList: Data.FiNote.FiNote[];

  mounted() {
    this.getFiNoteList();
  }

  highlightNote(noteId: string) {
    this.tagNoteInput.tagKey = "highlight";
    this.tagNoteInput.tagValue = "true";
    this.tagNoteInput.noteId = noteId;
    this.tagNote();
  }

  unTagHighlightNote(noteId: string) {
    this.unTagNote(noteId, new Data.FiNote.NoteTag('highlight', 'true'))
  }

  isHighlighted(noteId: string) {
    return this.fiHighlightedNoteList.some(note => note.noteId === noteId)
  }

  

  addNote() {
    this.addNoteInput.clientFileId = this.clientFileBasicInfo.clientFileId;
    Action.FiNote.AddNote.execute(this.addNoteInput, (output) => {
      this.addNoteInput = new Data.FiNote.AddNoteInput();
      this.getFiNoteList();
    });
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

  tagNote() {
    Action.FiNote.TagNote.execute(this.tagNoteInput, (output) => {
      this.tagNoteInput = new Data.FiNote.TagNoteInput();
      this.getFiNoteList();
    });
  }

  unTagNote(noteId: string, tag: Data.FiNote.NoteTag) {
    const unTagNoteInput: Data.FiNote.UnTagNoteInput =
      new Data.FiNote.UnTagNoteInput();
    unTagNoteInput.noteId = noteId;
    unTagNoteInput.tagKey = tag.tagKey;
    unTagNoteInput.tagValue = tag.tagValue;
    Action.FiNote.UnTagNote.execute(unTagNoteInput, (output) => {
      this.getFiNoteList();
    });
  }

  // TODO:  Need clarification in naming
  expandTagsSection(noteId: string) {
    const noteIndex = this.expandedNoteIdList.indexOf(noteId);
    if (noteIndex === -1) {
      this.expandedNoteIdList.push(noteId);
    } else {
      this.expandedNoteIdList.splice(noteIndex, 1);
    }
  }

  isExpanded(noteId: string) {
    return this.expandedNoteIdList.includes(noteId);
  }

  removeNote(noteId: string) {
    Action.FiNote.RemoveNote.execute1(noteId, (output) => {
      this.getFiNoteList();
    });
  }
}
</script>

<style></style>
