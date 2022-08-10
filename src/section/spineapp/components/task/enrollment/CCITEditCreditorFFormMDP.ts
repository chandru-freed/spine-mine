import FFormMDP, { FFormChildMDP } from "@/components/generic/FFormMDP";
import FTextFieldMDP from "@/components/generic/FTextFieldMDP";
import MDP from "@/components/generic/MDP";

export default class CCITEditCreditorFFormMDP extends FFormMDP {
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
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "creditorName",
        label: "Creditor",
        mandatory: true
      })
    );
  }

}
