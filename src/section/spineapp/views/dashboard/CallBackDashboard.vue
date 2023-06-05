<template>
  <div class="CallBackDashboard">
    <v-card>
      <v-card-title>Add note</v-card-title>
    <component
      v-if="showAddNoteForm"
      :ref="callBackDashboardFFormMetaData.myRefName"
      :is="callBackDashboardFFormMetaData.componentName"
      :value="selectModel(addNoteInput, undefined)"
      @input="(newValue) => updateModel(addNoteInput, newValue, undefined)"
      v-bind="callBackDashboardFFormMetaData.props"
    ></component>
    </v-card>
   
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
import CallBackDashboardFFormMDP from './CallBackDashboardFFormMDP';


@Component({
  components: {
    "task-tab": DashboardTab,
    "f-btn": FBtn,
    FDataTable,
    FForm,
  },
})
export default class CallBackDashboard extends ModelVue {
  
  @Store.Getter.Login.LoginDetails.loggedInUser
  loggedInUser: Data.Login.LoginDetails;

  callBackDashboardList: Data.Spine.CallBackashboardDataOutput[] = [];
  addNoteInput: Data.FiNote.AddNoteInput = new Data.FiNote.AddNoteInput();
  assignSalesRepInput: Data.ClientFile.AssignSalesRepInput = new Data.ClientFile.AssignSalesRepInput();
  showAddNoteForm: boolean = false;

  get callBackDashboardFDataTableMetaData() {
    return new CallBackDashboardFDataTableMDP({
      parent: this,
    }).getMetaData();
  }

  get callBackDashboardFFormMetaData() {
    return new CallBackDashboardFFormMDP({
      parent: this
    }).getMetaData();
  }


  mounted() {
    this.getCallBackDashboardData();
  }

  getCallBackDashboardData() {
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

  handleAdNoteclick(item: any) {
    this.showAddNoteForm = true;
    this.addNoteInput.clientFileId = item?.clientFileId;
    this.assignSalesRepInput.clientFileId = item?.clientFileId;
    this.assignSalesRepInput.assignedSalesRep = !!item.assignedSalesRep?item.assignedSalesRep: this.loggedInUser.userName;
  }

  clearForm() {
    this.addNoteInput = new Data.FiNote.AddNoteInput();
    this.showAddNoteForm = false;
     (
      this.$refs[this.callBackDashboardFDataTableMetaData.myRefName] as any
    ).clearSelectedItems();
    
  }

  addNoteAndAssign(item: any) {
    console.log(item)
    this.addNoteInput.noteMessage = `CallBack Response: ${this.addNoteInput.noteMessage}`
    Action.FiNote.AddNote.execute(this.addNoteInput, output => {
        Action.Spine.AssignSalesRepToSelfEnrolFile.execute(this.assignSalesRepInput,output => {
          this.clearForm();
          this.getCallBackDashboardData();
        })
    })
  }

  
}
</script>

<style></style>
