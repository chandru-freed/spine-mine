import FBudgetMDP from "@/components/generic/file/budget/FBudgetMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";

export default class DCPCFBudgetInfoFBudgetMDP extends FBudgetMDP {
  budgetFormRef = "dcpCFBudgetInfoRef";
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "budgetRef",
      // dataSelectorKey: "taskOutput",
      disabled: taskRoot.taskDisabled,
    });
  }

  getMyRef() {
    return this.parent.getMyRef()?.$refs[this.myRefName][0];
  }

}

