
import FProfileFFormMDP from "@/components/generic/file/FProfileFFormMDP";

export default class DCPCFPersonalInfoFProfileFFormMDP extends FProfileFFormMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "dcpCFPersonalInfoFProfileRef",
      disabled: true,
      readonly: true
    });

  }


  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName];
  }
}
