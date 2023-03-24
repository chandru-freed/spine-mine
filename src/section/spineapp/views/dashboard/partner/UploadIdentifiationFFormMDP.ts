import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FDateFieldMDP from "@/components/generic/form/field/FDateFieldMDP";
import FFileFieldMDP from "@/components/generic/form/field/FFileFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";


export default class UploadIdentifiationFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      myRefName: "uploadIdentifiationFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FFileFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "fileDoc",
        label: "Government ID",
        mandatory: true,
        boundaryClass: "col-12"
      })
    ).addAction(new FBtnMDP({
        label: "Cancel",
        btnType: BtnType.TEXT,
        onClick: () => { this.closeAddForm() }
      })).addAction(new FBtnMDP({
        label: "Upload Identifiation",
        onClick: this.uploadIdentifiation()
      }));
  }

  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }

  uploadIdentifiation() {
    return () => {
      this.getMyRef().submitForm(() => {
        this.taskRoot.getPresignedURLAndUploadIdentifiation();
      });
    }
  }

  closeAddForm() {
    this.taskRoot.clearIdentifiationForm();
  }

}
