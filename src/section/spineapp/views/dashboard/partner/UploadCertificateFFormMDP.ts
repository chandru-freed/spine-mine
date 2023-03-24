import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FDateFieldMDP from "@/components/generic/form/field/FDateFieldMDP";
import FFileFieldMDP from "@/components/generic/form/field/FFileFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";


export default class UploadCertificateFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      myRefName: "uploadCertificateFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FFileFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "fileDoc",
        label: "Certificate",
        mandatory: true,
        boundaryClass: "col-12"
      })
    ).addAction(new FBtnMDP({
        label: "Cancel",
        btnType: BtnType.TEXT,
        onClick: () => { this.closeAddForm() }
      })).addAction(new FBtnMDP({
        label: "Upload Certificate",
        onClick: this.uploadCertificate()
      }));
  }

  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }

  uploadCertificate() {
    return () => {
      this.getMyRef().submitForm(() => {
        this.taskRoot.getPresignedURLAndUpload();
      });
    }
  }

  closeAddForm() {
    this.taskRoot.clearCertificateForm();
  }

}
