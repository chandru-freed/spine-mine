import FBtnMDP from "@/components/generic/FBtnMDP";
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

    this.addAction(
      new FBtnMDP({
        label: "Previous",
        onClick: this.goToPrevStep(),
      })
    )
      .addAction(
        new FBtnMDP({
          label: "Save",
          onClick: this.saveTask(),
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
          onClick: this.goToNextStep(),

        })
      );
  }

  saveTask() {
    return () => {
      this.taskRoot.saveTask();
    };
  }

  goToPrevStep() {
    return () => {
      (this.taskRoot as any).goToStep(0);
    }
  }
  goToNextStep() {
    return () => {
      (this.taskRoot as any).goToStep(2);
    }
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
    return this.parent.getMyRef().$refs[this.myRefName];
  }
}
