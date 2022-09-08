import FBtnMDP from "@/components/generic/FBtnMDP";
import FBankFFormMDP from "@/components/generic/file/FBankFFormMDP";

export default class ClientBankInfoFBankFFormMDP extends FBankFFormMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "clientBankInfoFormRef",
      disabled: true
    });
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName];
  }
}
