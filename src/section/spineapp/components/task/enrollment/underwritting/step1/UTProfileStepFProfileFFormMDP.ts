import FProfileFFormMDP from "@/components/generic/file/FProfileFFormMDP";

export default class UTProfileStepFProfileFFormMDP extends FProfileFFormMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "underwrittingProfileClientInfoFormRef",
      dataSelectorKey: "taskInput.personalInfo",
      disabled: true,
    });
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }
}
