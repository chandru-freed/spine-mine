import FBtnMDP from "@/components/generic/FBtnMDP";
import FDocumentMDP from "@/components/generic/file/documentUpload/FDocumentMDP";

export default class MCITUploadStepFDocumentMDP extends FDocumentMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "welcomeCallDocumentListRef",
      dataSelectorKey: "taskOutput.documentList",
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
      this.taskRoot.saveTask();
    };
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }
}
