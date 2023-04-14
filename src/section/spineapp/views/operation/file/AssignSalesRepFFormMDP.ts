import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";

export default class AssignSalesRepFFormMDP extends FFormMDP {
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
        dataSelectorKey: "assignedSalesRep",
        label: "Select Sales Rep",
      })
    ).addAction(
      new FBtnMDP({
        label: "Cancel",
        onClick: this.cancel(),
        btnType: BtnType.TEXT,
      })
    ).addAction(
      new FBtnMDP({
        label: "Assign Sales Rep",
        onClick: this.assignSalesRep(),
      })
    );
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }
  assignSalesRep() {
    return () => {
      this.taskRoot.assignSalesRep();
    };
  }

  cancel() {
    return () => {
      this.taskRoot.hideAssignRMFForm();
    }
  }


}
