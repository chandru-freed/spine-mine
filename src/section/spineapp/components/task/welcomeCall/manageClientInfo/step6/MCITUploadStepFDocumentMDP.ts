import FBtnMDP from "@/components/generic/FBtnMDP";
import FDocumentMDP from "@/components/generic/file/documentUpload/FDocumentMDP";

export default class MCITUploadStepFDocumentMDP extends FDocumentMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "welcomeCallDocumentListRef",
      dataSelectorKey: "taskOutput.fileDocumentList",
      disabled: taskRoot.taskDisabled,
    });

    // this.addAction(
    //   new FBtnMDP({
    //     label: "Previous",
    //     onClick: this.goToPrevStep(),
    //   })
    // )
    // .addAction(
    //   new FBtnMDP({
    //     label: "Save",
    //     onClick: this.saveTask(),
    //   })
    // )
    // .addAction(
    //   new FBtnMDP({
    //     label: "Save And Next",
    //     onClick: this.goToNextStep(),
    //   })
    // );;
  }

  // saveTask() {
  //   return () => {
  //     this.taskRoot.saveTask();
  //   };
  // }

  // goToPrevStep() {
  //   return () => {
  //     (this.taskRoot as any).goToStep(4);
  //   }
  // }
  // goToNextStep() {
  //   return () => {
  //     (this.taskRoot as any).goToStep(6);
  //   }
  // }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }
}
