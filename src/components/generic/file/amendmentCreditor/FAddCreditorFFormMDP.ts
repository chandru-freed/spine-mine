import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FDateFieldMDP from "@/components/generic/form/field/FDateFieldMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FSelectDateFieldMDP from "../../form/field/FDateSelectFieldMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import FRemoteComboBoxFieldMDP from "../../form/field/FRemoteComboBoxFieldMDP";
import FAccountFieldMDP from "../../form/field/FAccountFieldMDP";
import * as Snackbar from "node-snackbar";
import FCurrencyFieldMDP from "../../form/field/FCurrencyFieldMDP";
import FCreditCardFieldMDP from "../../form/field/FCreditCardFieldMDP";
import FRemoteAutoCompleteFieldMDP from "../../form/field/FRemoteAutoCompleteFieldMDP";

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
      new FRemoteAutoCompleteFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "creditorName",
        label: "Creditor",
        mandatory: true,
        boundaryClass: "col-4",
        queryUrl: "/spineapi/master/search-creditor?creditorName=",
        itemText:""
      })
    )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "creditorBalance",
          label: "Creditor Balance",
          mandatory: true,
          boundaryClass: "col-4",
        })
      )
      .addField(
        new FSelectDateFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "lastDateOfPayment",
          label: "Last Date of Payment",
          mandatory: true,
          boundaryClass: "col-4",
          futureDaysDisabled: true,
        })
      )

      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "debtType",
          label: "Type of Debt",
          mandatory: true,
          boundaryClass: "col-4",
          options: [
            "Credit Card",
            "Personal Loans",
            "Secured",
            "Others (Unsecured)",
          ],
        })
      )

      .addField(
        new FCreditCardFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "accountNumber",
          label: "Credit Card Number",
          mandatory: true,
          boundaryClass: "col-4",
          condition: this.parent.isCreditCard()
        })
      )

      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "accountNumber",
          label: "Account Number",
          mandatory: true,
          boundaryClass: "col-4",
          condition: !this.parent.isCreditCard(),
          // rules: "min:9|max:20",
          rules: "min:4|max:20",
        })
      )

      .addAction(
        new FBtnMDP({
          label: "Cancel",
          btnType: BtnType.TEXT,
          onClick: () => {
            this.closeAddForm();
          },
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Add Creditor",
          onClick: this.submitAddCreditor(),
        })
      );
  }

  getMyRef() {
    return this.parent.$refs[this.myRefName];
  }

  submitAddCreditor() {
    return () => {
      this.getMyRef().submitForm(() => {
        this.addCreditor();
      });
    };
  }

  closeAddForm() {
    this.parent.closeAndClearAllForms();
  }

  addCreditor() {
    this.parent.addCreditor();
  }
}
