import FBankFFormMDP from "@/components/generic/file/FBankFFormMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";

export default class CCITBankStepFBankFFormMDP extends FBankFFormMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "bankInfoForm",
      dataSelectorKey: "taskOutput.bankInfo",
      disabled: taskRoot.taskDisabled,
    });

    this.taskRoot.setConfirmAccountNumber();
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }

  // new implement
  validateAndSubmit() {
    return (successCallBack: any) => {
      this.getMyRef().submitForm(() => {
        this.saveTask(() => successCallBack());
      });
    };
  }

  saveTask(successCallBack: any) {
    this.updateBankInfo(() => successCallBack());
  }

  updateBankInfo(callback?: () => void) {
    const input = Data.Spine.UpdateBankInfoInput.fromJson(
      this.taskRoot.taskFormData.taskOutput.bankInfo
    );
    input.clientFileId = (
      this.taskRoot as any
    ).clientFileBasicInfo.clientFileId;
    input.taskId = this.taskRoot.taskId;
    Action.Spine.UpdateBankInfo.execute(input, (output: any) => {
      Snackbar.show({
        text: "Succesfully Saved",
        pos: "bottom-center",
      });
      if (callback) {
        callback();
      }
    });
  }
}
