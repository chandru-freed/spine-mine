import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";

export default class AddSettlementPlanFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  root: any;
  // parent: any;
  constructor({ root }: { root: any }) {
    super({
      myRefName: "addSettlementPlanFFormMDPRef",
    });
    this.root = root;
    // this.parent = parent;

    this.addField(new FSelectFieldMDP({
      dataSelectorKey: "fiCreditorId",
      options:root.fiCreditorInfo.creditorList,
      label:"Creditor",
      parentMDP: this.childMDP,
      boundaryClass: "col-4",
      optionLabel:"creditorName",
      optionValue:"fiCreditorId",
      mandatory: true
    }))
    
    .addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "outstandingAmount",
        label: "Outstanding Amount",
        boundaryClass: "col-4",
        mandatory: true,
        disabled: true
      })
    )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "settlementAmount",
          label: "Settlement Amount",
          boundaryClass: "col-4",
          mandatory: true
        })
      )
      .addAction(
        new FBtnMDP({
          btnType: BtnType.TEXT,
          label: "Cancel",
          onClick: this.cancel(),
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Add Settlement",
          onClick: this.validateAndSubmit(),
        })
      );
  }

  cancel() {
    return () => {
      this.root.closeAndResetForms();
    }
  }
  getMyRef(): any {
    return this.root.$refs[this.myRefName];
  }

  validateAndSubmit() {
    return () => {
      this.getMyRef().submitForm(this.addSettlement());
    };
  }

  addSettlement() {
    return () => {
    this.root.addSettlement();
    };
  }
}
