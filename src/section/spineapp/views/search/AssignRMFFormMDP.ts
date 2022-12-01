import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";

export default class CFAssignRMFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  constructor({ taskRoot }: { taskRoot: any; }) {
    super({
      myRefName: "cfAssignRMFFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;

    this.addField(
      new FGompaUserRemoteAutoCompleteFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "assignedRM",
        label: "Select RM",
      })
    ).addAction(
      new FBtnMDP({
        label: "Cancel",
        onClick: this.cancel(),
        btnType: BtnType.TEXT,
      })
    ).addAction(
      new FBtnMDP({
        label: "Assign RM",
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

  cancel() {
    return () => {
      this.taskRoot.cancel();
    }
  }


}
