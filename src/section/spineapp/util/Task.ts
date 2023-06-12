import TaskAction from "./TaskAction";
import * as ApiAction from "@/../src-gen/action";
export default class Task {
  static Action = TaskAction;
  static isTaskActionable(taskState: string) {
    // taskState === "EXCEPTION_Q"
    // taskState === "EXCEPTION_Q" | taskState === "PARTIALLY_COMPLETED" || taskType !== "deferred"
    return (
      taskState === "STARTED" ||
      taskState === "PARTIALLY_COMPLETED" ||
      taskState === "EXCEPTION_Q" ||
      taskState === "EXIT_Q"
      //TODO : also check for allowed taskType (Manual / Self) - deferred is not allowed
    );
  }

  static isTaskNotActionable(taskState: string, isSuspended: boolean) {
    if (isSuspended) {
      return isSuspended;
    }
    return !this.isTaskActionable(taskState);
  }

  static isTaskOutputNotAvailable(taskOutput: any = {}) {
    return Object.keys(taskOutput).length === 0;
  }

  static isTaskOutputAvailable(taskOutput: any = {}) {
    return !this.isTaskOutputNotAvailable(taskOutput);
  }

  static mergeTaskOutputAndReturn(taskInput: any = {}, taskOutput: any = {}) {
    if (this.isTaskOutputNotAvailable(taskOutput)) {
      return {
        ...taskInput,
      };
    } else {
      return taskOutput;
    }
  }

  static isMarkCompleteEnabled(taskDetails: any) {
    if (taskDetails.isSuspended) {
      return false;
    }

    return (
      taskDetails.taskState === "STARTED" ||
      taskDetails.taskState === "PARTIALLY_COMPLETED"
    );
  }

  // getExecutiveTaskDetails(taskId: string) {
  //   ApiAction.TaskList.GetExecutiveTaskDetails.execute1(
  //     taskId,
  //     (output) => {
  //       this.loading = false;
  //     }
  //   );
  // }

  static TASK_COMPONENT_MAP = new Map([
    ["Enrollment::EnrollClientFile", "EnrollClientFileTask"],
    ["Enrollment::ClientInfoVerification", "ClientInfoVerificationTask"],
    ["Enrollment::SignServiceAgreement", "SignServiceAgreementTask"],
    [
      "Enrollment::SignServiceAgreementFailed",
      "SignServiceAgreementFailedTask",
    ],
    ["Enrollment::EMandate", "EMandateTask"],
    ["Enrollment::EMandateFailed", "EMandateFailedTask"],
    ["Underwriting::ManualUnderwriting", "UnderwrittingTask"],
    ["Enrollment::CollectMSF", "CollectMSFThroughCashfreeTask"],
    ["Enrollment::CollectMSFThroughCashfree", "CollectMSFThroughCashfreeTask"],
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
    [
      "NsfMSF::CollectNSFMSFThroughCashfree",
      "CollectNSFMSFThroughCashfreeTask",
    ],
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
    ["WelcomeCall::OnBoardingCall", "ManageClientInfoTask"],
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
    // ["Amendment::PrepareAmendment", "PrepareAmendmentTask"],
    ["RefundFee::RefundFee", "RefundFeeTask"],
    ["RefundSPA::UpdateRefundSPAPaymentStatus", "UpdateRefundSPAPaymentStatusTaskTask"],
    ["CollectMSF::CollectMSFThroughCashfree", "CollectMSFThroughCashfreeTask"],
    // ["Amendment::ApproveAmendment", "ApproveAmendmentTask"],
    ["Amendment::SignedByClient", "SignedByClientTask"],
    ["Amendment::FollowUpAmendmentEMandate", "FollowUpAmendmentEMandateTask"],
    ["Amendment::PrepareAmendmentV4", "PrepareAmendmentV4Task"],
    ["Amendment::ApproveAmendmentV4", "ApproveAmendmentV4Task"],
    ["Amendment::SignedByClientV4", "SignedByClientV4Task"],
    ["Amendment::FollowUpAmendmentEMandateV4", "FollowUpAmendmentEMandateV4Task"],
    ["Retain::RetainCancelledFile", "RetainCancelledFileTask"],
    ["RetainPendingCancelled::RetainPendingCancelledFile", "RetainPendingCancelledFileTask"],
    ["Cancellation::CancellationChecklist", "CancellationChecklistTask"],
  ]);

  static taskList() {
    const flowTaskList = Object.keys(Object.fromEntries(Task.TASK_COMPONENT_MAP));
    return flowTaskList.map((flowTask: string) => 
    {
      return flowTask.split("::")[1];
    }
    )
  }
}
