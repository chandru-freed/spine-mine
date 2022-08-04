import FBtnMDP from "@/components/FBtnMDP";
import FFormMDP from "@/components/form/FFormMDP";
import { FFormChildMDP } from "@/components/form/FFormMDP";
import FTextFieldMDP from "@/components/form/field/FTextFieldMDP";
import {CollectClientInfoTaskIntf} from "../CollectClientInfoTaskIntf";
import CollectClientInfoTaskFStepperMDP from "../CollectClientInfoTaskFStepperMDP";
import FMobileFieldMDP from "@/components/form/field/FMobileFieldMDP";
import FEmailFieldMDP from "@/components/form/field/FEmailFieldMDP";
import FSelectMDP from "@/components/form/field/FSelectMDP";

export default class CollectClientInfoTaskStep1MDP extends FFormMDP {
  childMDP = new FFormChildMDP({});

  root: CollectClientInfoTaskIntf;
  parent: CollectClientInfoTaskFStepperMDP

  constructor(
    root: CollectClientInfoTaskIntf,
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
        label: "Full Name",
        mandatory: true,
        rules: "max:20",
        colWidth: 12,
      })
    ).addField(
      new FMobileFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "mobile",
        label: "Mobile",
        placeholder: "Mobile Number",
        mandatory: true,
        colWidth: 6,
      })
    ).addField(
      new FEmailFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "email",
        label: "Email",
        mandatory: true,
        rules:"max:20",
        colWidth: 6,
      })
    ).addField(
      new FSelectMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "gender",
        label: "Gender",
        mandatory: true,
        rules:"max:20",
        colWidth: 6,
        options: ["Male", "Female", "Others"]
      })
    )
    .addAction(
      new FBtnMDP({
        id: "saveBtn",
        label: "Save Client Info",
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
