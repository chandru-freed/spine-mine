<template>
  <!-- WORK AREA-->

  <v-navigation-drawer
    absolute
    permanent
    right
    :width="rightFocused ? '100%' : '49%'"
    v-if="!leftFocused"
  >
    <template v-slot:prepend>
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
        :key="taskSummaryTab.tabName"
      >
        <v-card flat min-height="600">
          <component :is="taskSummaryTab.component"></component>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-navigation-drawer>
  <!-- WORK AREA-->
</template>

<script>
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import FileTaskList from "@/section/spineapp/components/task/FileTaskList.vue";
import FileNotes from "@/section/spineapp/components/file/FileNotes.vue";
import FileHighlights from "@/section/spineapp/components/file/FileHighlights.vue";
import FileLogs from "@/section/spineapp/components/file/FileLogs.vue";

@Component({
  components: {
    "file-task-list": FileTaskList,
    "file-notes": FileNotes,
    "file-highlights": FileHighlights,
    "file-logs": FileLogs,
  },
})
export default class Workarea extends Vue {
  drawer = false;

  taskSummaryTab = 0;

  taskSummaryTabList = [
    {
      tabName: "Tasks",
      component: "file-task-list",
    },
    {
      tabName: "Notes",
      component: "file-notes",
    },
    {
      tabName: "Highlights",
      component: "file-highlights",
    },
    // {
    //   tabName: "Logs",
    //   component: "file-logs",
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

<style></style>
