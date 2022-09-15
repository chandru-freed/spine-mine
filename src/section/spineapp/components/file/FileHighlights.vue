<template>
  <v-row>
    <v-col class="col-12 px-6 pb-0 mt-8">
      <v-alert
        dense
        text
        type="info"
        color="secondary"
        v-for="(fiHighlightedNote, index) in fiHighlightedNoteList"
        :key="'highlights' + index"
      >
        {{ fiHighlightedNote.noteMesssage }}
      </v-alert>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";

@Component
export default class FileHighlights extends Vue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.FiNote.FiNoteStore.fiHighlightedNoteList
  fiHighlightedNoteList: Data.FiNote.FiNote[];

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

<style></style>
