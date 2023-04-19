import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";

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
      // .addAction(
      //   new FBtnMDP({
      //     label: this.taskRoot.isPaymentPlanDataAvailable() ? "Recacluate Payment Plan" : "Calculate Payment Plan",
      //     onClick: this.calculateOrDraftPaymentSchedule(),
      //     condition: this.taskRoot.editMode,
      //     disabled: this.taskRoot.isRecalculationNotAllowed()
      //   })
      // )
      .addAction(
        new FBtnMDP({
          label: "Recacluate Payment Plan",
          onClick: this.recalculateWithTenureChange(true),
          condition: this.taskRoot.editMode,
          disabled: this.taskRoot.isRecalculationNotAllowed(),
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Edit",
          onClick: this.editClicked(),
          condition: !this.taskRoot.editMode,
          disabled: this.ppCodeStatus(),
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Fixed Tenure",
          onClick: this.fixedTenure(false),
          condition: !this.taskRoot.editMode,
          disabled: this.ppCodeStatus(),
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Fixed TMO",
          onClick: this.fixedTOM(),
          condition: !this.taskRoot.editMode,
          disabled: this.ppCodeStatus(),
        })
      );
  }

  ppCodeStatus() {
    return this.taskRoot.fileSummary.ppCode !== "PM";
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }

  fixedTenure(isTenure: boolean) {
    return () => {
      this.taskRoot.recalculateWithTenure(isTenure);
    };
  }

  fixedTOM() {
    return () => {
      this.taskRoot.recalculateWithTOM();
    };
  }

  editClicked() {
    return () => {
      this.taskRoot.handleEditClick();
    };
  }
  cancelClicked() {
    return () => {
      this.taskRoot.handleCancelEditClick();
    };
  }
  // calculateOrDraftPaymentSchedule() {
  //   return () => {
  //     this.getTMOSSimulatorFormRef().submitForm(() => {
  //       this.taskRoot.scheduleorDraftPaymentPlan();
  //     })
  //   };
  // }

  recalculateWithTenureChange(isTenure: boolean) {
    return () => {
      this.getTMOSSimulatorFormRef().submitForm(() => {
        this.taskRoot.recalculateWithTenure(isTenure);
      });
    };
  }

  getTMOSSimulatorFormRef() {
    return this.taskRoot.$refs["tmoStimulatorFFormRef"];
  }
}
