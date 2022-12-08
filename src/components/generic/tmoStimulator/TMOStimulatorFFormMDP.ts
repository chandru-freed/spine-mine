import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";
import FCurrencyFieldMDP from "../form/field/FCurrencyFieldMDP";
import FSelectDateFieldMDP from "../form/field/FDateSelectFieldMDP";
import FNumberFieldMDP from "../form/field/FNumberFieldMDP";
import FRangeSliderMDP from "../form/field/FRangeSliderMDP";

export default class TMOStimulatorFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "tmoStimulatorFFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;

    this.addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "outstanding",
        label: "Outstanding Amount",
        mandatory: true,
        boundaryClass: "col-3",
        disabled: this.disabled,
      })
    )
      .addField(
        new FNumberFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "settlementPercentage",
          label: "Settlement Percentage",
          boundaryClass: "col-3",
          disabled: this.disabled,
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "affordability",
          label: "Affordability",
          boundaryClass: "col-3",
          disabled: this.disabled,
        })
      )
      .addField(
        new FSelectDateFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "firstSPADraftDate",
          label: "First SPA Draft Date",
          mandatory: true,
          boundaryClass: "col-3",
          pastDaysDisabled: true,
        })
      )
      .addField(
        new FRangeSliderMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "tenure",
          mandatory: true,
          boundaryClass: "col-12",
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Calculate Payment Schedule",
          onClick: this.calculatePaymentSchedule(),
        })
      );
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }
  calculatePaymentSchedule() {
    return () => {
      this.taskRoot.schedulePaymentPlan();
    };
  }
}
