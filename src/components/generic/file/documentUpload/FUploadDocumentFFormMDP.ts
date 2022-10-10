import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FDateFieldMDP from "@/components/generic/form/field/FDateFieldMDP";
import FFileFieldMDP from "@/components/generic/form/field/FFileFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FTextareaMDP from "../../form/field/FTextareaMDP";

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
        dataSelectorKey: "docType",
        label: "Type of Document",
        mandatory: true,
        boundaryClass: "col-4",
        options:["Aadhaar", "PAN", "Credit Score", "Photo", "Others"]
      })).addField(
      new FFileFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "fileDoc",
        label: "Document",
        mandatory: true,
        boundaryClass: "col-8"
      })
    ).addField(
      new FTextareaMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "documentDetails",
        label: "Description",
        mandatory: false,
        boundaryClass: "col-12"
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
    return this.parent.getMyRef().$refs[this.myRefName]
  }

  uploadDocument() {
    return () => {
      this.getMyRef().submitForm(() => {
        this.parent.getMyRef().getPresignedURLAndUpload();
      });
    }
  }

  closeAddForm() {
    this.parent.getMyRef().closeAndClearAllForms();
  }

}
