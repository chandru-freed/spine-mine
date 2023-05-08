<template>
  <div class="CFEMandateList">
    <v-col class="col-12">
      <v-card flat v-if="showInitiateForm" class="py-3">
        <v-alert
          outlined
          color="warning"
          class="ma-4"
          v-if="isAgreementNotSigned()"
        >
          Agreement not signed.Please sign an agreement to initiate an EMandate
        </v-alert>
        <component
          :ref="initiateEMandateFFormMetaData.myRefName"
          :is="initiateEMandateFFormMetaData.componentName"
          :value="selectModel(initiateEMandateInput, undefined)"
          @input="
            (newValue) =>
              updateModel(initiateEMandateInput, newValue, undefined)
          "
          v-bind="initiateEMandateFFormMetaData.props"
        ></component>
      </v-card>

      <v-card class="my-4" outlined v-if="showViewEMandateForm" flat>
        <v-alert
          dense
          outlined
          text
          color="red"
          class="ma-5"
          v-if="
            selectedEMandateSummaryToView.status.name === 'REJECTED' &&
            selectedEMandateSummaryToView.reasonDesc
          "
          >{{ selectedEMandateSummaryToView.reasonCode }}:
          {{ selectedEMandateSummaryToView.reasonDesc }} ,{{
            selectedEMandateSummaryToView.rejectedBy
          }}
        </v-alert>
        <component
          :ref="eMandateDetailsFFormMetaData.myRefName"
          :is="eMandateDetailsFFormMetaData.componentName"
          :value="selectModel(selectedEMandateSummaryToView, undefined)"
          v-bind="eMandateDetailsFFormMetaData.props"
        ></component>
      </v-card>

      <component
        :ref="cfeMandateListFDataTableMetaData.myRefName"
        :is="cfeMandateListFDataTableMetaData.componentName"
        :value="selectModel(fiEMandateSummaryList, undefined)"
        v-bind="cfeMandateListFDataTableMetaData.props"
      ></component>

      <!--GRID START-->
      <!-- <v-card flat outlined>
        <v-data-table
          :headers="headers"
          :items="fiEMandateList"
          sort-by="lastDateOfPayment"
          class="elevation-0"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>EMandate List</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <f-add-btn
                outlined
                label="Create EMandate"
                @click="gotoCreateEMandate()"
              />
            </v-toolbar>
          </template>
          <template v-slot:[`item.amount`]="{ item }">
            {{ item.amount | toINR }}
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-btn
              v-if="!item.isDefault"
              small
              outlined
              color="primary"
              @click="markDefault(item.eMandateId)"
            >
              Mark Default
            </v-btn>
            <v-chip small v-if="item.isDefault">Default</v-chip>
          </template>
          <template v-slot:[`item.createdOn`]="{ item }">
            {{ item.createdOn | date }}
          </template></v-data-table
        ></v-card
      ></v-col
    >
  </div>
</template>
          
        </v-data-table>
      </v-card> -->
      <!--GRID END-->
    </v-col>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import store, * as Store from "@/../src-gen/store";
import FBtn from "@/components/generic/FBtn.vue";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";
import FAddBtn from "@/components/generic/FAddBtn.vue";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import CFEMandateListFDataTableMDP from "./CFEMandateListFDataTableMDP";
import CFInitiateEMandateFFormMDP from "./CFInitiateEMandateFFormMDP";
import CFEMandateDetailsFFormMDP from "./CFEMandateDetailsFFormMDP";
import FSnackbar from "@/fsnackbar";
@Component({
  components: {
    FAddBtn,
    FDataTable,
    FForm,
  },
})
export default class FEMandate extends ModelVue {
  @Store.Getter.ClientFile.ClientFileSummary.fiEMandateList
  fiEMandateList: Data.ClientFile.FiEMandateList;

  @Store.Getter.ClientFile.ClientFileSummary.fiEMandateSummaryList
  fiEMandateSummaryList: Data.ClientFile.FiEMandateSummary[];

  @Store.Getter.ClientFile.ClientFileSummary.fiPaymentPlanInfo
  fiPaymentPlanInfoStore: Data.ClientFile.FiPaymentPlanInfo;

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  initiateEMandateInput: Data.ClientFile.InitiateEMandateInput =
    new Data.ClientFile.InitiateEMandateInput();
  showInitiateForm: boolean = false;
  showViewEMandateForm: boolean = false;
  selectedEMandateSummaryToView: Data.ClientFile.FiEMandateSummary =
    new Data.ClientFile.FiEMandateSummary();

  clientFileId = this.$route.params.clientFileId;

  mounted() {
    this.getEMandateList();
    this.getFiPaymentPlanInfo();
    Action.ClientFile.InitiateEMandate.interested(this.getEMandateListHandler);
  }

  destroyed() {
    Action.ClientFile.InitiateEMandate.notInterested(this.getEMandateListHandler);
  }

  public getEMandateListHandler = () => {
    setTimeout(() => {
      this.getEMandateList();
    }, 1000);
  };

  //MEtadata

  get cfeMandateListFDataTableMetaData() {
    return new CFEMandateListFDataTableMDP({ parent: this }).getMetaData();
  }

  get initiateEMandateFFormMetaData() {
    return new CFInitiateEMandateFFormMDP({ parent: this }).getMetaData();
  }

  get eMandateDetailsFFormMetaData() {
    return new CFEMandateDetailsFFormMDP({ parent: this }).getMetaData();
  }

  //MEtadata

  getEMandateList() {
    Action.ClientFile.GetAllEMandateList.execute1(
      this.clientFileId,
      (output) => {}
    );
    // Action.ClientFile.GetEMandateList.execute1(
    //   this.clientFileId,
    //   (output) => {}
    // );
  }

  getFiPaymentPlanInfo() {
    Action.ClientFile.GetPaymentPlanInfo.execute1(
      this.clientFileId,
      (output) => {}
    );
  }

  initiateEMandate() {
    this.initiateEMandateInput.clientFileId = this.clientFileId;
    Action.ClientFile.InitiateEMandate.execute(
      this.initiateEMandateInput,
      (output) => {
        this.showInitiateForm = false;
      }
    );
  }

  handleInfoClick(item: Data.ClientFile.FiEMandateSummary) {
    this.selectedEMandateSummaryToView = item;
    this.showInitiateForm = false;
    this.showViewEMandateForm = true;
  }

  prepopulateDetails() {
    this.initiateEMandateInput.collectionAmount =
      this.fiPaymentPlanInfoStore?.ppCalculator?.totalMonthlyObligation || 0;
    this.initiateEMandateInput.clientBankInfo.nupayBankId =
      this.fiEMandateSummaryList[0]?.nupayBankId;
    this.initiateEMandateInput.clientBankInfo.accountNumber =
      this.fiEMandateSummaryList[0]?.accountNumber;
    this.initiateEMandateInput.clientBankInfo.ifscCode =
      this.fiEMandateSummaryList[0]?.ifscCode;
    this.initiateEMandateInput.clientBankInfo.accountHolderName =
      this.fiEMandateSummaryList[0]?.accountHolderName;
  }

  isAgreementNotSigned() {
    console.log(this.clientFileBasicInfo.clientFileStatus);
    return (
      this.clientFileBasicInfo.clientFileStatus.id ===
      Data.ClientFile.CLIENT_FILE_STATUS.LEAD.id
    );
  }

  isActive() {
    return (
      this.selectedEMandateSummaryToView.status.id ===
      Data.ClientFile.EMANDATE_STATUS.ACTIVE.id
    );
  }

  getClientFileBasicInfo() {
    Action.ClientFile.GetClientFileBasicInfo.execute1(
      this.clientFileBasicInfo.clientFileNumber,
      (output) => {}
    );
  }

  checkAndUpdateEMandate() {
    Action.ClientFile.CheckAndUpdateEMandate.execute1(
      this.selectedEMandateSummaryToView.eMandateId,
      (output) => {
        this.getEMandateDetails(this.selectedEMandateSummaryToView.eMandateId);
        FSnackbar.success("Successfully checked the emandate status");
      }
    );
  }

  getEMandateDetails(eMandateId: string) {
    Action.ClientFile.GetEMandateDetails.execute1(eMandateId, (output: any) => {
      this.selectedEMandateSummaryToView = output;
      this.getEMandateList();
    });
  }

  gotoCreateEMandate() {
    this.$router.push({
      name: "Root.CFile.CFAction.CFCreateRequest",
      query: { flowName: "EMandate" },
    });
  }

  markDefault(eMandateId: string) {
    Action.ClientFile.MarkEMandateAsDefault.execute1(eMandateId, (output) => {
      Snackbar.show({
        text: "Succesfully marked as default",
        pos: "bottom-center",
      });
      this.getEMandateListWithDelay();
    });
  }

  openRecordEMandatePage() {
    this.$router.push({name: "Root.CFile.CFAction.RecordEMandate"})
  }
  getEMandateListWithDelay() {
    setTimeout(() => {
      this.getEMandateList();
    }, 1000);
  }

  closeEMandateDetails() {
    this.showViewEMandateForm = false;
  }
}
</script>
