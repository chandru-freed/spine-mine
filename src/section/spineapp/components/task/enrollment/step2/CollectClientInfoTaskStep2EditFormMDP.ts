import FBtnMDP from "@/components/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/form/FFormMDP";
import FTextFieldMDP from "@/components/form/field/FTextFieldMDP";
import { CollectClientInfoTaskIntf } from "../CollectClientInfoTaskIntf";
import CollectClientInfoTaskStep2MDP from "./CollectClientInfoTaskStep2MDP";

export class CollectClientInfoTaskStep2EditFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP({});

  root: CollectClientInfoTaskIntf;
  parent: CollectClientInfoTaskStep2MDP;

  constructor(
    root: CollectClientInfoTaskIntf,
    parent: CollectClientInfoTaskStep2MDP
  ) {
    super({
      id: "editCreditorForm",
      myRef: "editCreditorFormRef",
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
          id: "cancelEditForm",
          label: "Cancel",
          outlined: true,
          onClick: this.cancelEditForm,
        })
      )
      .addAction(
        new FBtnMDP({
          id: "updateBtn",
          label: "Update",
          onClick: this.validateAndSave,
        })
      );
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRef];
  }

  cancelEditForm = () => {
    this.parent.getMyRef().closeAndClearAllForm();
  };

  validateAndSave = () => {
    this.getMyRef().onSubmit((form: any) => {
      this.parent.getMyRef().editCreditor();
    });
  };
}
