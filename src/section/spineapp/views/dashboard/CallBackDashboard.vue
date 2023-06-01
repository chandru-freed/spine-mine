<template>
  <div class="CallBackDashboard">
   
    <component
      v-if="!!callBackDashboardFDataTableMetaData"
      :ref="callBackDashboardFDataTableMetaData.myRefName"
      :is="callBackDashboardFDataTableMetaData.componentName"
      :value="selectModel(callBackDashboardList, undefined)"
      v-bind="callBackDashboardFDataTableMetaData.props"
    ></component>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import TaskTab from "@/section/spineapp/components/tab/TaskTab.vue";

import moment from "moment";
import FBtn from "@/components/generic/FBtn.vue";
import Helper from "../../util/Helper";

import ModelVue from "@/components/generic/ModelVue";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import FForm from "@/components/generic/form/FForm.vue";
import DashboardTab from "../../components/tab/DashboardTab.vue";
import CallBackDashboardFDataTableMDP from "./CallBackDashboardFDataTableMDP";
import FSnackbar from "@/fsnackbar";


@Component({
  components: {
    "task-tab": DashboardTab,
    "f-btn": FBtn,
    FDataTable,
    FForm,
  },
})
export default class CallBackDashboard extends ModelVue {
  

  callBackDashboardList: Data.Spine.CallBackashboardDataOutput[] = [];

  tab = 0;
  taskIdList = [];
  showAssignForm: boolean = false;
  taskTableRefName: string = "dcpDashboardFDataTableRef";

  get callBackDashboardFDataTableMetaData() {
    return new CallBackDashboardFDataTableMDP({
      parent: this,
    }).getMetaData();
  }


  mounted() {
    this.getCallBackDashboardData();
  }

  getCallBackDashboardData() {
    console.error("inside getCall")
    Action.Spine.GetCallBackRequestList.execute(
      (output) => {
        this.callBackDashboardList = output;
      }
    );
  }

  gotoFile(clientFileNumber: string) {
    Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: clientFileNumber,
    });
  }

  gotoClient(clientId: string) {
    this.$router.push({
      name: "Root.Client.ClientDetails",
      params: { clientId: clientId },
    });
  }

  
  handleAssignClick(item: any) {
    this.showAssignForm = true;
    this.taskIdList = item;
  }

  clearSelectedItems() {
    (this.$refs[this.taskTableRefName] as any).clearSelectedItems();
  }

  
}
</script>

<style></style>
