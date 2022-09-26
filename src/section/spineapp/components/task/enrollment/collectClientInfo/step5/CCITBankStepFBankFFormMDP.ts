import FBtnMDP from "@/components/generic/FBtnMDP";
import FBankFFormMDP from "@/components/generic/file/FBankFFormMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";

export default class CCITBankStepFBankFFormMDP extends FBankFFormMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "bankInfoForm",
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
        onClick: this.validateAndSubmit(),
        condition: this.isStarted()
      })
    ).addAction(
      new FBtnMDP({
        label: "Rescue",
        onClick: this.rescueTask(),
        condition: this.isException()
      })
    ).addAction(
      new FBtnMDP({
        label: "Save And Next",
        onClick: this.validateAndSaveAndNext(),
      })
    );
  }
  validateAndSubmit() {
    return () => {
        this.getMyRef().submitForm(() => {
          this.updateBankInfo();
        });
    };
}

validateAndSaveAndNext() {
    return () => {
      this.getMyRef().submitForm(() => {
        this.updateBankInfo(true);
      });
    }
  }

  goToPrevStep() {
    return () => {
      (this.taskRoot as any).goToStep(3);
    }
  }

  updateBankInfo(goToNextStep: boolean = false) {
    const input = Data.Spine.UpdateBankInfoInput.fromJson(this.taskRoot.taskFormData.taskOutput.bankInfo)
    input.clientFileId = (this.taskRoot as any).clientFileBasicInfo.clientFileId;
    Action.Spine.UpdateBankInfo.execute(input, (output: any) => {
        this.taskRoot.saveTask();
        if(goToNextStep) {
          (this.taskRoot as any).goToStep(5)
        }
    });
}

  rescueTask() {
    return () => {
      this.taskRoot.rescueTask();
    };
  }

  isStarted() {
    return this.taskRoot.taskDetails.taskState === "STARTED" || this.taskRoot.taskDetails.taskState === "PARTIALLY_COMPLETED";
  }

  isException() {
    return this.taskRoot.taskDetails.taskState === "EXCEPTION_Q" || this.taskRoot.taskDetails.taskState === "EXIT_Q";
  }
  

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }
}
