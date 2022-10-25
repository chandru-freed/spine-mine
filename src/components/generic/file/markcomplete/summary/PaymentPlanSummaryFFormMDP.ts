import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FDateFieldMDP from "@/components/generic/form/field/FDateFieldMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";

export default class PaymentPlanSummaryFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  constructor() {
    super({
      myRefName: "paymentPlanSummaryFForm",
    });

    this.addField(
      new FTextFieldMDP({
        dataSelectorKey: "paymentPlan.ppCalculator.tenor",
        label: "Tenure",
        parentMDP: this.childMDP,
        readonly: true,
        boundaryClass: "col-4",
      })
    )
      .addField(
        new FSelectDateFieldMDP({
          dataSelectorKey: "paymentPlan.ppCalculator.firstDraftDate",
          label: "First Draft Date",
          parentMDP: this.childMDP,
          readonly: true,
          boundaryClass: "col-4",
          pastDaysDisabled: true,
        })
      )
      .addField(
        new FSelectDateFieldMDP({
          dataSelectorKey: "paymentPlan.ppCalculator.feeFirstDraftDate",
          label: "Fee First Draft Date",
          parentMDP: this.childMDP,
          readonly: true,
          boundaryClass: "col-4",
        })
      );
  }
}
