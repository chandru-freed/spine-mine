import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";

export default class CFSettlementPlanInfoFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "cfSettlementPlanInfoRef",
      disabled: true,
    });
    this.taskRoot = taskRoot;

    this.addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "outstandingAmount",
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
      );
  }

  validateAndSubmit() {
    return () => {
      this.getMyRef().submitForm(this.recordSettledPayment());
    };
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }
  recordSettledPayment() {
    return () => {
      this.taskRoot.recordSettledPayment();
    };
  }

  gotoClientFile() {
    return () => {
      this.taskRoot.gotoClientFile();
    };
  }
}
