import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import GenerateSSADocTaskIntf from "./GenerateSSADocTaskIntf";

export default class GSSADTDisplayStepFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: GenerateSSADocTaskIntf;
  parent: any;
  constructor({
    taskRoot,
    parent,
  }: {
    taskRoot: GenerateSSADocTaskIntf;
    parent: any;
  }) {
    super({
      myRefName: "generateSSADocForm",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskInput.fileId",
        label: "FileId",
        mandatory: true,
        boundaryClass: "col-4",
      })
    )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.docId",
          label: "DocId",
          mandatory: true,
          boundaryClass: "col-4",
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.templateCode",
          label: "Template Code",
          mandatory: true,
          boundaryClass: "col-4",
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Save",
          onClick: this.validateAndSubmit(),
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Mark Completed",
          onClick: this.validateAndMarkComplete(),
          btnType: BtnType.FILLED,
        })
      );
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
