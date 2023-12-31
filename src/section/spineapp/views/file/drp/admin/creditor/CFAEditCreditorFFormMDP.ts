import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import MDP from "@/components/generic/MDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";
import FRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FRemoteAutoCompleteFieldMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FCreditCardFieldMDP from "@/components/generic/form/field/FCreditCardFieldMDP";

export default class CFAEditCreditorFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      myRefName: "editCreditorFormRef",
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
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "emiAmount",
          label: "EMI Amount",
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
          rules: "min:4|max:20",
        })
      ).addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "details",
          label: "Details",
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Cancel",
          btnType: BtnType.TEXT,
          onClick: () => {
            this.closeEditForm();
          },
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Update Creditor",
          onClick: this.submitEditCreditor(),
        })
      );
  }

  getMyRef(): any {
    return this.parent.$refs[this.myRefName];
  }

  submitEditCreditor() {
    return () => {
      this.getMyRef().submitForm(() => {
        // this.parent.getMyRef()[0].editCreditorData();
        this.updateCreditor();
      });
    };
  }

  closeEditForm() {
    this.parent.closeAndClearAllForms();
  }

  updateCreditor() {
    const input = Data.ClientFile.UpdateFiCreditorInput.fromJson(
      this.parent.editCreditorForm
    );
    input.clientFileId = (
      this.taskRoot as any
    ).clientFileBasicInfo.clientFileId;
    // input.taskId = this.taskRoot.taskId;
    Action.ClientFile.UpdateFiCreditor.execute(input, (output) => {
      this.parent.closeAndClearAllForms();
      Snackbar.show({
        text: "Succesfully Updated",
        pos: "bottom-center",
      });
    });
  }
}
