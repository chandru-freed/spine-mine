import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";

export default class CFSettlementPlanInfoFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  root: any;
  constructor({ root }: { root: any }) {
    super({
      myRefName: "cfSettlementPlanInfoRef",
      disabled: true,
    });
    this.root = root;

    this.addField(new FSelectFieldMDP({
      dataSelectorKey: "fiCreditor.fiCreditorId",
      options: root.fiCreditorInfo?.creditorList,
      label: "Creditor",
      parentMDP: this.childMDP,
      boundaryClass: "col-4",
      optionLabel: "creditorName",
      optionValue: "fiCreditorId",
      
    }))
    .addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "totalOutstanding",
        label: "Outstanding Amount",
        boundaryClass: "col-4",
        mandatory: true,
        disabled: true,
      })
    )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "settlementAmount",
          label: "Settlement Amount",
          boundaryClass: "col-4",
          mandatory: true,
        })
      ).addField(
        new FNumberFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "settlementPercentage",
          label: "Settlement Percentage",
          boundaryClass: "col-4",
          mandatory: true,
        })
      );
  }

  validateAndSubmit() {
    return () => {
      this.getMyRef().submitForm(this.recordSettledPayment());
    };
  }

  getMyRef(): any {
    return this.root.$refs[this.myRefName];
  }
  recordSettledPayment() {
    return () => {
      this.root.recordSettledPayment();
    };
  }

  gotoClientFile() {
    return () => {
      this.root.gotoClientFile();
    };
  }
}
