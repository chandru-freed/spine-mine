import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FDateFieldMDP from "@/components/generic/form/field/FDateFieldMDP";
import FFileFieldMDP from "@/components/generic/form/field/FFileFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";

export default class FUploadDocumentFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      myRefName: "uploadDocumentFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "documentType",
        label: "Type of Document",
        mandatory: true,
        boundaryClass: "col-4",
        items:["Aadhaar", "PAN", "Credit Score", "Photo", "Others"]
      })).addField(
      new FFileFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "document",
        label: "Document",
        mandatory: false,
        boundaryClass: "col-8"
      })
    ).addAction(new FBtnMDP({
        label: "Cancel",
        btnType: BtnType.TEXT,
        onClick: () => { this.closeAddForm() }
      })).addAction(new FBtnMDP({
        label: "Upload Document",
        onClick: this.uploadDocument()
      }));
  }

  getMyRef() {
    return this.parent.getMyRef()[0].$refs[this.myRefName]
  }

  uploadDocument() {
    return () => {
      this.getMyRef().submitForm(() => {
        this.parent.getMyRef()[0].uploadDocumentForFile();
      });
    }
  }

  closeAddForm() {
    this.parent.getMyRef()[0].closeAndClearAllForms();
  }

}