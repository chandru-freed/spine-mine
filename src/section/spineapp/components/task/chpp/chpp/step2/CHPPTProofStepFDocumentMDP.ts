import FBtnMDP from "@/components/generic/FBtnMDP";
import FDocumentMDP from "@/components/generic/file/documentUpload/FDocumentMDP";

export default class CHPPTProofStepFDocumentMDP extends FDocumentMDP {
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
    //     label: "Save",
    //     onClick: this.saveTask(),
    //   })
    // );
  }

  // goBack() {
  //   return () => {
  //     this.taskRoot.goToStep(0)
  //   }
  // }

  // saveTask() {
  //   return () => {
  //     this.taskRoot.saveTask();
  //   };
  // }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }
}
