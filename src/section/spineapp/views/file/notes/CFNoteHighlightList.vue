<template>
  <div class="mt-8">
    <v-toolbar flat>
      <v-btn icon>
        <v-icon> mdi-star-outline</v-icon>
      </v-btn>

      <v-toolbar-title>Highlights</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <div class="row justify-center align-content-start">
        <div class="col-10">
          <v-textarea
            filled
            auto-grow
            label="Add Highlight (Ctrl + Enter)"
            rows="3"
            placeholder="Add a Highlight ..."
            outlined
            v-model="addNoteInput.noteMessage"
            append-icon="mdi-send"
            @keypress.ctrl.enter="addHighlightedNote"
            @click:append="addHighlightedNote"
            hint="Press CTRL + ENTER"
          >
          </v-textarea>
        </div>
      </div>
      <div>
        <v-list two-line>
          <template v-for="(note, index) in fiHighlightedNoteList">
            <v-list-item :key="'note' + index">
              <template>
                <v-list-item-content disabled>
                  <v-list-item-title>{{ note.noteMesssage }}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-action-text class="grey--text"
                    >{{ note.createdOn | datetime }}
                    <v-chip x-small label class="px-1"
                      >@{{ note.createdBy }}</v-chip
                    >
                  </v-list-item-action-text>

                  <v-icon color="secondary" @click="highlightNote(note.noteId)">
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
        </v-list>
      </div>
    </v-card-text>
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
export default class CFNoteHighlightList extends ModelVue {
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

  addHighlightedNote() {
    this.addNoteInput.clientFileId = this.clientFileBasicInfo.clientFileId;
    if (this.addNoteInput.noteMessage.length > 1) {
      Action.FiNote.AddNote.execute(this.addNoteInput, (output) => {
        this.highlightNote(output.noteId);
        this.addNoteInput = new Data.FiNote.AddNoteInput();
        this.getFiNoteList();
      });
    }
  }

  getFiNoteList() {
    setTimeout(() => {
      Action.FiNote.GetFiNoteList.execute1(
        this.clientFileBasicInfo.clientFileId,
        (output) => {
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
