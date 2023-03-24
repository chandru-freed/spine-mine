import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FDateFieldMDP from "@/components/generic/form/field/FDateFieldMDP";
import FFileFieldMDP from "@/components/generic/form/field/FFileFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import * as Action from "@/../src-gen/action";
import FSnackbar from "@/fsnackbar";
import FRemoteComboBoxFieldMDP from "@/components/generic/form/field/FRemoteComboBoxFieldMDP";

export default class AddCreditorToMasterFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  parent: any;
  constructor({ parent }: { parent: any }) {
    super({
      myRefName: "addCreditorToMasterFFormRef",
    });
    this.parent = parent;
    this.addField(
      new FRemoteComboBoxFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "creditorName",
        label: "Creditor",
        mandatory: true,
        boundaryClass: "col-12",
        queryUrl: "/spineapi/master/search-creditor?creditorName=",
      })
    )
      .addAction(
        new FBtnMDP({
          label: "Cancel",
          btnType: BtnType.TEXT,
          onClick: () => {
            this.closeForm();
          },
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Add Creditor",
          onClick: this.addCreditorToMaster(),
        })
      );
  }

  getMyRef() {
    console.log()
    return this.parent.$refs[this.myRefName];
  }

  addCreditorToMaster() {
    return () => {
      this.getMyRef().submitForm(() => {
        Action.Spine.AddCreditorToMaster.execute(
          this.parent.addCreditorToMasterInput,
          (output) => {
            this.parent.resetForm();
            this.getMyRef().reset();
            FSnackbar.success("Succesfully added");
          }
        );
      });
    };
  }
  closeForm() {
    this.parent.gotoActionList();
  }
}
