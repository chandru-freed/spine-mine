import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";

import FSwitchMDP from "@/components/generic/form/field/FSwitchMDP";
import ManualTaskIntf from "@/section/spineapp/util/ManualTaskIntf";


export default class MCITMarkCompleteStepFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: ManualTaskIntf;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: ManualTaskIntf; parent: any }) {
    super({
      myRefName: "welcomeCallVerifyForm",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FSwitchMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskOutput.cancelRequest",
        label: "Cancel Request",
        boundaryClass: "col-3",
      })
    ).addField(
        new FSwitchMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.signServiceAgreementNeeded",
          label: "Sign Service Agreement Needed",
          boundaryClass: "col-3",
        })
      ).addField(
        new FSwitchMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.amendmentNeeded",
          label: "Amendment Needed",
          boundaryClass: "col-3",
        })
      ).addField(
        new FSwitchMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.eMandateNeeded",
          label: "EMandate Needed",
          boundaryClass: "col-3",
        })
      )
      .addAction(
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
