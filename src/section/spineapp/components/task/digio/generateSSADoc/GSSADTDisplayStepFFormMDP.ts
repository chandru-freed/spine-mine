import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import Task from "@/section/spineapp/util/Task";
import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";

export default class GSSADTDisplayStepFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      myRefName: "generateSSADocFormRef",
      disabled: !Task.isTaskActionable(taskRoot.taskDetails.taskState),
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskOutput.docId",
        label: "DocId",
        disabled: this.disabled,
        boundaryClass: "col-6",
        mandatory: true
      })
    )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.templateCode",
          label: "Template Code",
          disabled: this.disabled,
          boundaryClass: "col-6",
          mandatory: true
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Rescue",
          onClick: this.validateAndSubmit(),
        })
      );
  }

  getMyRef(): any {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }


  // new implement
  validateAndSubmit() {
    return () => {
      this.getMyRef().submitForm(() => {
        this.taskRoot.rescueTask();
      });
    };
  }

}
