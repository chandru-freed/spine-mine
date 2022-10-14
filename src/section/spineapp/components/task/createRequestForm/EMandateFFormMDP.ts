import FBtnMDP from "@/components/generic/FBtnMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import AddressFMiniFormMDP from "@/components/generic/form/field/AddressFMiniFormMDP";
import FDateFieldMDP from "@/components/generic/form/field/FDateFieldMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FAccountFieldMDP from "@/components/generic/form/field/FAccountFieldMDP";
import FIFSCCodeFieldMDP from "@/components/generic/form/field/FIFSCCodeFieldMDP";

export default class EMandateFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      myRefName: "eMandateFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;



    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "eMandateBankInfo.accountHolderName",
        label: "Account Holder Name",
        mandatory: true,
        boundaryClass: "col-4",
      })
    ).addField(
      new FAccountFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "eMandateBankInfo.accountNumber",
        label: "Account Number",
        mandatory: true,
        boundaryClass: "col-4",
      })
    ).addField(
      new FSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "eMandateBankInfo.accountType",
        label: "Account Type",
        boundaryClass: "col-4",
        mandatory: true,
        options: [
          { id: "SAVINGS", name: "Savings" },
          { id: "CURRENT", name: "Current" },
        ],
        optionLabel: "name",
        optionValue: "id",
      })
    ).addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "collectionAmount",
        label: "Collection Amount",
        boundaryClass: "col-4",
        mandatory: true,
      })
    ).addField(
      new FSelectDateFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "firstCollectionDate",
        label: "First Collection Date",
        boundaryClass: "col-4",
        pastDaysDisabled: true,
        futureDaysDisabled: false,
      })
    ).addField(
      new FSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "eMandateBankInfo.nupayBankMasterId",
        label: "Bank Name",
        boundaryClass: "col-4",
        mandatory: true,
        options: this.taskRoot.nupayBankMasterList,
        optionLabel: "nupayBnkName",
        optionValue: "nupayBankMasterId",
      })
    ).addField(
      new FIFSCCodeFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "eMandateBankInfo.ifscCode",
        label: "IFSC Code",
        mandatory: true,
        boundaryClass: "col-4",
        onSelect: (details) => {
          this.populateBankDetails(details);
        },
        disabled: this.disabled
      })
    ).addField(
      new AddressFMiniFormMDP({
        taskRoot: this.taskRoot,
        parent: this,
        dataSelectorKey: "eMandateBankInfo.bankAddress",
        disabled: taskRoot.taskDisabled,
        label: "Bank Address",
      })
    ).addAction(
      new FBtnMDP({
        label: "CREATE REQUEST",
        onClick: this.validateAndSubmit(),
      })
    );
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }

  validateAndSubmit() {
    return () => {
      this.getMyRef().submitForm(this.createEMandate());
    };
  }

  createEMandate() {
    return () => {
      this.taskRoot.createEMandate();
    };
  }


  populateBankDetails(details: any) {
    this.taskRoot.populateBankDetails(details);
  }

}
