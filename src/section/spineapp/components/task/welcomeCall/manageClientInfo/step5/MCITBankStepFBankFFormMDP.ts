import FBtnMDP from "@/components/generic/FBtnMDP";
import FBankFFormMDP from "@/components/generic/file/FBankFFormMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";

export default class MCITBankStepFBankFFormMDP extends FBankFFormMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "welcomeCallBankInfoForm",
      dataSelectorKey: "taskOutput.bankInfo",
      disabled: taskRoot.taskDisabled,
    });

    this.addAction(
      new FBtnMDP({
        label: "Save",
        onClick: this.saveTask(),
      })
    );
  }

  saveTask() {
    return () => {
      this.updateBankInfo();
    };
  }

  updateBankInfo() {
    const input = Data.Spine.UpdateBankInfoInput.fromJson(this.taskRoot.taskFormData.taskOutput.bankInfo)
    input.clientFileId = (this.taskRoot as any).clientFileBasicInfo.clientFileId;
    Action.Spine.UpdateBankInfo.execute(input, (output: any) => {
      this.taskRoot.saveTask();
    });
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName];
  }
}
