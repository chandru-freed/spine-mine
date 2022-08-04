import FFormMDP from "@/components/form/FFormMDP";
import { FFormChildMDP } from "@/components/form/FFormMDP";
import FTextFieldMDP from "@/components/form/field/FTextFieldMDP";
import { CollectClientInfoTaskIntf } from "../CollectClientInfoTaskIntf";
import CollectClientInfoTaskStep3MDP from "./CollectClientInfoTaskStep3MDP";

export default class CollectClientInfoTaskStep3ProfileFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP({});

  root: CollectClientInfoTaskIntf;
  parent: CollectClientInfoTaskStep3MDP;

  constructor(
    root: CollectClientInfoTaskIntf,
    parent: CollectClientInfoTaskStep3MDP
  ) {
    super({
      id: "profileForm",
      myRef: "profileFormFormRef",
      dataSelectorKey: "clientInfo",
      disabled: true,
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
    );
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRef];
  }
}
