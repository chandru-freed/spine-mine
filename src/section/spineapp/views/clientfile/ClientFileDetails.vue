<template>
  <!-- <div clas="row pa-0 ma-0">
    <div class="col-12">
      <v-card class="mx-auto mb-2" outlined>
        <client-file-summary :file-details="fileDetails"></client-file-summary>
      </v-card>
    </div> -->
    <!-- <div class="col-6 py-0">
      <v-card> -->
    <!-- <div class="col-12">
      <v-card tile height="700px" class="" flat color="transparent"> -->
        <!-- FILE DETAILS -->
        <!-- <v-navigation-drawer
          absolute
          permanent
          outlined
          left
          :width="leftFocused ? '100%' : '49%'"
          v-if="!rightFocused"
        >
          <template v-slot:prepend>
            <v-toolbar flat dense color="grey lighten-2">
              <v-btn icon v-if="!leftFocused" @click="focusLeft">
                <v-icon>mdi-checkbox-blank-circle-outline</v-icon>
              </v-btn>
              <v-btn icon v-if="leftFocused" @click="resumeNormal">
                <v-icon>mdi-circle-slice-8</v-icon>
              </v-btn>
              <v-tabs
                v-model="fileDetailsTab"
                background-color="grey lighten-2"
                color="secondary"
                grow
              >
                <v-tab
                  v-for="item in fileDetailsTabList"
                  :key="item.tabName"
                  class="text-caption"
                >
                  {{ item.tabName }}
                </v-tab>
              </v-tabs>
            </v-toolbar>
          </template>

          <v-divider></v-divider>

          <v-tabs-items v-model="fileDetailsTab" flat>
            <v-tab-item v-for="item in fileDetailsTabList" :key="item.tabName">
              <v-card flat min-height="700">
                <component :is="item.component"></component>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-navigation-drawer> -->
        <!-- FILE DETAILS -->

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
        <!-- WORK AREA-->
      <!-- </v-card>
    </div>
  </div> -->
</template>

<script>
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
// import store, * as Store from '@/../src-gen/store';
// import * as Data from '@/../src-gen/data';
// import * as ServerData from '@/../src-gen/server-data';
// // import * as Action from '@/../src-gen/action';
// import ClientFileSummary from "@/section/spineapp/components/file/ClientFileSummary.vue";
// import FileInfo from "@/section/spineapp/components/file/FileInfo.vue";
// import FileProfile from "@/section/spineapp/components/file/FileProfile.vue";
// import FileBank from "@/section/spineapp/components/file/FileBank.vue";
// import FileBudget from "@/section/spineapp/components/file/FileBudget.vue";
// import FileCreditorList from "@/section/spineapp/components/file/FileCreditorList.vue";
// import FilePaymentPlan from "@/section/spineapp/components/file/FilePaymentPlan.vue";
import FileTaskList from "@/section/spineapp/components/task/FileTaskList.vue";
import FileNotes from "@/section/spineapp/components/file/FileNotes.vue";
import FileHighlights from "@/section/spineapp/components/file/FileHighlights.vue";
import FileLogs from "@/section/spineapp/components/file/FileLogs.vue";

@Component({
  components: {
    "file-task-list": FileTaskList,
    "file-notes": FileNotes,
    "file-highlights": FileHighlights,
    "file-logs": FileLogs
  },
})
export default class ClientFileDetails extends Vue {
  fileId = this.$route.params.fileId;

  miniLeft = false;
  miniRight = false;

  leftFocused = false;
  rightFocused = true;
  drawer = false;

  fileDetails = {
    clientName: "John Doe",
    fileId: "KFS-123-123-1234",
    phoneNumber: "987-654-3210",
    program: "DSP",
    plan: "699",
    totalOutstandingAmount: "2,40,000",
    spaBalance: "50,000",
    tenure: "24 months",
    noOfCreditors: "5",
    noOfCreditorsSettled: "2",
    msf: {
      monthlyPlan: "699",
    },
    spa: {
      monthlyPlan: "13,000",
    },
  };

  // fileDetailsTab = 0;
  // fileDetailsTabList = [
  //   {
  //     tabName: "Info",
  //     component: "file-info",
  //   },
  //   {
  //     tabName: "Profile",
  //     component: "file-profile",
  //   },
  //   {
  //     tabName: "Bank",
  //     component: "file-bank",
  //   },
  //   {
  //     tabName: "Budget",
  //     component: "file-budget",
  //   },
  //   {
  //     tabName: "Cred",
  //     component: "file-creditor-list",
  //   },
  //   {
  //     tabName: "Pay Plan",
  //     component: "file-payment-plan",
  //   },
  // ];

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
    {
      tabName: "Logs",
      component: "file-logs",
    },
  ];

  mounted() {}

  created() {}

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

<style></style>
