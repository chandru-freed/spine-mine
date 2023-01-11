import FDocumentCHPPMDP from "@/components/generic/file/documentUploadCHPP/FDocumentCHPPMDP";

export default class CHPPTProofStepFDocumentMDP extends FDocumentCHPPMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "documentListRef",
      dataSelectorKey: "taskOutput.fileDocumentList",
      disabled: taskRoot.taskDisabled,
    });
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }
}
