import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";

export default class SEMLTStepFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;

  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      myRefName: "sendEMandateLinkFormRef",
      disabled: taskRoot.taskDisabled,
    });

    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskInput.eMandateId",
        label: "EMandate Id",
        mandatory: true,
        boundaryClass: "col-6",
        disabled: true,
      })
    ).addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskInput.eMandateLink",
        label: "EMandateLink Id",
        mandatory: true,
        boundaryClass: "col-6",
        disabled: true,
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
