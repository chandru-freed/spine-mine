import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FAccountFieldMDP from "@/components/generic/form/field/FAccountFieldMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import * as Data from "@/../src-gen/data";
import FEMandateSelectFieldMDP from "@/components/generic/form/field/FEMandateSelectFieldMDP";

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
        dataSelectorKey: "settledTo",
        label: "Settled To",
        boundaryClass: "col-3",
        options: Data.ClientFile.SETTLED_TO.list(),
        optionLabel: "name",
        optionValue: "id",
        mandatory: true
      })
    ).addField(
      new FSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "paymentProvider",
        label: "Payment Provider",
        boundaryClass: "col-3",
        options: Data.ClientFile.PAYMENT_PROVIDER.list(),
        optionLabel: "name",
        optionValue: "id",
        mandatory: true
      })
    ).addField(
      new FSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "paymentMode",
        label: "Payment Mode",
        boundaryClass: "col-3",
        options: Data.ClientFile.PAYMENT_MODE.list(),
        optionLabel: "name",
        optionValue: "id",
        mandatory: true
      })
    )

      .addField(
        new FSelectDateFieldMDP({
          dataSelectorKey: "draftDate",
          label: "Draft Date",
          parentMDP: this.childMDP,
          boundaryClass: "col-3",
          pastDaysDisabled: true,
          mandatory: true
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
      .addField(
        new FAccountFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "accountNumber",
          label: "Account Number",
          boundaryClass: "col-3",
          rules: "min:9|max:20",
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "accountHolderName",
          label: "Account Holder Name",
          boundaryClass: "col-3",
        })
      )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "accountType",
          label: "Account Type",
          boundaryClass: "col-3",
          options: Data.ClientFile.ACCOUNT_TYPE.list(),
          optionLabel: "name",
          optionValue: "id",
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "ifscCode",
          label: "IFSC Code",
          boundaryClass: "col-3",
        })
      ).addField(
        new FEMandateSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "eMandateId",
          label: "E Mandate",
          boundaryClass: "col-3",
          mandatory: true,
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Cancel",
          btnType: BtnType.TEXT,
          onClick: this.closeAddForm(),
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Add Settlement Entry",
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
