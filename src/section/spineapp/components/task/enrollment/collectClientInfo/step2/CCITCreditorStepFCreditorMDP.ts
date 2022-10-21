import FCreditorMDP from "@/components/generic/file/creditor/FCreditorMDP";

export default class CCITCreditorStepFCreditorMDP extends FCreditorMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "creditorRef",
      dataSelectorKey: "taskOutput.creditorInfo",
      disabled: taskRoot.taskDisabled,
    });
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName];
  }
}
