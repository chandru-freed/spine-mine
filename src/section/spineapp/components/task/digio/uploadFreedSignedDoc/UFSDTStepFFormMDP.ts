import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";

import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";

export default class UFSDTStepFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      myRefName: "uploadFreedSignedDocFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskInput.templateCode",
        label: "Template Code",
        mandatory: true,
        boundaryClass: "col-6",
        readonly: true,
      })
    )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskInput.docId",
          label: "Doc Id",
          mandatory: true,
          boundaryClass: "col-6",
          readonly: true,
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskInput.freedSignedFilePath",
          label: "Freed Signed Filepath",
          mandatory: true,
          boundaryClass: "col-6",
          readonly: true,
        })
      );
  }

  getMyRef(): any {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }

  // new implement
  validateAndSubmit() {
    return (nextCallback?: (output: any) => void) => {
      this.getMyRef().submitForm(() => {
        if (nextCallback) {
          nextCallback(this.taskRoot.taskFormData.taskOutput);
        }
      });
    };
  }
}
