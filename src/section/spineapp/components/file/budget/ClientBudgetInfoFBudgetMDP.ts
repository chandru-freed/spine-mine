import FBudgetMDP from "@/components/generic/file/budget/FBudgetMDP";

export default class ClientBudgetInfoFBudgetMDP extends FBudgetMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "clientBudgetInfoFormRef",
      disabled: true
    });
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName];
  }
}
