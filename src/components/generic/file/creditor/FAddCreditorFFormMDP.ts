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
      new FRemoteComboBoxFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "creditorName",
        label: "Creditor",
        mandatory: true,
        boundaryClass: "col-4",
        queryUrl: "/spineapi/master/search-creditor?creditorName=",
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
        new FAccountFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "accountNumber",
          label: "Account Number",
          mandatory: true,
          boundaryClass: "col-4",
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
    return this.parent.getMyRef()[0].$refs[this.myRefName];
  }

  submitAddCreditor() {
    return () => {
      this.getMyRef().submitForm(() => {
        this.addCreditor();
      });
    };
  }

  closeAddForm() {
    this.parent.getMyRef()[0].closeAndClearAllForms();
  }

  addCreditor() {
    const input = Data.Spine.AddCreditorInput.fromJson(
      this.parent.getMyRef()[0].addCreditorForm
    );
    input.clientFileId = (
      this.taskRoot as any
    ).clientFileBasicInfo.clientFileId;
    input.taskId = this.taskRoot.taskId;
    Action.Spine.AddCreditor.execute(input, (output) => {
      this.parent.getMyRef()[0].closeAndClearAllForms();
      Snackbar.show({
        text: "Succesfully saved",
        pos: "bottom-center",
      });
    });
  }
}
