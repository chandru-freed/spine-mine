import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FDateFieldMDP from "@/components/generic/form/field/FDateFieldMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";

export default class FAddCreditorFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      myRefName: "addCreditorFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "creditor",
        label: "Creditor",
        mandatory: true,
        boundaryClass: "col-4"
      })
    ).addField(
      new FNumberFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "creditorBalance",
        label: "Creditor Balance",
        mandatory: true,
        boundaryClass: "col-4",
        type:'number'
      }))
      .addField(
        new FDateFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "lastDateOfPayment",
          label: "Last Date of Payment",
          mandatory: true,
          boundaryClass: "col-4"
        }))

      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "debtType",
          label: "Type of Debt",
          mandatory: true,
          boundaryClass: "col-4",
          options:["Credit Card", "Personal Loans", "Secured", "Others (Unsecured)"]
        }))

      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "accountNumber",
          label: "Account Number",
          mandatory: true,
          boundaryClass: "col-4",
          type:'number'
        }))

      .addAction(new FBtnMDP({
        label: "Cancel",
        btnType: BtnType.TEXT,
        onClick: () => { this.closeAddForm() }
      })).addAction(new FBtnMDP({
        label: "Add Creditor",
        onClick: this.submitAddCreditor()
      }));
  }

  getMyRef() {
    return this.parent.getMyRef()[0].$refs[this.myRefName]
  }

  submitAddCreditor() {
    return () => {
      this.getMyRef().submitForm(() => {
        this.parent.getMyRef()[0].addCreditorData();
      });
    }
  }

  closeAddForm() {
    this.parent.getMyRef()[0].closeAndClearAllForms();
  }

}
