import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
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
      new FCurrencyFieldMDP({
        dataSelectorKey: "fiPaymentPlanInfoStore.ppCalculator.repaymentAmount",
        label: "Repayment Amount",
        parentMDP: this.childMDP,
        readonly: true,
        boundaryClass: "col-4",
      })
    )
      .addField(
        new FSelectDateFieldMDP({
          dataSelectorKey: "fiPaymentPlanInfoStore.ppCalculator.firstDraftDate",
          label: "SPA start date",
          parentMDP: this.childMDP,
          readonly: true,
          boundaryClass: "col-4",
          pastDaysDisabled: true,
        })
      )
      .addField(
        new FTextFieldMDP({
          dataSelectorKey: "fiPaymentPlanInfoStore.ppCalculator.tenor",
          label: "Tenure",
          parentMDP: this.childMDP,
          readonly: true,
          boundaryClass: "col-4",
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          dataSelectorKey: "fiPaymentPlanInfoStore.ppCalculator.totalMonthlyObligation",
          label: "SPA monthly obligation",
          parentMDP: this.childMDP,
          readonly: true,
          boundaryClass: "col-4",
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          dataSelectorKey: "fiPaymentPlanInfoStore.ppCalculator.msfDraftAmount",
          label: "MSF amount",
          parentMDP: this.childMDP,
          readonly: true,
          boundaryClass: "col-4",
        })
      )
      
      ;
  }
}
