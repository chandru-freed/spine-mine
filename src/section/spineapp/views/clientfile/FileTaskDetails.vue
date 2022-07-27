<template>
  <v-navigation-drawer
          absolute
          permanent
          right
          :width="rightFocused ? '100%' : '49%'"
          v-if="!leftFocused"
        >
          <template v-slot:prepend>
            <v-toolbar flat dense color="grey lighten-2">
              <v-btn icon v-if="!rightFocused" @click="focusRight">
                <v-icon>mdi-checkbox-blank-circle-outline</v-icon>
              </v-btn>
              <v-btn icon v-if="rightFocused" @click="resumeNormal">
                <v-icon>mdi-circle-slice-8</v-icon>
              </v-btn>
              <v-tabs
                v-model="taskSummaryTab"
                background-color="grey lighten-2"
                color="secondary"
                grow
              >
                <v-tab
                  v-for="taskSummaryTab in taskSummaryTabList"
                  :key="taskSummaryTab.tabName"
                >
                  {{ taskSummaryTab.tabName }}
                </v-tab>
              </v-tabs>
            </v-toolbar>
          </template>

          <v-divider></v-divider>
          <v-tabs-items v-model="taskSummaryTab">
            <v-tab-item
              v-for="taskSummaryTab in taskSummaryTabList"
              :key="taskSummaryTab.tabName"
            >
              <v-card flat min-height="600">
                  <component :is="taskSummaryTab.component"></component>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-navigation-drawer>

</template>

<script lang="ts">

import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
// import store, * as Store from '@/../src-gen/store';
// import * as Data from '@/../src-gen/data';
// import * as ServerData from '@/../src-gen/server-data';
// import * as Action from '@/../src-gen/action';
import FileTaskArea from "@/section/spineapp/components/task/FileTaskArea.vue";
import FileNotes from "@/section/spineapp/components/file/FileNotes.vue";
import FileHighlights from "@/section/spineapp/components/file/FileHighlights.vue";
import FileLogs from "@/section/spineapp/components/file/FileLogs.vue";

@Component({
  components: {
    "file-task-area": FileTaskArea,
    "file-notes": FileNotes,
    "file-highlights": FileHighlights,
    "file-logs": FileLogs
  },
})
export default class FileTaskDetails extends Vue {
  leftFocused = false;
  rightFocused = false;
  
  taskSummaryTab = 0;

  taskSummaryTabList = [
    {
      tabName: "Task Area",
      component: "file-task-area",
    },
    {
      tabName: "Notes",
      component: "file-notes",
    },
    {
      tabName: "Highlights",
      component: "file-highlights",
    },
    {
      tabName: "Logs",
      component: "file-logs",
    },
  ];


  focusLeft() {
    this.leftFocused = true;
    this.rightFocused = !this.leftFocused;
  }

  focusRight() {
    this.leftFocused = false;
    this.rightFocused = !this.leftFocused;
  }

  resumeNormal() {
    this.leftFocused = false;
    this.rightFocused = false;
  }

}

</script>

<style>
</style>
