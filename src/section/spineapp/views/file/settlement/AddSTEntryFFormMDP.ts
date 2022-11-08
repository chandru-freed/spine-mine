import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";

export default class AddSTEntryFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "addSTEntryRef",
      disabled: taskRoot.disabled,
    });
    this.taskRoot = taskRoot;

    this.addField(
      new FSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "paymentProvider",
        label: "Payment Provider",
        boundaryClass: "col-3",
        returnObject: true,
        options: [
          { id: "NUPAY", name: "NUPAY" },
          { id: "ESCROWPAY", name: "ESCROWPAY" },
          { id: "CASHFREE", name: "CASHFREE" },
        ],
        optionLabel: "name",
        optionValue: "id",
      })
    )
      .addField(
        new FSelectDateFieldMDP({
          dataSelectorKey: "draftDate",
          label: "Draft Date",
          parentMDP: this.childMDP,
          boundaryClass: "col-3",
          pastDaysDisabled: true,
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "spaAmount",
          label: "SPA Amount",
          boundaryClass: "col-3",
          mandatory: true,
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "feeAmount",
          label: "Fee Amount",
          boundaryClass: "col-3",
          mandatory: true,
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Cancel",
          btnType: BtnType.TEXT,
          onClick:this.closeAddForm(),
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Add Settlement",
          onClick: this.validateAndSubmit(),
        })
      );
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }

  // new implement
  validateAndSubmit() {
    return () => {
      this.getMyRef().submitForm(() => {
        this.taskRoot.addSPAEntryForm();
      });
    };
  }

  closeAddForm() {
    return () => {
      this.taskRoot.closeDialogs();
    };
  }
}
