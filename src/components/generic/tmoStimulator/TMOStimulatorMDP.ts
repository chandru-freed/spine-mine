import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";
import FCurrencyFieldMDP from "../form/field/FCurrencyFieldMDP";
import FSelectDateFieldMDP from "../form/field/FDateSelectFieldMDP";
import FNumberFieldMDP from "../form/field/FNumberFieldMDP";
import FRangeSliderMDP from "../form/field/FRangeSliderMDP";

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
        label: this.taskRoot.isPaymentPlanDataAvailable()?"Recacluate Payment Plan":"Calculate Payment Plan",
        onClick: this.calculateOrDraftPaymentSchedule(),
        disabled: this.taskRoot.isRecalculationNotAllowed()
      })
    );
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }

  getTMOStimulatorFFormRef() {
    return this.taskRoot.$refs['tmoStimulatorFFormRef']
  }
  calculateOrDraftPaymentSchedule() {
    
    return () => {
      this.getTMOStimulatorFFormRef().submitForm(() => {
        this.taskRoot.scheduleorDraftPaymentPlan();
      });
    };
  }
}
