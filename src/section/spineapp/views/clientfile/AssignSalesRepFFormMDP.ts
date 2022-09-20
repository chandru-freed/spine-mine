import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";

export default class AssignSalesRepFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  constructor({ taskRoot }: { taskRoot: any; }) {
    super({
      myRefName: "assignSalesRepFFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;

    this.addField(
      new FGompaUserRemoteAutoCompleteFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "assignSalesRep",
        label: "Select Sales Rep"
      })
    ).addAction(
      new FBtnMDP({
        label: "Assign Sales Rep",
        onClick: this.assignRM(),
      })
    );
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }
  assignRM() {
    return () => {
      this.taskRoot.assignRM();
    };
  }
}
