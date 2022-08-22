import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import AddressFMiniFormMDP from "@/components/generic/form/field/AddressFMiniFormMDP";
import FDateFieldMDP from "@/components/generic/form/field/FDateFieldMDP";
import FSwitchMDP from "@/components/generic/form/field/FSwitchMDP";
import { CollectClientInfoTaskIntf } from "../CollectClientInfoTaskIntf";

export default class CCITMarkCompleteStepFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: CollectClientInfoTaskIntf;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: CollectClientInfoTaskIntf; parent: any }) {
    super({
      myRefName: "verifyForm",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FSwitchMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "needVerification",
        label: "Need Verification",
        mandatory: true,
        boundaryClass: "col-3",
      })
    ).addAction(
        new FBtnMDP({
          label: "Save",
          onClick: this.validateAndSubmit(),
        })
      ).addAction(
        new FBtnMDP({
          label: "Mark Complete",
          onClick: this.validateAndMarkComplete(),
          btnType: BtnType.FILLED
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

  

  saveTask() {
    return () => {
      this.taskRoot.saveTask();
    };
  }

  saveAndMarkCompleteTask() {
    return () => {
      this.taskRoot.saveAndMarkCompleteTask();
    };
  }
}
