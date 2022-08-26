import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import SelfTaskIntf from "@/section/spineapp/util/SelfTaskIntf";

export default class SLTFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: SelfTaskIntf;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: SelfTaskIntf; parent: any }) {
    super({
      myRefName: "sendLinkFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskInput.fileId", // that needs to be updated the data Selector Key
        label: "File ID",
        mandatory: true,
        boundaryClass: "col-4",
      })
    ).addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskInput.upiLink", // that needs to be updated the data Selector Key
        label: "UPI Link",
        mandatory: true,
        boundaryClass: "col-4",
      })
    ).addAction(
      new FBtnMDP({
        label: "Rescue",
        onClick: this.validateAndSubmit(),
      })
    )
  }
  getMyRef(): any {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }

  validateAndSubmit() {
    return () => {
      this.getMyRef().submitForm(this.rescueTask());
    };
  }


  rescueTask() {
    return () => {
      this.taskRoot.rescueTask();
    };
  }
}