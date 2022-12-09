<template>
  <v-card flat>
    <!-- <v-card-actions class="pa-0 ma-0">
      <f-btn
        class="mx-2"
        label="START"
        small
        outlined
        color="primary"
        :onClick="() => pullAndStartTask()"
        v-if="
          taskDetails.taskState === 'ALLOCATED' ||
          taskDetails.taskState === 'TO_BE_PULLED'
        "
      ></f-btn>
    </v-card-actions> -->
    <v-card-text class="pa-0">
      <component v-if="!loading" :is="selectedComponent"></component>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";

import CollectClientInfoTask from "@/section/spineapp/components/task/enrollment/collectClientInfo/CollectClientInfoTask.vue";
import ClientInfoVerificationTask from "@/section/spineapp/components/task/enrollment/clientInfoVerification/ClientInfoVerificationTask.vue";
import EMandateFailedTask from "@/section/spineapp/components/task/enrollment/eMandateFailed/EMandateFailedTask.vue";
import SignServiceAgreementFailedTask from "@/section/spineapp/components/task/enrollment/signServiceAgreementFailed/SignServiceAgreementFailedTask.vue";
import EnrollmentCompletionTask from "@/section/spineapp/components/task/enrollment/enrollmentCompletion/EnrollmentCompletionTask.vue";
import DownloadUnSignedDocTask from "@/section/spineapp/components/task/digio/downloadUnSignedDoc/DownloadUnSignedDocTask.vue";
import GenerateSSADocTask from "@/section/spineapp/components/task/digio/generateSSADoc/GenerateSSADocTask.vue";
import UpdateClientSignStatusTask from "@/section/spineapp/components/task/digio/updateClientSignStatus/UpdateClientSignStatusTask.vue";
import UploadUnSignedDocTask from "@/section/spineapp/components/task/digio/uploadUnSignedDoc/UploadUnSignedDocTask.vue";

import WaitForClientSignTask from "@/section/spineapp/components/task/digio/waitForClientSign/WaitForClientSignTask.vue";
import UploadClientSignedDocTask from "@/section/spineapp/components/task/digio/uploadClientSignedDoc/UploadClientSignedDocTask.vue";
import SignByFreedTask from "@/section/spineapp/components/task/digio/signByFreed/SignByFreedTask.vue";
import CHPPTask from "@/section/spineapp/components/task/chpp/chpp/CHPPTask.vue";
import NsfMSFTask from "@/section/spineapp/components/task/nsfMSF/nsfMSF/NsfMSFTask.vue";
import GenerateLinkTask from "@/section/spineapp/components/task/manualPayment/generateLink/GenerateLinkTask.vue";
import SendLinkTask from "@/section/spineapp/components/task/manualPayment/sendLink/SendLinkTask.vue";
import NsfMSFCompletionTask from "@/section/spineapp/components/task/nsfMSF/nsfMSFCompletion/NsfMSFCompletionTask.vue";
import NsfMSFSystemDeferredTask from "@/section/spineapp/components/task/nsfMSF/nsfMSFSystemDeferred/NsfMSFSystemDeferredTask.vue";
import NsfMSFClientDeferredTask from "@/section/spineapp/components/task/nsfMSF/nsfMSFClientDeferred/NsfMSFClientDeferredTask.vue";
import PaymentReceivedConfirmationTask from "@/section/spineapp/components/task/manualPayment/paymentReceivedConfirmation/PaymentReceivedConfirmationTask.vue";
import CheckManualPaymentReceivedTask from "@/section/spineapp/components/task/manualPayment/checkManualPaymentReceived/CheckManualPaymentReceivedTask.vue";
import UnderwrittingTask from "@/section/spineapp/components/task/enrollment/underwritting/UnderwrittingTask.vue";
import NsfMSFDraftRescheduledTask from "@/section/spineapp/components/task/nsfMSF/nsfMSFDraftRescheduled/NsfMSFDraftRescheduledTask.vue";
import SignServiceAgreementTask from "@/section/spineapp/components/task/enrollment/signServiceAgreement/SignServiceAgreementTask.vue";
import EMandateTask from "@/section/spineapp/components/task/enrollment/eMandate/EMandateTask.vue";
import ManageClientInfoTask from "@/section/spineapp/components/task/welcomeCall/manageClientInfo/ManageClientInfoTask.vue";
import WelcomeCallSignServiceAgreementFailedTask from "@/section/spineapp/components/task/welcomeCall/signServiceAgreementFailed/SignServiceAgreementFailedTask.vue";
import ReceiveManualPaymentTask from "@/section/spineapp/components/task/nsfMSF/receiveManualPayment/ReceiveManualPaymentTask.vue";
import ManageClientInfoCompletionTask from "@/section/spineapp/components/task/welcomeCall/manageClientInfoCompletion/ManageClientInfoCompletionTask.vue";
import WelcomeCallSSATask from "@/section/spineapp/components/task/welcomeCall/signServiceAgreement/WelcomeCallSSATask.vue";
import WelcomeCallEMandateTask from "@/section/spineapp/components/task/welcomeCall/eMandate/EMandateTask.vue";
import SignAmendmentTask from "@/section/spineapp/components/task/welcomeCall/signAmendment/SignAmendmentTask.vue";
import NsfSPATask from "@/section/spineapp/components/task/nsfSPA/nsfSPA/NsfSPATask.vue";
import NsfSPADraftRescheduledTask from "@/section/spineapp/components/task/nsfSPA/nsfSPADraftRescheduled/NsfSPADraftRescheduledTask.vue";
import NsfSPACompletionTask from "@/section/spineapp/components/task/nsfSPA/nsfSPACompletion/NsfSPACompletionTask.vue";
import NsfSPAClientDeferredTask from "@/section/spineapp/components/task/nsfSPA/nsfSPAClientDeferred/NsfSPAClientDeferredTask.vue";
import NsfSPAReceiveManualPaymentTask from "@/section/spineapp/components/task/nsfSPA/receiveManualPayment/ReceiveManualPaymentTask.vue";
import NsfSPASystemDeferredTask from "@/section/spineapp/components/task/nsfSPA/nsfSPASystemDeferred/NsfSPASystemDeferredTask.vue";
import FBtn from "@/components/generic/FBtn.vue";
import Helper from "@/section/spineapp/util/Helper";
import FollowUpCallTask from "@/section/spineapp/components/task/mfc/FollowUpCallTask.vue";
import DownloadClientSignDocTask from "@/section/spineapp/components/task/digio/downloadClientSignDoc/DownloadClientSignDocTask.vue";
import UploadFreedSignedDocTask from "@/section/spineapp/components/task/digio/uploadFreedSignedDoc/UploadFreedSignedDocTask.vue";
import ClientSignExpiredTask from "@/section/spineapp/components/task/digio/clientSignExpired/ClientSignExpiredTask.vue";
import CreateEMandateTask from "@/section/spineapp/components/task/eMandate/createEMandate/CreateEMandateTask.vue";
import WaitForEMandateTask from "@/section/spineapp/components/task/eMandate/waitForEMandate/WaitForEMandateTask.vue";
import SendEMandateLinkTask from "@/section/spineapp/components/task/eMandate/sendEMandateLink/SendEMandateLinkTask.vue";
import GetEMandateStatusTask from "@/section/spineapp/components/task/eMandate/getEMandateStatus/GetEMandateStatusTask.vue";
import CollectMSFTask from "@/section/spineapp/components/task/enrollment/collectMSF/CollectMSFTask.vue";
import PlanSettlementTask from "@/section/spineapp/components/task/settlementPlan/planSettlement/PlanSettlementTask.vue";
import MFCCompletionTask from "@/section/spineapp/components/task/mfc/MFCCompletion/MFCCompletionTask.vue";
import PrepareAmendmentTask from "@/section/spineapp/components/task/amendment/prepareAmendment/PrepareAmendmentTask.vue";
import RefundFeeTask from "@/section/spineapp/components/task/refundfee/refundFee/RefundFeeTask.vue";

@Component({
  components: {
    CollectClientInfoTask,
    ClientInfoVerificationTask,
    EMandateFailedTask,
    UnderwrittingTask,
    SignServiceAgreementFailedTask,
    EnrollmentCompletionTask,
    DownloadUnSignedDocTask,
    GenerateSSADocTask,
    UpdateClientSignStatusTask,
    WaitForClientSignTask,
    DownloadClientSignDocTask,
    UploadFreedSignedDocTask,
    UploadClientSignedDocTask,
    SignByFreedTask,
    ClientSignExpiredTask,
    CreateEMandateTask,
    UploadUnSignedDocTask,
    CHPPTask,
    WaitForEMandateTask,
    SendEMandateLinkTask,
    GetEMandateStatusTask,
    NsfMSFTask,
    GenerateLinkTask,
    SendLinkTask,
    NsfMSFCompletionTask,
    MFCCompletionTask,
    NsfMSFSystemDeferredTask,
    NsfMSFClientDeferredTask,
    PaymentReceivedConfirmationTask,
    CheckManualPaymentReceivedTask,
    NsfMSFDraftRescheduledTask,
    ReceiveManualPaymentTask,
    SignServiceAgreementTask,
    EMandateTask,
    ManageClientInfoTask,
    WelcomeCallSignServiceAgreementFailedTask,
    SignAmendmentTask,
    ManageClientInfoCompletionTask,
    WelcomeCallSSATask,
    WelcomeCallEMandateTask,
    NsfSPATask,
    NsfSPADraftRescheduledTask,
    NsfSPACompletionTask,
    NsfSPAClientDeferredTask,
    NsfSPAReceiveManualPaymentTask,
    NsfSPASystemDeferredTask,
    "f-btn": FBtn,
    FollowUpCallTask,
    CollectMSFTask,
    PlanSettlementTask,
    PrepareAmendmentTask,
    RefundFeeTask
  },
})
export default class CFTaskDetails extends Vue {
  @Store.Getter.Login.LoginDetails.userName userName: string;

  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;
  loading = true;

  get items() {
    return [
      {
        text: "Tasks",
        disabled: false,
        routerName: "Root.ClientFile.Workarea",
      },
      {
        text: this.taskDetails.taskName,
        disabled: false,
      },
    ];
  }

  TASK_COMPONENT_MAP = new Map([
    ["Enrollment::CollectClientInfo", "CollectClientInfoTask"],
    ["Enrollment::ClientInfoVerification", "ClientInfoVerificationTask"],
    ["Enrollment::SignServiceAgreement", "SignServiceAgreementTask"],
    [
      "Enrollment::SignServiceAgreementFailed",
      "SignServiceAgreementFailedTask",
    ],
    ["Enrollment::EMandate", "EMandateTask"],
    ["Enrollment::EMandateFailed", "EMandateFailedTask"],
    ["Enrollment::Underwritting", "UnderwrittingTask"],
    ["Enrollment::CollectMSF", "CollectMSFTask"],
    ["Enrollment::EnrollmentCompletion", "EnrollmentCompletionTask"],
    ["EMandate::CreateEMandate", "CreateEMandateTask"],
    ["EMandate::SendEMandateLink", "SendEMandateLinkTask"],
    ["EMandate::WaitForEMandate", "WaitForEMandateTask"],
    ["EMandate::GetEMandateStatus", "GetEMandateStatusTask"],
    ["Digio::GenerateSSADoc", "GenerateSSADocTask"],
    ["Digio::DownloadUnSignedDoc", "DownloadUnSignedDocTask"],
    ["Digio::UploadUnSignedDoc", "UploadUnSignedDocTask"],
    ["Digio::WaitForClientSign", "WaitForClientSignTask"],
    ["Digio::UpdateClientSignStatus", "UpdateClientSignStatusTask"],
    ["Digio::DownloadClientSignDoc", "DownloadClientSignDocTask"],
    ["Digio::UploadClientSignedDoc", "UploadClientSignedDocTask"],
    ["Digio::SignByFreed", "SignByFreedTask"],
    ["Digio::UploadFreedSignedDoc", "UploadFreedSignedDocTask"],
    ["Digio::ClientSignExpired", "ClientSignExpiredTask"],
    ["CHPP::CHPP", "CHPPTask"],
    ["NsfMSF::NsfMSF", "NsfMSFTask"],
    ["NsfMSF::NsfMSFSystemDeferred", "NsfMSFSystemDeferredTask"],
    ["NsfMSF::NsfMSFClientDeferred", "NsfMSFClientDeferredTask"],
    ["NsfMSF::NsfMSFDraftRescheduled", "NsfMSFDraftRescheduledTask"],
    ["NsfMSF::ReceiveManualPayment", "ReceiveManualPaymentTask"],
    ["NsfMSF::NsfMSFCompletion", "NsfMSFCompletionTask"],
    ["ManualPayment::GenerateLink", "GenerateLinkTask"],
    ["ManualPayment::SendLink", "SendLinkTask"],
    [
      "ManualPayment::CheckManualPaymentReceived",
      "CheckManualPaymentReceivedTask",
    ],
    [
      "ManualPayment::PaymentReceivedConfirmation",
      "PaymentReceivedConfirmationTask",
    ],
    ["WelcomeCall::ManageClientInfo", "ManageClientInfoTask"],
    [
      "WelcomeCall::SignServiceAgreementFailed",
      "WelcomeCallSignServiceAgreementFailedTask",
    ],
    ["WelcomeCall::SignAmendment", "SignAmendmentTask"],
    [
      "WelcomeCall::ManageClientInfoCompletion",
      "ManageClientInfoCompletionTask",
    ],
    ["WelcomeCall::SignServiceAgreement", "WelcomeCallSSATask"],
    ["WelcomeCall::EMandate", "WelcomeCallEMandateTask"],
    [
      "WelcomeCall::ManageClientInfoCompletion",
      "ManageClientInfoCompletionTask",
    ],
    ["NsfSPA::NsfSPA", "NsfSPATask"],
    ["NsfSPA::NsfSPADraftRescheduled", "NsfSPADraftRescheduledTask"],
    ["NsfSPA::NsfSPACompletion", "NsfSPACompletionTask"],
    ["NsfSPA::NsfSPAClientDeferred", "NsfSPAClientDeferredTask"],
    ["NsfSPA::ReceiveManualPayment", "NsfSPAReceiveManualPaymentTask"],
    ["NsfSPA::NsfSPASystemDeferred", "NsfSPASystemDeferredTask"],
    ["MFC::FollowUpCall", "FollowUpCallTask"],
    ["MFC::MFCCompletion", "MFCCompletionTask"],
    ["SettlementPlan::PlanSettlement", "PlanSettlementTask"],
    ["Amendment::PrepareAmendment", "PrepareAmendmentTask"],
    ["RefundFee::RefundFee", "RefundFeeTask"],
    
  ]);

  taskId = this.$route.params.taskId;

  get fqTaskName() {
    return `${this.taskDetails.flowName}::${this.taskDetails.taskName}`;
  }

  get selectedComponent() {
    return this.TASK_COMPONENT_MAP.get(this.fqTaskName);
  }

  get taskFormDisabled() {
    return !(
      this.taskDetails.taskState === "STARTED" ||
      this.taskDetails.taskState === "PARTIALLY_COMPLETED"
    );
  }

  public getExecutiveTaskDetailsHandler = (output: any) =>
    this.getExecutiveTaskDetailsWithDelay();

  public handleSaveAndComplete = () => {
    //this.gotoFile();
  };
  public mounted() {
    Action.TaskList.PullTask.interested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.PullStartAndMerge.interested(
      this.getExecutiveTaskDetailsHandler
    );
    Action.TaskList.Save.interested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.Complete.interested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.SaveAndComplete.interested(
      this.getTaskDetailsAndFileSummaryWithDelay
    );
    Action.TaskList.Suspend.interested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.Resume.interested(this.getExecutiveTaskDetailsHandler);

    //Commands

    Action.Spine.ReceiveFirstMSFPayment.interested(
      this.getExecutiveTaskDetailsHandler
    );
    Action.Spine.UpdatePaymentStatus.interested(
      this.getExecutiveTaskDetailsHandler
    );

   Action.ClientFile.MarkClientFileAsOnBoarded.interested(
      this.getTaskDetailsAndFileSummaryWithDelay
    );

    this.getExecutiveTaskDetailsWithDelay();
  }

  getExecutiveTaskDetailsWithDelay() {
    setTimeout(this.getExecutiveTaskDetails, 1000);
  }

  getTaskDetailsAndFileSummaryWithDelay() {
    setTimeout(() => {
      this.getExecutiveTaskDetails();
      this.findClientFileSummary();
      this.$router.push({ name: "Root.CFile.CFTask.CFActiveTasks" });
    }, 1000);
  }

  getExecutiveTaskDetails() {
    Action.TaskList.GetExecutiveTaskDetails.execute1(
      this.$route.params.taskId,
      (output) => {
        // console.log(output);
        this.loading = false;
      }
    );
  }

  pullAndStartTask() {
    Action.TaskList.PullStartAndMerge.execute1(
      this.$route.params.taskId,
      (output) => {
        // console.log("");
      }
    );
  }

  pullTask() {
    Action.TaskList.PullTask.execute2(
      this.$route.params.taskId,
      this.userName,
      (output) => {
        // this.gotoTask(item);
      }
    );
  }

  gotoFile() {
    Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: this.$route.params.clientFileNumber,
    });
  }

  goto(routerName: string) {
    this.$router.push({
      name: routerName,
      query: {
        ...this.$route.query,
      },
    });
  }

  gotoTask(item: any) {
    const params = { ...this.$route.params, taskId: item.taskId };
    // console.log(" gotoTask ------------------ ");
    // console.log(params);
    this.$router.push({
      name: "Root.ClientFile.FileTask.FileTaskDetails",
      params: params,
      query: {
        ...this.$route.query,
      },
    });
  }

  public destroyed() {
    Action.TaskList.PullTask.notInterested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.PullStartAndMerge.notInterested(
      this.getExecutiveTaskDetailsHandler
    );
    Action.TaskList.Save.notInterested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.Complete.notInterested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.SaveAndComplete.notInterested(
      this.getTaskDetailsAndFileSummaryWithDelay
    );
    Action.TaskList.Suspend.notInterested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.Resume.notInterested(this.getExecutiveTaskDetailsHandler);

    //Commands
    Action.Spine.ReceiveFirstMSFPayment.notInterested(
      this.getExecutiveTaskDetailsHandler
    );
    Action.Spine.UpdatePaymentStatus.notInterested(
      this.getExecutiveTaskDetailsHandler
    );

       Action.ClientFile.MarkClientFileAsOnBoarded.notInterested(
      this.getTaskDetailsAndFileSummaryWithDelay
    );

  }

  findClientFileSummary() {
    Action.ClientFile.GetClientFileSummary.execute1(
      this.clientFileBasicInfo.clientFileId,
      (output) => {}
    );
  }
}
</script>

<style></style>
