import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FSnackbar from "@/fsnackbar";
import * as Data from "@/../src-gen/data";

export default class TMOStimulatorMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "TMOStimulatorRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;

    this.addAction(
      new FBtnMDP({
        label: "Cancel",
        onClick: this.cancelClicked(),
        condition: this.taskRoot.editMode,
      })
    )
    .addAction(
      new FBtnMDP({
        label: this.taskRoot.isPaymentPlanDataAvailable() ? "Recacluate Payment Plan" : "Calculate Payment Plan",
        onClick: this.calculateOrDraftPaymentSchedule(),
        condition: this.taskRoot.editMode,
        disabled: this.taskRoot.isRecalculationNotAllowed()
      })
    )
    .addAction(
      new FBtnMDP({
        label: "Edit",
        onClick: this.editClicked(),
        condition: !this.taskRoot.editMode
      })
    )
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }
  
  


  editClicked() {
    return () => {
      this.taskRoot.handleEditClick();
    }
  }
  cancelClicked() {
    return () => {
      this.taskRoot.handleCancelEditClick();
    }
  }
  calculateOrDraftPaymentSchedule() {
    const confirmationMsg = 
    this.taskRoot.clientFileBasicInfo?.clientFileStatus === Data.ClientFile.CLIENT_FILE_STATUS.AGREEMENT_SIGNED.id?
    "Making changes to the details will result in the cancellation of the existing agreement. To continue with the changes, the client needs to resign the agreement.Do you want to continue?"
    :"Are you sure want to continue?"
    return () => {
      FSnackbar.confirm({
        message: confirmationMsg,
        onConfirm: () => {
          this.getTMOSSimulatorFormRef().submitForm(() => {
            this.taskRoot.scheduleorDraftPaymentPlan();
          })
        }
      })
      // this.taskRoot.scheduleorDraftPaymentPlan();
    };
  }

  getTMOSSimulatorFormRef() {
    return this.taskRoot.$refs['tmoStimulatorFFormRef'];
  }
}
