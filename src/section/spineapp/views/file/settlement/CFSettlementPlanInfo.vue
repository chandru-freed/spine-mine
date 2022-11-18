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

      

      <v-alert dense outlined text color="error" v-if="deleteSPAEntry">
        <div
          class="
            d-flex
            flex-row
            align-start
            flex-wrap
            justify-space-around
            pa-2
          "
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
            <!-- <v-btn
              :disabled="disabled"
              icon
              color="primary"
              class="mb-2"
              @click="showAddForm"
            >
              <v-icon>mdi-plus-circle-outline</v-icon>
            </v-btn> -->
          </v-toolbar>
        </template>
      
        <v-tabs-items v-model="tab" class=" col-12">
          <v-tab-item>
              <f-data-table
                :headers="spaHeaders"
                :items="stPlanDetails.stSpaEntryList"
                :actions="spaActions"
                sort-by="draftDate"
                class="elevation-0"
                item-key="stEntryId"
              >
                <template v-slot:[`item.status`]="{ item }">
                  <v-chip small outlined>
                    {{ item.status }}
                  </v-chip>
                </template>
                <template v-slot:[`item.totalAmount`]="{ item }">
                  {{ item.totalAmount | toINR }}
                </template>
                <template v-slot:[`item.spaAmount`]="{ item }">
                  {{ item.spaAmount | toINR }}
                </template>
                <template v-slot:[`item.draftDate`]="{ item }">
                  <span class="grey--text">
                    {{ item.draftDate | date }}
                  </span>
                </template>

                <template v-slot:[`item.actions`]="{ item, index }">
                  <v-btn
                    :disabled="!stEntryScheduled(item)"
                    small
                    outlined
                    color="primary"
                    class="mr-2"
                    @click="presentSTEntry(item)"
                    >Present</v-btn
                  >
                  <v-btn
                    small
                    outlined
                    color="primary"
                    class="mr-2"
                    @click="handleUpdateAccountDetailsClick(item)"
                    >Update account info</v-btn
                  >
                  <v-icon
                    :disabled="!stEntryScheduled(item)"
                    small
                    @click="showDeletePopup(item, index)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
              </f-data-table>
          </v-tab-item>
          <v-tab-item>
              <f-data-table
                :headers="feeHeaders"
                :items="stPlanDetails.stFeeEntryList"
                 :actions="feeActions"
                title="Fee Schedule"
                item-key="stEntryId"
                sort-by="draftDate"
                class="elevation-0"
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title>Fee Schedule</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                </template>
                <template v-slot:[`item.status`]="{ item }">
                  <v-chip small outlined>
                    {{ item.status }}
                  </v-chip>
                </template>

                <template v-slot:[`item.totalAmount`]="{ item }">
                  {{ item.totalAmount | toINR }}
                </template>
                <template v-slot:[`item.feeAmount`]="{ item }">
                  {{ item.feeAmount | toINR }}
                </template>
                <template v-slot:[`item.draftDate`]="{ item }">
                  <span class="grey--text">
                    {{ item.draftDate | date }}
                  </span>
                </template>
                <template v-slot:[`item.actions`]="{ item, index }">
                  <v-icon
                    :disabled="!stEntryScheduled(item)"
                    small
                    @click="showDeletePopup(item, index)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
              </f-data-table>
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
import UpdateAccountDetailsFFormMDP from './UpdateAccountDetailsFFormMDP';
import FAddBtn from "@/components/generic/FAddBtn.vue";
import FDataTable, { ActionType } from "@/components/generic/FDataTable.vue";

@Component({
  components: {
    FForm,
    FBtn,
FAddBtn,
FDataTable
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

  spaHeaders = [
    {
      text: "Payment Provider",
      align: "start",
      sortable: false,
      value: "paymentProvider",
    },
    { text: "status", value: "status" },
    { text: "DraftDate", value: "draftDate" },
    { text: "SPA Amount", value: "spaAmount", },
    // { text: "Total Amount", value: "totalAmount", align: "right" },
  ];
  feeHeaders = [
    {
      text: "Payment Provider",
      align: "start",
      sortable: false,
      value: "paymentProvider",
    },
    { text: "status", value: "status" },
    { text: "Draft Date", value: "draftDate" },
    { text: "Fee Amount", value: "feeAmount", align: "right" },
    // { text: "Total Amount", value: "totalAmount", align: "right" },
  ];

  spaActions: any [] = [
    {
      type: ActionType.OTHERS,
      label: "Present",
      onClick: (item: any) => {this.presentSTEntry(item)}
    },
    {
      type: ActionType.OTHERS,
      label: "Update Account Info",
      onClick: (item: any) => this.handleUpdateAccountDetailsClick(item)
    },
    
    {
      type: ActionType.ADD,
      onClick: () => this.showAddForm(),
      label:"Add STEntry"
    }
  ]

  feeActions: any [] = [
    {
      type: ActionType.OTHERS,
      label: "Present",
      onClick: (item: any) => {this.presentSTEntry(item)}
    },
    {
      type: ActionType.OTHERS,
      label: "Update Account Info",
      onClick: (item: any) => this.handleUpdateAccountDetailsClick(item)
    },
    {
      type: ActionType.OTHERS,
      label: "Update Account Info1",
      onClick: (item: any) => this.handleUpdateAccountDetailsClick(item)
    },
    {
      type: ActionType.DELETE,
      onClick: (item: any) => this.showDeletePopup(item)
    },
    {
      type: ActionType.ADD,
      onClick: () => this.showAddForm(),
      label:"Add STEntry"
    }
  ]
  //METADATA
  get settlementPlanInfoMetaData() {
    return new CFSettlementPlanInfoFFormMDP({ root: this }).getMetaData();
  }

  get addSTEntryInfoMetaData() {
    return new AddSTEntryFFormMDP({ taskRoot: this }).getMetaData();
  }

  get updateAccountDetailsFFormMDP() {
    return new UpdateAccountDetailsFFormMDP({ taskRoot: this }).getMetaData()
  }
  //METADATA

  stEntryScheduled(item: any) {
    return item.status === "SCHEDULED";
  }

  mounted() {
    this.getFiCreditorInfo();
    this.getSTPaymentPlanDetails();
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
    console.log("stEntryId", item.stEntryId);
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
        text: "Succesfully Deleted ST Entry",
        pos: "bottom-center",
      });
      setTimeout(this.getSTPaymentPlanDetails, 1000);
      this.deleteSPAEntry = false;
    });
  }
  handleUpdateAccountDetailsClick(item: any) {
    this.selectedSTEntry = item;
    this.updateAccountDetailsInput = Data.ClientFile.UpdateAccountDetailsInput.fromJson(item);
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
