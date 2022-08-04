import FBtnMDP from "@/components/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/form/FFormMDP";
import FTextFieldMDP from "@/components/form/field/FTextFieldMDP";
import { CollectClientInfoTaskIntf } from "../CollectClientInfoTaskIntf";
import CollectClientInfoTaskStep2MDP from "./CollectClientInfoTaskStep2MDP";

export class CollectClientInfoTaskStep2AddFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP({});

  root: CollectClientInfoTaskIntf;
  parent: CollectClientInfoTaskStep2MDP;

  constructor(
    root: CollectClientInfoTaskIntf,
    parent: CollectClientInfoTaskStep2MDP
  ) {
    super({
      id: "addCreditorForm",
      myRef: "addCreditorFormRef",
      disabled: root.formDisabled,
    });
    this.root = root;
    this.parent = parent;

    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "creditor",
        label: "Creditor",
        mandatory: true,
        rules: "max:20",
        colWidth: 6,
      })
    )
      .addAction(
        new FBtnMDP({
          id: "cancelAddForm",
          label: "Cancel",
          outlined: true,
          onClick: this.cancelAddForm,
        })
      )
      .addAction(
        new FBtnMDP({
          id: "saveBtn",
          label: "Save",
          onClick: this.validateAndSave,
        })
      );
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRef];
  }

  cancelAddForm = () => {
    this.parent.getMyRef().closeAndClearAllForm();
  };

  validateAndSave = () => {
    this.getMyRef().onSubmit((form: any) => {
      this.parent.getMyRef().addCreditor();
    });
  };
}
