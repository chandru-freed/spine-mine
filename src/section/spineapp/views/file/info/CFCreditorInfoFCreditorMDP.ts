import FBtnMDP from "@/components/generic/FBtnMDP";
import FCreditorMDP from "@/components/generic/file/creditor/FCreditorMDP";

export default class CFCreditorInfoFCreditorMDP extends FCreditorMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName :"cfCreditorInfoRef",
      disabled: true,
    });

  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName];
  }
}
