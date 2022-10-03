import FBtnMDP from "@/components/generic/FBtnMDP";
import FBankFFormMDP from "@/components/generic/file/FBankFFormMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";

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
        label: "Previous",
        onClick: this.goToPrevStep(),
      })
    ).addAction(
      new FBtnMDP({
        label: "Save",
        onClick: this.saveTask(),
      })
    ).addAction(
      new FBtnMDP({
        label: "Save And Next",
        onClick: this.validateAndSaveAndNext(),
      })
    );
    this.taskRoot.setConfirmAccountNumber();
  }

  validateAndSaveAndNext() {
    return () => {
      this.getMyRef().submitForm(() => {
        this.updateBankInfo(true);
      });
    }
  }

  saveTask() {
    return () => {
      this.getMyRef().submitForm(() => {
      this.updateBankInfo();
      })
    };
  }

  updateBankInfo(goToNextStep: boolean = false) {
    const input = Data.Spine.UpdateBankInfoInput.fromJson(this.taskRoot.taskFormData.taskOutput.bankInfo)
    input.clientFileId = (this.taskRoot as any).clientFileBasicInfo.clientFileId;
    input.taskId = this.taskRoot.taskId;
    Action.Spine.UpdateBankInfo.execute(input, (output: any) => {
      Snackbar.show({
        text: "Succesfully Saved",
        pos: "bottom-center",
      });
      if (goToNextStep) {
        (this.taskRoot as any).goToStep(5)
      }
    });
  }


  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }


  goToPrevStep() {
    return () => {
      (this.taskRoot as any).goToStep(3);
    }
  }
}
