import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import AddressFMiniFormMDP from "@/components/generic/form/field/AddressFMiniFormMDP";
import FDateFieldMDP from "@/components/generic/form/field/FDateFieldMDP";
import FSwitchMDP from "@/components/generic/form/field/FSwitchMDP";

export default class UnderwrittingApprovedFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      myRefName: "underwrittingApprovedForm",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FSwitchMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "underwrittingApproved",
        label: "Approved",
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