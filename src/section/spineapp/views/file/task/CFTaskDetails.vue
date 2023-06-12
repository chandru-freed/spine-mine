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
import RefundFeeTask from "@/section/spineapp/components/task/refundfee/refundFee/RefundFeeTask.vue";
import CollectMSFThroughCashfreeTask from "@/section/spineapp/components/task/enrollment/collectMSFThroughCashfree/CollectMSFThroughCashfreeTask.vue";
import CollectNSFMSFThroughCashfreeTask from "@/section/spineapp/components/task/enrollment/collectNSFMSFThroughCashfree/CollectNSFMSFThroughCashfreeTask.vue";
import RefundSPATask from "@/section/spineapp/components/task/refundspa/refundSPA/RefundSPATask.vue";
import GenericTask from "@/section/spineapp/components/task/genericTask/GenericTask.vue";
import UpdateRefundSPAPaymentStatusTaskTask from "@/section/spineapp/components/task/refundspa/updateRefundSPAPaymentStatusTask/UpdateRefundSPAPaymentStatusTaskTask.vue";
import EnrollClientFileTask from "@/section/spineapp/components/task/enrollment/enrollClientFile/EnrollClientFileTask.vue";
import SignedByClientTask from "@/section/spineapp/components/task/amendment/signedByClient/SignedByClientTask.vue";
import FollowUpAmendmentEMandateTask from "@/section/spineapp/components/task/amendment/followUpAmendmentEMandate/FollowUpAmendmentEMandateTask.vue";
import PrepareAmendmentV4Task from "@/section/spineapp/components/task/amendment/prepareAmendmentV4/prepareAmendmentV4Task.vue";
import ApproveAmendmentV4Task from "@/section/spineapp/components/task/amendment/approveAmendmentV4/approveAmendmentV4Task.vue";
import SignedByClientV4Task from "@/section/spineapp/components/task/amendment/signedByClientV4/SignedByClientV4Task.vue";
import FollowUpAmendmentEMandateV4Task from "@/section/spineapp/components/task/amendment/followUpAmendmentEMandateV4/FollowUpAmendmentEMandateV4Task.vue";
import RetainCancelledFileTask from "@/section/spineapp/components/task/retain/retainCancelledFile/RetainCancelledFileTask.vue";
import RetainPendingCancelledFileTask from "@/section/spineapp/components/task/retainPendingCancelled/retainPendingCancelledFile/RetainPendingCancelledFileTask.vue";
import CancellationChecklistTask from "@/section/spineapp/components/task/cancellation/cancellationChecklist/CancellationChecklistTask.vue";
import Task from "@/section/spineapp/util/Task";

@Component({
  components: {
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
    RefundFeeTask,
    CollectMSFThroughCashfreeTask,
    CollectNSFMSFThroughCashfreeTask,
    RefundSPATask,
    GenericTask,
    UpdateRefundSPAPaymentStatusTaskTask,
    EnrollClientFileTask,
    SignedByClientTask,
    FollowUpAmendmentEMandateTask,
    PrepareAmendmentV4Task,
    ApproveAmendmentV4Task,
    SignedByClientV4Task,
    FollowUpAmendmentEMandateV4Task,
    RetainCancelledFileTask,
    RetainPendingCancelledFileTask,
    CancellationChecklistTask
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


  taskId = this.$route.params.taskId;

  get fqTaskName() {
    return `${this.taskDetails.flowName}::${this.taskDetails.taskName}`;
  }

  get selectedComponent() {
    let selectedComponentTemp = Task.TASK_COMPONENT_MAP.get(this.fqTaskName);
    return !selectedComponentTemp ? "GenericTask" : selectedComponentTemp;
  }

  get taskFormDisabled() {
    return !(
      this.taskDetails.taskState === "STARTED" ||
      this.taskDetails.taskState === "PARTIALLY_COMPLETED"
    );
  }

  public getExecutiveTaskDetailsHandler = (output: any) => {
    setTimeout(this.getExecutiveTaskDetails, 1000);
  };

  public getTaskDetailsAndFileSummaryWithDelayHandler = (output: any) => {
    setTimeout(() => {
      this.getExecutiveTaskDetails();
      this.findClientFileSummary();
      this.$router.push({ name: "Root.CFile.CFTask.CFActiveTasks" });
    }, 1000);
  };

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
      this.getTaskDetailsAndFileSummaryWithDelayHandler
    );
    Action.TaskList.Suspend.interested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.Resume.interested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.Rescue.interested(this.getExecutiveTaskDetailsHandler);

    //Commands

    Action.Spine.ReceiveFirstMSFPayment.interested(
      this.getExecutiveTaskDetailsHandler
    );

    Action.Spine.UpdateFirstMSFPaymentStatus.interested(
      this.getExecutiveTaskDetailsHandler
    );

    Action.Spine.UpdateMsfPaymentStatus.interested(
      this.getExecutiveTaskDetailsHandler
    );

    Action.Spine.ReceiveMSFPayment.interested(
      this.getExecutiveTaskDetailsHandler
    );

    Action.TaskList.Suspend.interested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.Resume.interested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.Retry.interested(this.getExecutiveTaskDetailsHandler);

    Action.TaskList.CancelFlow.interested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.CancelTask.interested(this.getExecutiveTaskDetailsHandler);

    // Ohter Action list
    Action.ClientFile.Activate.interested(
      this.getTaskDetailsAndFileSummaryWithDelayHandler
    );
    Action.ClientFile.Hold.interested(
      this.getTaskDetailsAndFileSummaryWithDelayHandler
    );
    Action.ClientFile.Resume.interested(
      this.getTaskDetailsAndFileSummaryWithDelayHandler
    );
    Action.ClientFile.Graduate.interested(
      this.getTaskDetailsAndFileSummaryWithDelayHandler
    );
    // Action.ClientFile.Cancel.interested(
    //   this.getTaskDetailsAndFileSummaryWithDelayHandler
    // );

    this.getExecutiveTaskDetailsWithDelay();
  }

  public destroyed() {
    Action.TaskList.PullTask.notInterested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.PullStartAndMerge.notInterested(
      this.getExecutiveTaskDetailsHandler
    );
    Action.TaskList.Save.notInterested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.Complete.notInterested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.SaveAndComplete.notInterested(
      this.getTaskDetailsAndFileSummaryWithDelayHandler
    );
    Action.TaskList.Suspend.notInterested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.Resume.notInterested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.Retry.notInterested(this.getExecutiveTaskDetailsHandler);

    //Commands
    Action.Spine.ReceiveFirstMSFPayment.notInterested(
      this.getExecutiveTaskDetailsHandler
    );
    Action.Spine.UpdateFirstMSFPaymentStatus.notInterested(
      this.getExecutiveTaskDetailsHandler
    );

    Action.Spine.ReceiveMSFPayment.notInterested(
      this.getExecutiveTaskDetailsHandler
    );

    Action.Spine.UpdateMsfPaymentStatus.notInterested(
      this.getExecutiveTaskDetailsHandler
    );

    Action.TaskList.Suspend.notInterested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.Resume.notInterested(this.getExecutiveTaskDetailsHandler);

    Action.TaskList.CancelFlow.notInterested(
      this.getExecutiveTaskDetailsHandler
    );
    Action.TaskList.CancelTask.notInterested(
      this.getExecutiveTaskDetailsHandler
    );

    // Ohter Action list
    Action.ClientFile.Activate.notInterested(
      this.getTaskDetailsAndFileSummaryWithDelayHandler
    );
    Action.ClientFile.Hold.notInterested(
      this.getTaskDetailsAndFileSummaryWithDelayHandler
    );
    Action.ClientFile.Resume.notInterested(
      this.getTaskDetailsAndFileSummaryWithDelayHandler
    );
    Action.ClientFile.Graduate.notInterested(
      this.getTaskDetailsAndFileSummaryWithDelayHandler
    );
    Action.TaskList.Rescue.notInterested(this.getExecutiveTaskDetailsHandler);
    // Action.ClientFile.Cancel.notInterested(
    //   this.getTaskDetailsAndFileSummaryWithDelayHandler
    // );
  }

  getExecutiveTaskDetailsWithDelay() {
    setTimeout(this.getExecutiveTaskDetails, 1000);
  }

  // getTaskDetailsAndFileSummaryWithDelay() {
  //   setTimeout(() => {
  //     this.getExecutiveTaskDetails();
  //     this.findClientFileSummary();
  //     this.$router.push({ name: "Root.CFile.CFTask.CFActiveTasks" });
  //   }, 1000);
  // }

  getFindClientFileSummaryWithDelay() {
    setTimeout(this.findClientFileSummary, 1000);
  }

  getExecutiveTaskDetails() {
    Action.TaskList.GetExecutiveTaskDetails.execute1(
      this.$route.params.taskId,
      (output) => {
        this.loading = false;
      }
    );
  }

  pullAndStartTask() {
    Action.TaskList.PullStartAndMerge.execute1(
      this.$route.params.taskId,
      (output) => {
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
    this.$router.push({
      name: "Root.ClientFile.FileTask.FileTaskDetails",
      params: params,
      query: {
        ...this.$route.query,
      },
    });
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
