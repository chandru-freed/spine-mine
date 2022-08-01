import FBtnMDP from "@/components/FBtnMDP";
import FFormMDP from "@/components/form/FFormMDP";
import { FFormChildMDP } from "@/components/form/FFormMDP";
import FTextFieldMDP from "@/components/form/field/FTextFieldMDP";
import CollectClientInfoTaskInf from "./CollectClientInfoTaskInf";
import CollectClientInfoTaskFStepperMDP from "./CollectClientInfoTaskFStepperMDP";

export default class CollectClientInfoTaskProfileMDP extends FFormMDP {
  childMDP = new FFormChildMDP({});

  root: CollectClientInfoTaskInf;
  parent: CollectClientInfoTaskFStepperMDP

  constructor(
    root: CollectClientInfoTaskInf,
    parent: CollectClientInfoTaskFStepperMDP
  ) {
    super({
      id: "clientInfo",
      myRef: "profileRef",
      dataSelectorKey: "clientInfo",
      disabled: root.formDisabled,
    });
    this.root = root;
    this.parent = parent;

    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "name",
        label: "Name",
        mandatory: true,
        rules: "max:20",
        colWidth: 6,
      })
    ).addOtherChild(
      new FBtnMDP({
        id: "saveBtn",
        label: "Save",
        outlined: true,
        onClick: this.validateAndSave,
      })
    );
  }

  clientInfoFormRef() {
    return this.parent.getMyRef().$refs[this.myRef][0];
  }

  validateAndSave = () => {
    const clientInfoFormRef = this.clientInfoFormRef();
    clientInfoFormRef.onSubmit((profileForm: any) => {
      this.root.saveTask();
    });
  };
}
