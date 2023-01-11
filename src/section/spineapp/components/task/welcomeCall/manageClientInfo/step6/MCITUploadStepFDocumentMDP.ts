import FBtnMDP from "@/components/generic/FBtnMDP";
import FDocumentMDP from "@/components/generic/file/documentUpload/FDocumentMDP";

export default class MCITUploadStepFDocumentMDP extends FDocumentMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "welcomeCallDocumentListRef",
      dataSelectorKey: "taskOutput.fileDocumentList",
      disabled: true,
    });
  }
  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }
}
