<template>
  <v-row>
    <v-col class="col-12">
      <v-toolbar flat class="mt-5" color="white">
        <v-textarea
          filled
          auto-grow
          label="Note"
          rows="1"
          row-height="20"
          placeholder="Leave a note ..."
          outlined
          v-model="addNoteInput.noteMessage"
        >
          <template v-slot:append>
            <v-btn class="mx-0" depressed @click="addNote" color="secondary">
              Post
            </v-btn>
          </template>
        </v-textarea>
      </v-toolbar>
    </v-col>
    <v-col
      class="col-12 px-6 pb-0"
      v-for="(note, index) in fiNoteList"
      :key="'note' + index"
    >
      <v-hover v-slot="{ hover }">
        <v-card flat :elevation="hover ? 1 : 0" color="grey lighten-4">
          <v-card-subtitle class="pb-0 pt-3">
            {{ note.noteMesssage }}</v-card-subtitle
          >

          <v-card-actions class="pt-0 pb-0">
            <v-btn color="primary" text small>
              <strong>{{ note.createdBy }}</strong> @{{
                note.createdOn | fromNow
              }}
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn icon @click="expandTagsSection(note.noteId)">
              <v-icon>{{
                isExpanded(note.noteId) ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="isExpanded(note.noteId)">
              <v-divider></v-divider>

              <v-card-text class="d-flex flex-row align-center">
                <span style="flex: 1">
                  <v-chip
                    v-for="(tag, index) in note.tagList"
                    :key="'tag' + index"
                    label
                    text-color="primary"
                    small
                    class="ma-2"
                    close
                    @click:close="unTagNote(note.noteId, tag)"
                  >
                    <strong>{{ tag.tagKey }}</strong> @{{ tag.tagValue }}
                  </v-chip>
                </span>
                <v-btn
                  @click="highlightNote(note.noteId)"
                  color="primary"
                  text
                  small
                >
                  <strong>Highlight</strong>
                </v-btn>
                <v-menu
                  offset-y
                  left
                  nudge-bottom="14"
                  min-width="230"
                  content-class="user-profile-menu-content"
                >
                  <v-list dense>
                    <v-list-item link @click="removeNote(note.noteId)" >
                      <v-icon small class="mr-2">mdi-delete</v-icon> Remove
                    </v-list-item>
                  </v-list>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon small v-bind="attrs" v-on="on"
                      >mdi-dots-vertical</v-icon
                    >
                  </template>
                </v-menu>
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import ModelVue from "@/components/generic/ModelVue";

@Component({
  components: {
  },
})
export default class FileNotes extends ModelVue {
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
    Action.FiNote.RemoveNote.execute1(noteId, output => {
      this.getFiNoteList();
    });
  }
}
</script>

<style></style>
