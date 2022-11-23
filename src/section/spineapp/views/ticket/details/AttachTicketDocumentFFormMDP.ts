import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FAWSUploadFileFieldMDP from "@/components/generic/form/field/FAWSUploadFileFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";
import * as Data from "@/../src-gen/data";

export default class FUploadDocumentFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  root: any;
  parent: any;
  constructor({ root, parent }: { root: any; parent: any }) {
    super({
      myRefName: "uploadDocumentFormRef",
      disabled: root.taskDisabled,
    });
    this.root = root;
    this.parent = parent;

    this.addField(
      new FSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "documentType",
        label: "Type of Document",
        mandatory: true,
        boundaryClass: "col-4",
        options:["Aadhaar", "PAN", "Credit Score", "Photo", "Others"]
      })).addField(
      new FAWSUploadFileFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "documentPath",
        label: "Document",
        mandatory: true,
        boundaryClass: "col-8",
        documentRefType: Data.Spine.DOCUMENT_REF_TYPE.TICKET,
        documentRefId: this.root.ticketId
      })
    ).addField(
      new FTextareaMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "documentDetails",
        label: "Descriprion",
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
    return this.root.$refs[this.myRefName]
  }

  uploadDocument() {
    return () => {
      this.getMyRef().submitForm(() => {
        this.root.attachDocument();
      });
    }
  }

  closeAddForm() {
    this.root.closeAndClearAllForms();
  }

}
