import FBtnMDP from "@/components/generic/FBtnMDP";
import FCreditorMDP from "@/components/generic/file/creditor/FCreditorMDP";

export default class MCITCreditorStepFCreditorMDP extends FCreditorMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName :"welcomeCallCreditorRef",
      dataSelectorKey: "taskOutput.creditorInfo",
      disabled: taskRoot.taskDisabled,
    });

    this.addAction(
      new FBtnMDP({
        label: "Previous",
        onClick: this.goToPrevStep(),
      })
    )
    // .addAction(
    //   new FBtnMDP({
    //     label: "Save",
    //     onClick: this.saveTask(),
    //   })
    // )
    .addAction(
      new FBtnMDP({
        label: "Save And Next",
        onClick: this.goToNextStep(),

      })
    );
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

  saveTask() {
    return () => {
      this.taskRoot.saveTask();
    };
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName];
  }
}
