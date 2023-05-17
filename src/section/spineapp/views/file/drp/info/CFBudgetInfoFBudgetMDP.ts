import FBudgetMDP from "@/components/generic/file/budget/FBudgetMDP";

export default class CFBudgetInfoFBudgetMDP extends FBudgetMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "cfBudgetInfoRef",
      disabled: true
    });
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName];
  }
}
