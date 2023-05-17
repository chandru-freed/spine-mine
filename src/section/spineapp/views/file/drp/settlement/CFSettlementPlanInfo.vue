<template>
  <v-col class="CFSettlementPlanInfo">
    <template>
      <v-card outlined class="ma-2">
        <component
          v-if="settlementPlanInfoMetaData"
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

      <v-alert dense outlined text color="error" v-if="deleteSPAEntry">
        <div
          class="d-flex flex-row align-start flex-wrap justify-space-around pa-2"
        >
          <div class="my-1">Are you sure want to delete?</div>
          <v-spacer />
          <FBtn
            label="Cancel"
            :on-click="closeDialogs"
            outlined
            color="red"
            class="mx-2"
          />
          <FBtn
            label="Delete"
            :on-click="removeSTEntry"
            outlined
            color="red"
            class="mx-2"
          />
        </div>
      </v-alert>
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
              :value="stPlanDetails.stSpaEntryList"
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
import FAddBtn from "@/components/generic/FAddBtn.vue";
import FDataTable, {
  ActionType,
} from "@/components/generic/table/FDataTable.vue";
import SPAScheduleTableMDP from "./SPAScheduleTableMDP";
import FeeScheduleTableMDP from "./FeeScheduleTableMDP";

@Component({
  components: {
    FForm,
    FBtn,
    FAddBtn,
    FDataTable,
  },
})
export default class CFSettlementPlanInfo extends ModelVue {
  @Store.Getter.ClientFile.SettlementDetails.stPlanDetails
  stPlanDetails: Data.ClientFile.STPlanDetails;
  @Store.Getter.ClientFile.ClientFileSummary.fiCreditorInfo
  fiCreditorInfo: Data.ClientFile.FiCreditorInfo;

  addSTEntryInput = new Data.ClientFile.AddSTEntryInput();
  updateAccountDetailsInput: Data.ClientFile.UpdateAccountDetailsInput =
    new Data.ClientFile.UpdateAccountDetailsInput();
  selectedSTEntry: Data.ClientFile.FiCreditor;
  stPlanId = this.$route.params.stPlanId;
  clientFileId = this.$route.params.clientFileId;

  tab = 0;
  addSPAEntry = false;
  deleteSPAEntry = false;
  showUpdateAccountDetails: boolean = false;
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
    return new SPAScheduleTableMDP({ root: this }).getMetaData();
  }

  get feeScheduleTableMetaData() {
    return new FeeScheduleTableMDP({ root: this }).getMetaData();
  }

  //METADATA

  stEntryScheduled(item: any) {
    return item.status === "SCHEDULED";
  }

  public getSTPaymentPlanDetailsHandler = (output: any) => {
    setTimeout(() => {
      this.getSTPaymentPlanDetails();
    }, 1000);
  };

  mounted() {
    this.getFiCreditorInfo();
    this.getSTPaymentPlanDetails();
    Action.ClientFile.AddSTEntry.interested(this.getSTPaymentPlanDetailsHandler);

    Action.ClientFile.RemoveSTEntry.interested(this.getSTPaymentPlanDetailsHandler);

    Action.ClientFile.PresentSTEntry.interested(this.getSTPaymentPlanDetailsHandler);

    Action.ClientFile.UpdateSTEntryAccountDetails.interested(this.getSTPaymentPlanDetailsHandler);
  }

  public destroyed() {
    Action.ClientFile.AddSTEntry.notInterested(this.getSTPaymentPlanDetailsHandler);

    Action.ClientFile.RemoveSTEntry.notInterested(this.getSTPaymentPlanDetailsHandler);

    Action.ClientFile.PresentSTEntry.notInterested(this.getSTPaymentPlanDetailsHandler);

    Action.ClientFile.UpdateSTEntryAccountDetails.notInterested(this.getSTPaymentPlanDetailsHandler);
  }

  resetForms() {
    this.addSTEntryInput = new Data.ClientFile.AddSTEntryInput();
  }

  getSTPaymentPlanDetails() {
    Action.ClientFile.GetSTPlanDetails.execute1(this.stPlanId, (output) => {});
  }

  showAddForm() {
    this.resetForms();
    this.closeDialogs();
    this.addSPAEntry = true;
    this.deleteSPAEntry = false;
  }

  closeDialogs() {
    this.resetForms();
    this.addSPAEntry = false;
    this.deleteSPAEntry = false;
    this.showUpdateAccountDetails = false;
  }

  showDeletePopup(item: any) {
    this.selectedSTEntry = item;
    this.deleteSPAEntry = true;
    this.addSPAEntry = false;
  }

  getFiCreditorInfo() {
    Action.ClientFile.GetCreditorInfo.execute1(
      this.clientFileId,
      (output) => {}
    );
  }
  addSPAEntryForm() {
    this.addSTEntryInput.stPlanId = this.stPlanId;
    Action.ClientFile.AddSTEntry.execute(this.addSTEntryInput, (output) => {
      Snackbar.show({
        text: "Succesfully Add ST Entry",
        pos: "bottom-center",
      });
      setTimeout(this.getSTPaymentPlanDetails, 1000);
      this.addSPAEntry = false;
    });
  }
  removeSTEntry() {
    const stEntryId = this.selectedSTEntry.stEntryId;
    Action.ClientFile.RemoveSTEntry.execute1(stEntryId, (output) => {
      Snackbar.show({
        text: "Succesfully Delete ST Entry",
        pos: "bottom-center",
      });
      setTimeout(this.getSTPaymentPlanDetails, 1000);
      this.deleteSPAEntry = false;
    });
  }

  presentSTEntry(item: any) {
    Action.ClientFile.PresentSTEntry.execute1(item.stEntryId, (output) => {
      Snackbar.show({
        text: "Succesfully Presented ST Entry",
        pos: "bottom-center",
      });
      setTimeout(this.getSTPaymentPlanDetails, 1000);
      this.deleteSPAEntry = false;
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
        setTimeout(this.getSTPaymentPlanDetails, 1000);
      }
    );
  }
}
</script>

<style></style>
