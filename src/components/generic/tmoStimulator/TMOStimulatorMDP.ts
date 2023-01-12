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
    ).addAction(
      new FBtnMDP({
        label: this.taskRoot.isPaymentPlanDataAvailable() ? "Recacluate Payment Plan" : "Calculate Payment Plan",
        onClick: this.calculateOrDraftPaymentSchedule(),
        condition: this.taskRoot.editMode
      })
    ).addAction(
      new FBtnMDP({
        label: "Edit",
        onClick: this.editClicked(),
        condition: !this.taskRoot.editMode
      })
    );
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
    return () => {
      this.taskRoot.scheduleorDraftPaymentPlan();
    };
  }
}