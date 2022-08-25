import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import { GenericTaskIntf } from "@/section/spineapp/util/GenericTaskIntf";

export default class UUSDTFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: GenericTaskIntf;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: GenericTaskIntf; parent: any }) {
    super({
      myRefName: "uploadUnSignedDocFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskInput.fileId",
        label: "File ID",
        boundaryClass: "col-6",
        disabled: true
      })
    ).addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskInput.templateCode",
        label: "Template Code",
        boundaryClass: "col-6",
        disabled: true
      })
    ).addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskInput.unsignedFilePath",
        label: "Unsigned File Path",
        boundaryClass: "col-6",
        disabled: true
      })
    ).addAction(
      new FBtnMDP({
        label: "Save",
        onClick: this.validateAndSubmit()
      })
    ).addAction(
      new FBtnMDP({
        label: "Mark Completed",
        onClick: this.validateAndMarkComplete(),
        btnType: BtnType.FILLED
      })
    )
  }

  getMyRef(): any {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }

  validateAndSubmit() {
    return () => {
      this.getMyRef().submitForm(this.saveTask());
    };
  }

  validateAndMarkComplete() {
    return () => {
      this.getMyRef().submitForm(this.saveAndMarkCompleteTask());
    };
  }

  saveAndMarkCompleteTask() {
    return () => {
      this.taskRoot.saveAndMarkCompleteTask();
    };
  }

  saveTask() {
    return () => {
      this.taskRoot.saveTask();
    };
  }
}