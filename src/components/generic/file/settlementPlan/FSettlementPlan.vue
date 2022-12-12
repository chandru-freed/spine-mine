<template>
  <v-col class="CFSettlementPlanInfo">
    <!-- {{stPlanDetails.stFeeEntryList}} -->
    <template>
      <v-card outlined class="ma-2">
        <component
          :ref="settlementPlanInfoMetaData.myRefName"
          :is="settlementPlanInfoMetaData.componentName"
          :value="selectModel(stPlanDetails.stPlanInfo, undefined)"
          v-bind="settlementPlanInfoMetaData.props"
        ></component>
      </v-card>
      <component
        v-if="addSPAEntry"
        :ref="addSTEntryInfoMetaData.myRefName"
        :is="addSTEntryInfoMetaData.componentName"
        :value="selectModel(addSTEntryInput, undefined)"
        v-bind="addSTEntryInfoMetaData.props"
      ></component>

      <component
        v-if="showUpdateAccountDetails"
        :ref="updateAccountDetailsFFormMDP.myRefName"
        :is="updateAccountDetailsFFormMDP.componentName"
        :value="selectModel(updateAccountDetailsInput, undefined)"
        v-bind="updateAccountDetailsFFormMDP.props"
      ></component>
    </template>
    <template>
      <v-card flat outlined class="row ma-2">
        <template>
          <v-toolbar flat dense>
            <v-tabs
              dense
              v-model="tab"
              background-color="transparent"
              color="secondary"
            >
              <v-tab> SPA Schedule </v-tab>
              <v-tab> Fee Schedule </v-tab>
            </v-tabs>
            <v-spacer></v-spacer>
            <f-add-btn
              :disabled="disabled"
              color="primary"
              class="mb-2"
              @click="showAddForm"
              label="Add StEntry"
            >
            </f-add-btn>
          </v-toolbar>
        </template>

        <v-tabs-items v-model="tab" class="col-12">
          <v-tab-item>
             <component
          v-if="stPlanDetails.stPlanInfo"
          :ref="spaScheduleTableMetaData.myRefName"
          :is="spaScheduleTableMetaData.componentName"
          :value="stPlanDetails"
          v-bind="spaScheduleTableMetaData.props"
        ></component>
            
          </v-tab-item>
          <v-tab-item>
              <component
          v-if="stPlanDetails.stPlanInfo"
          :ref="feeScheduleTableMetaData.myRefName"
          :is="feeScheduleTableMetaData.componentName"
          :value="stPlanDetails"
          v-bind="feeScheduleTableMetaData.props"
        ></component>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </template>
  </v-col>
</template>

<script lang="ts">
import FForm from "@/components/generic/form/FForm.vue";
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import CFSettlementPlanInfoFFormMDP from "./CFSettlementPlanInfoFFormMDP";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import ModelVue from "@/components/generic/ModelVue";
import AddSTEntryFFormMDP from "./AddSTEntryFFormMDP";
import * as Snackbar from "node-snackbar";
import FBtn from "@/components/generic/FBtn.vue";
import UpdateAccountDetailsFFormMDP from "./UpdateAccountDetailsFFormMDP";
import SPAScheduleTableMDP from "@/section/spineapp/views/file/settlement/SPAScheduleTableMDP";
import FeeScheduleTableMDP from "@/section/spineapp/views/file/settlement/FeeScheduleTableMDP";
import FDataTable from "../../table/FDataTable.vue";
import FAddBtn from "../../FAddBtn.vue";

@Component({
  components: {
    FForm,
    FBtn,
    FDataTable,
    FAddBtn
  },
})
export default class FSettlementPlan extends ModelVue {
  @Store.Getter.ClientFile.SettlementDetails.stPlanDetails
  stPlanDetails: Data.ClientFile.STPlanDetails;
  @Store.Getter.ClientFile.ClientFileSummary.fiCreditorInfo
  fiCreditorInfo: Data.ClientFile.FiCreditorInfo;

  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  @Prop({
    default: false,
  })
  disabled: boolean;

  @Watch("addSTEntryInput.paymentMode") addSTEntryInputchanged(
    newVal: any,
    olVal: any
  ) {
    console.log(newVal);
  }

  addSTEntryInput = new Data.ClientFile.AddSTEntryInput();
  selectedSTEntry: Data.ClientFile.FiCreditor;
  // stPlanId = this.$route.params.stPlanId;
  showUpdateAccountDetails: boolean = false;
  updateAccountDetailsInput: Data.ClientFile.UpdateAccountDetailsInput =
    new Data.ClientFile.UpdateAccountDetailsInput();
  clientFileId = this.$route.params.clientFileId;

  tab = 0;
  addSPAEntry = false;

  get taskDetailsInput() {
    return !!this.taskDetails && !!this.taskDetails.taskInput
      ? JSON.parse(this.taskDetails.taskInput)
      : {};
  }

  get stPlanId() {
    return this.taskDetailsInput.stPlanInfo?.fiSettlementPlanId;
  }

  //METADATA
  get settlementPlanInfoMetaData() {
    return new CFSettlementPlanInfoFFormMDP({ root: this }).getMetaData();
  }

  get addSTEntryInfoMetaData() {
    return new AddSTEntryFFormMDP({ taskRoot: this }).getMetaData();
  }

  get updateAccountDetailsFFormMDP() {
    return new UpdateAccountDetailsFFormMDP({ taskRoot: this }).getMetaData();
  }

    get spaScheduleTableMetaData() {
    return new SPAScheduleTableMDP({ root:this }).getMetaData()
  }

  get feeScheduleTableMetaData() {
    return new FeeScheduleTableMDP({ root:this }).getMetaData()
  }
  //METADATA

  stEntryScheduled(item: any) {
    return item.status === "SCHEDULED";
  }

  mounted() {
    console.log(Data.ClientFile.PAYMENT_MODE.list());
    this.getFiCreditorInfo();
  }

  resetForms() {
    this.addSTEntryInput = new Data.ClientFile.AddSTEntryInput();
  }

  showAddForm() {
    this.resetForms();
    this.closeDialogs();
    this.addSPAEntry = true;
  }
  closeDialogs() {
    this.resetForms();
    this.addSPAEntry = false;
    this.showUpdateAccountDetails = false;
  }


  getFiCreditorInfo() {
    Action.ClientFile.GetCreditorInfo.execute1(
      this.clientFileId,
      (output) => {}
    );
  }
  addSPAEntryForm() {
    this.addSTEntryInput.stPlanId = this.stPlanId;
    console.log(this.addSTEntryInput);
    Action.ClientFile.AddSTEntry.execute(this.addSTEntryInput, (output) => {
      Snackbar.show({
        text: "Succesfully Add ST Entry",
        pos: "bottom-center",
      });
      this.addSPAEntry = false;
    });
  }

  presentSTEntry(item: any) {
    Action.ClientFile.PresentSTEntry.execute1(item.stEntryId, (output) => {
      Snackbar.show({
        text: "Succesfully Delete ST Entry",
        pos: "bottom-center",
      });
    });
  }

  handleUpdateAccountDetailsClick(item: any) {
    this.selectedSTEntry = item;
    this.updateAccountDetailsInput =
      Data.ClientFile.UpdateAccountDetailsInput.fromJson(item);
    this.showUpdateAccountDetails = true;
  }
  updateAccountInfo() {
    Action.ClientFile.UpdateSTEntryAccountDetails.execute(
      this.updateAccountDetailsInput,
      (output) => {
        Snackbar.show({
          text: "Account details Updated",
          pos: "bottom-center",
        });
        this.closeDialogs();
      }
    );
  }
}
</script>

<style></style>
