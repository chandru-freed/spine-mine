import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";


export default class GSSADTDisplayStepFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: SelfTaskIntf;
  parent: any;
  constructor({
    taskRoot,
    parent,
  }: {
    taskRoot: SelfTaskIntf;
    parent: any;
  }) {
    super({
      myRefName: "generateSSADocFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.docId",
          label: "DocId",
          disabled: true,
          boundaryClass: "col-6",
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.templateCode",
          label: "Template Code",
          disabled: true,
          boundaryClass: "col-6",
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Rescue",
          onClick: this.rescueTask(),
        })
      )

  }

  getMyRef(): any {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }

  rescueTask() {
    return () => {
      this.taskRoot.rescueTask();
    }
  }
}
