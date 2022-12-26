<template>
  <div class="TaskAssignedToMe">
    <!-- MIS REPORTS TAB -->
    <misreports-tab v-model="tab"></misreports-tab>
    <!-- MIS REPORTS TAB -->
    <v-card>
      <component
        v-if="!!upcomingPaymentsFDataTableMetaData"
        :ref="upcomingPaymentsFDataTableMetaData.myRefName"
        :is="upcomingPaymentsFDataTableMetaData.componentName"
        :value="selectModel(allocatedTaskList, undefined)"
        v-bind="upcomingPaymentsFDataTableMetaData.props"
      ></component>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import MISReportsTab from "@/section/spineapp/components/tab/MISReportsTab.vue";

import moment from "moment";
import FBtn from "@/components/generic/FBtn.vue";
import Helper from "../../util/Helper";
import UpcomingPaymentsFDataTableMDP from "./UpcomingPaymentsFDataTableMDP";
import ModelVue from "@/components/generic/ModelVue";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import FForm from "@/components/generic/form/FForm.vue";

@Component({
  components: {
    "misreports-tab": MISReportsTab,
    "f-btn": FBtn,
    FDataTable,
    FForm,
  },
})
export default class UpcomingPayments extends ModelVue {
  tab = 0;

  selected = [];
  search = "";

  misFiPSEntryList: Data.ClientFile.MISFiPSEntry[] = [];

  taskTableRefName: string = "taskAssignedToMeFDataTableRef";
  mounted() {
    Action.TaskList.Suspend.interested(this.getActiveTLAllocatedWithDelay);
    this.getActiveTaskListAllocatedGrid();
  }

  destroyed() {
    Action.TaskList.Suspend.notInterested(this.getActiveTLAllocatedWithDelay);
  }

  getActiveTLAllocatedWithDelay() {
    setTimeout(() => {
      this.getActiveTaskListAllocatedGrid();
    }, 1000);
  }
  getActiveTaskListAllocatedGrid() {
    Action.ClientFile.GetSceheduledPaymentList.execute((output) => {
      this.misFiPSEntryList = output.misFiPSEntryList;
    });
  }

  gotoFile(item: any) {
    Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: item.cid,
    });
  }

  gotoClient(clientId: string) {
    this.$router.push({
      name: "Root.Client.ClientDetails",
      params: { clientId: clientId },
    });
  }

  get upcomingPaymentsFDataTableMetaData() {
    return new UpcomingPaymentsFDataTableMDP({
      parent: this,
      myRefName: this.taskTableRefName,
    }).getMetaData();
  }
}
</script>

<style></style>
