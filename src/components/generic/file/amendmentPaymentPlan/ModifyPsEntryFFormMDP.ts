import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FDateFieldMDP from "@/components/generic/form/field/FDateFieldMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FSelectDateFieldMDP from "../../form/field/FDateSelectFieldMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";
import FCurrencyFieldMDP from "../../form/field/FCurrencyFieldMDP";
import FEMandateSelectFieldMDP from "../../form/field/FEMandateSelectFieldMDP";

export default class AddPsEntryFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  parent: any;
  constructor({
    parent,
  }: {
    parent: any;
  }) {
    // console.log(taskRoot.taskFormData.taskOutput.paymentPlan, "Payment  plan");
    super({
      myRefName: "addPsEntryFFormRef",
    });
    this.parent = parent;

    this.addField(new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "spaAmount",
        label: "Spa Amount",
        boundaryClass: "col-6",
        mandatory: true
    })).addField(new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "feeAmount",
        boundaryClass: "col-6",
        label: "Fee Amount"
    })).addAction(
      new FBtnMDP({
        label: "Cancel",
        onClick: this.cancel(),
      })
    ).addAction(
      new FBtnMDP({
        label: "Add Entry",
        onClick: this.validateAndModifyEntry(),
      })
    );
  }

  getMyRef() {
    console.log(this.parent.$refs);
    return this.parent.$refs[this.myRefName];
  }

  validateAndModifyEntry() {
    return () => {
      this.getMyRef().submitForm(() => {
        this.modifyEntry();
      });
    };
  }
  modifyEntry() {
    Action.ClientFile.ModifyAmountPSEntryList.execute(this.parent.modifyAmountPSEListInput, output => {
      this.parent.resetFormsTableAndData();
      Snackbar.show({
        text: "Succesfully added an entry",
        pos: "bottom-center",
      });
    });
  }

  cancel() {
    return () => {
      this.parent.resetFormsTableAndData();
    }
    
  }
}
