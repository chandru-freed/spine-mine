import FFormMDP from "@/components/form/FFormMDP";
import { FFormChildMDP } from "@/components/form/FFormMDP";
import FTextFieldMDP from "@/components/form/field/FTextFieldMDP";
import CollectClientInfoTaskInf from "./CollectClientInfoTaskInf";

export default class CollectClientInfoTaskCreditorMDP extends FFormMDP {
  childMDP = new FFormChildMDP({});

  constructor(root: CollectClientInfoTaskInf) {
    super({
      id: "creditor",
      myRef: "creditorRef",
      dataSelectorKey: "creditorList",
      disabled: root.formDisabled,
    });

    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "name",
        label: "Name",
        mandatory: true,
        rules: "max:20",
        colWidth: 6,
      })
    );
  }
}
