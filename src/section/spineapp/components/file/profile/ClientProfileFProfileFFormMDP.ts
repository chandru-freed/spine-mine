
import FProfileFFormMDP from "@/components/generic/file/FProfileFFormMDP";

export default class ClientProfileFProfileFFormMDP extends FProfileFFormMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "clientProfileFFormRef",
      disabled: true,
    });

  }


  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName];
  }
}
