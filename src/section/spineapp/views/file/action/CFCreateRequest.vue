<template>
  <div class="CFCreateRequest">
    <div class="d-flex justify-space-between align-center mx-5">
      <h4>Create Flow</h4>
      <v-btn @click="gotoAction" text icon color="lighten-2" class="ma-2">
        <v-icon size="20">mdi-close</v-icon>
      </v-btn>
    </div>
    <div class="d-flex justify-center col-12 ma-auto">
      <v-card
        class="pa-0 ma-0 mt-5 col-12"
        color="white"
        outlined
        min-height="300px"
      >
        <v-card-text>
          <v-autocomplete
            v-model="selectedRequestType"
            :items="requestTypeFlowMapList"
            flat
            hide-no-data
            hide-details
            label="Select Request Type"
            outlined
            dense
            item-value="contentMetaData"
            item-text="key"
          ></v-autocomplete>
        </v-card-text>

        <v-card-text>
          <component
            v-if="!!selectedRequestType"
            :ref="selectedRequestType.myRefName"
            :is="selectedRequestType.componentName"
            v-model="fileCreateRequestInput"
            v-bind="selectedRequestType.props"
          ></component>
        </v-card-text>
      </v-card>
    </div>
  </div>
  <!--  TASK TAB -->
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";

import FForm from "@/components/generic/form/FForm.vue";
import EnrollmentFFormMDP from "@/section/spineapp/components/task/createRequestForm/EnrollmentFFormMDP";
import Helper from "../../../util/Helper";
import CHPPFFormMDP from "@/section/spineapp/components/task/createRequestForm/CHPPFFormMDP";
import NsfMSFFFormMDP from "@/section/spineapp/components/task/createRequestForm/NsfMSFFFormMDP";
import WelcomeCallFFormMDP from "@/section/spineapp/components/task/createRequestForm/WelcomeCallFFormMDP";
import MFCFFormMDP from "@/section/spineapp/components/task/createRequestForm/MFCFFormMDP";
import NsfSPAFFormMDP from "@/section/spineapp/components/task/createRequestForm/NsfSPAFFormMDP";
import EMandateFFormMDP from "@/section/spineapp/components/task/createRequestForm/EMandateFFormMDP";
import SettlementPlanFFormMDP from "@/section/spineapp/components/task/createRequestForm/SettlementPlanFFormMDP";
import RefundFeeFFormMDP from "@/section/spineapp/components/task/createRequestForm/RefundFeeFFormMDP";

@Component({
  components: {
    EnrollmentFFormMDP,
    CHPPFFormMDP,
    NsfMSFFFormMDP,
    WelcomeCallFFormMDP,
    MFCFFormMDP,
    EMandateFFormMDP,
    FForm,
  },
})
export default class CFCreateRequest extends Vue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  @Store.Getter.ClientFile.ClientFileSummary.fiCreditorInfo
  fiCreditorInfo: Data.ClientFile.FiCreditorInfo;

  createEMandateInput: any = new Data.Spine.CreateEMandateInput();
  createSettlementPlanInput: Data.Spine.CreateSettlementPlanInput =
    new Data.Spine.CreateSettlementPlanInput();

  createRefundFeeInput: Data.Spine.CreateRefundFeeInput =
    new Data.Spine.CreateRefundFeeInput();
  nupayBankMasterList: Data.ClientFile.NupayBankMaster[] = [];
  

  @Watch("fileCreateRequestInput.createSettlementPlanInput.fiCreditorId")
  creditorChanged(newVal: any, oldVal: any) {
    console.log(newVal);
    const totalOutstanding: any = this.fiCreditorInfo.creditorList.find(
      (item) => item.fiCreditorId === newVal
    )?.creditorBalance;
    this.fileCreateRequestInput.createSettlementPlanInput.totalOutstandingAmount =
      totalOutstanding;
  }

  leftFocused = false;
  rightFocused = true;

  selectedRequestType: any = {};

  queryFlowName = this.$route.query.flowName;

  get fileCreateRequestInput() {
    this.createEMandateInput.eMandateBankInfo.accountHolderName =
      this.clientFileBasicInfo.clientBasicInfo.fullName;
    return {
      createEMandateInput: this.createEMandateInput,
      createSettlementPlanInput: this.createSettlementPlanInput,
      createRefundFeeInput: this.createRefundFeeInput
    };
  }
  get requestTypeFlowMapList() {
    return [
      {
        key: "Enrollment",
        contentMetaData: new EnrollmentFFormMDP({
          taskRoot: this,
          parent: this,
        }).getMetaData(),
      },
      {
        key: "CHPP",
        contentMetaData: new CHPPFFormMDP({
          taskRoot: this,
          parent: this,
        }).getMetaData(),
      },
      {
        key: "NsfMSF",
        contentMetaData: new NsfMSFFFormMDP({
          taskRoot: this,
          parent: this,
        }).getMetaData(),
      },
      {
        key: "Welcome Call",
        contentMetaData: new WelcomeCallFFormMDP({
          taskRoot: this,
          parent: this,
        }).getMetaData(),
      },
      {
        key: "MFC",
        contentMetaData: new MFCFFormMDP({
          taskRoot: this,
          parent: this,
        }).getMetaData(),
      },
      {
        key: "NsfSPA",
        contentMetaData: new NsfSPAFFormMDP({
          taskRoot: this,
          parent: this,
        }).getMetaData(),
      },
      {
        key: "EMandate",
        contentMetaData: new EMandateFFormMDP({
          taskRoot: this,
          parent: this,
        }).getMetaData(),
      },
      {
        key: "Settlement Plan",
        contentMetaData: new SettlementPlanFFormMDP({
          taskRoot: this,
          parent: this,
        }).getMetaData(),
      },
      {
        key: "Refund Fee",
        contentMetaData: new RefundFeeFFormMDP({
          taskRoot: this,
          parent: this,
        }).getMetaData(),
      },
    ];
  }

  get initDocumentData() {
    return {
      clientFileNumber: this.clientFileBasicInfo.clientFileNumber,
    };
  }
  get createRequestFormData() {
    return {
      ...this.selectedRequestType,
      initDocument: JSON.stringify(this.initDocumentData),
    };
  }

  get clientFileId() {
    return this.$route.params.clientFileId;
  }

  mounted() {
    // this.getNupayBankMasterList();
    this.createRefundFeeInput.accountDetails = new Data.Spine.AccountDetails();
    this.getFiCreditorInfo();
  }

  getFiCreditorInfo() {
    Action.ClientFile.GetCreditorInfo.execute1(this.clientFileId, (output) => {
      this.selectRequestFromQuery();
    });
  }

  selectRequestFromQuery() {
    if (this.queryFlowName) {
      this.selectedRequestType = this.requestTypeFlowMapList.find(
        (x) => x.key === this.queryFlowName
      )?.contentMetaData;
    }
  }

  createEnrollmentFlow() {
    Action.Spine.CreateEnrollment.execute2(
      this.clientFileBasicInfo.clientFileNumber,
      undefined,
      (output) => {
        setTimeout(() => {
          this.gotoTask();
        }, 400);
      }
    );
  }

  createEnrollmentFlowV1() {
    Action.Spine.CreateEnrollment.execute2(
      this.clientFileBasicInfo.clientFileNumber,
      "V1Net",
      (output) => {
        setTimeout(() => {
          this.gotoTask();
        }, 400);
      }
    );
  }

  createCHPPFlow() {
    Action.Spine.CreateCHPP.execute1(
      this.clientFileBasicInfo.clientFileNumber,
      (output) => {
        setTimeout(() => {
          this.gotoTask();
        }, 400);
      }
    );
  }

  createNsfMSFFlow() {
    Action.Spine.CreateNsfMSF.execute1(
      this.clientFileBasicInfo.clientFileNumber,
      (output) => {
        setTimeout(() => {
          this.gotoTask();
        }, 400);
      }
    );
  }
  createAmendment() {
    Action.Spine.CreateAmendment.execute1(
      this.clientFileBasicInfo.clientFileNumber,
      (output) => {
        setTimeout(() => {
          this.gotoTask();
        }, 400);
      }
    );
  }

  createWelcomeCall() {
    Action.Spine.CreateWelcomeCall.execute1(
      this.clientFileBasicInfo.clientFileNumber,
      (output) => {
        setTimeout(() => {
          this.gotoTask();
        }, 400);
      }
    );
  }

  createMFC() {
    Action.Spine.CreateMFC.execute1(
      this.clientFileBasicInfo.clientFileNumber,
      (output) => {
        setTimeout(() => {
          this.gotoTask();
        }, 400);
      }
    );
  }
  createNsfSPA() {
    Action.Spine.CreateNsfSPA.execute1(
      this.clientFileBasicInfo.clientFileNumber,
      (output) => {
        setTimeout(() => {
          this.$emit("flowCreated");
        }, 400);
      }
    );
  }

  createEMandate() {
    console.log("createEMandate--- ", this.createEMandateInput);
    this.fileCreateRequestInput.createEMandateInput.clientFileNumber =
      this.clientFileBasicInfo.clientFileNumber;
    Action.Spine.CreateEMandate.execute(
      this.fileCreateRequestInput.createEMandateInput,
      (output) => {
        setTimeout(() => {
          this.gotoTask();
        }, 400);
      }
    );
  }

  createSettlementPlan() {
    this.fileCreateRequestInput.createSettlementPlanInput.clientFileNumber =
      this.clientFileBasicInfo.clientFileNumber;
    console.log(this.fileCreateRequestInput.createSettlementPlanInput);
    const input = Data.Spine.CreateSettlementPlanInput.fromJson(this.fileCreateRequestInput.createSettlementPlanInput)
    Action.Spine.CreateSettlementPlan.execute(
      input,
      (output) => {
        setTimeout(() => {
          this.gotoTask();
        }, 400);
      }
    );
  }

  createRefundFeeFlow() {
    if(this.createRefundFeeInput.accountDetails?.nupayBankMasterId === "") {
      this.createRefundFeeInput.accountDetails = undefined;
    }
    this.createRefundFeeInput.clientFileNumber = this.clientFileBasicInfo.clientFileNumber;
    Action.Spine.CreateRefundFee.execute(this.createRefundFeeInput, output => {
       setTimeout(() => {
          this.gotoTask();
        }, 400);
    })
  }

  populateBankDetails(details: any) {
    this.fileCreateRequestInput.createEMandateInput.eMandateBankInfo.bankAddress.addressLine1 =
      details.ADDRESS;
    this.fileCreateRequestInput.createEMandateInput.eMandateBankInfo.bankAddress.city =
      details.CITY;
    this.fileCreateRequestInput.createEMandateInput.eMandateBankInfo.bankAddress.state =
      details.STATE;
    this.fileCreateRequestInput.createEMandateInput.eMandateBankInfo.bankAddress.country =
      "India";
  }

  populateAccountDetailsRefund(details: any) {
    this.fileCreateRequestInput.createRefundFeeInput.accountDetails = details;
  }  

  // getNupayBankMasterList() {
  //   Action.ClientFile.GetNupayBankMasterList.execute((output) => {
  //     this.nupayBankMasterList = output.nupayBankMasterList;
  //   });
  // }

  gotoFile(clientFileNumber: string) {
    Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: clientFileNumber,
    });
  }

  gotoTask() {
    this.$router.push({
      name: "Root.CFile.CFTask.CFActiveTasks",
      params: {
        clientFileId: this.clientFileId,
      },
    });
  }

  gotoAction(paymentId: string) {
    this.$router.push({
      name: "Root.CFile.CFAction.CFActionList",
      params: {
        clientFileId: this.clientFileId,
      },
    });
  }
}
</script>

<style>
.v-btn {
  text-transform: unset !important;
}
</style>
