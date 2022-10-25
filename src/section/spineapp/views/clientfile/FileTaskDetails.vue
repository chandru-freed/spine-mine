<template>
  <div>
    <template>
      <!-- v-slot:prepend -->
      <v-toolbar flat dense color="grey lighten-2">
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
        :key="'tabName' + taskSummaryTab.tabName"
      >
        <v-card flat>
          <component :is="taskSummaryTab.component"></component>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
  <!-- <v-navigation-drawer
    absolute
    permanent
    right
    :width="rightFocused ? '100%' : '49%'"
    v-if="!leftFocused"
  >
  </v-navigation-drawer> -->
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
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
    FileTaskArea,
    FileNotes,
    FileHighlights,
    FileLogs,
  },
})
export default class FileTaskDetails extends Vue {
  taskSummaryTab = 0;

  taskSummaryTabList = [
    {
      tabName: "Task Area",
      component: "FileTaskArea",
    },
    // {
    //   tabName: "Notes",
    //   component: "FileNotes",
    // },
    // {
    //   tabName: "Highlights",
    //   component: "FileHighlights",
    // },
    // {
    //   tabName: "Logs",
    //   component: "FileLogs",
    // },
  ];

  get leftFocused() {
    const panelVal = this.$route.query.panel || "";
    return (
      panelVal.toString().includes("lp") && !panelVal.toString().includes("rp")
    );
  }

  get rightFocused() {
    const panelVal = this.$route.query.panel || "";
    return (
      !panelVal.toString().includes("lp") && panelVal.toString().includes("rp")
    );
  }
}
</script>

<style>
</style>
