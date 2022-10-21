import FBtnMDP from "@/components/generic/FBtnMDP";
import FDocumentMDP from "@/components/generic/file/documentUpload/FDocumentMDP";

export default class CCITUploadStepFDocumentMDP extends FDocumentMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "documentListRef",
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
    //     condition: this.isStarted()
    //   })
    // )
    // .addAction(
    //   new FBtnMDP({
    //     label: "Rescue",
    //     onClick: this.rescueTask(),
    //     condition: this.isException()
    //   })
    // ).addAction(
    //   new FBtnMDP({
    //     label: "Save And Next",
    //     onClick: this.goToNextStep(),
    //   })
    // );
  }

  // saveTask() {
  //   return () => {
  //     this.taskRoot.saveTask();
  //   };
  // }

  // rescueTask() {
  //   return () => {
  //     this.taskRoot.rescueTask();
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

  // isStarted() {
  //   return this.taskRoot.taskDetails.taskState === "STARTED" || this.taskRoot.taskDetails.taskState === "PARTIALLY_COMPLETED";
  // }

  // isException() {
  //   return this.taskRoot.taskDetails.taskState === "EXCEPTION_Q" || this.taskRoot.taskDetails.taskState === "EXIT_Q";
  // }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }
}
