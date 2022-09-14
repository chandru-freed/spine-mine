import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FSwitchMDP from "@/components/generic/form/field/FSwitchMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";

export default class SSAFTStepFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: ManualTaskIntf;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: ManualTaskIntf; parent: any }) {
    super({
      myRefName: "signServiceAgreementFailedFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskInput.clientFileNumber",
        label: "File ID",
        boundaryClass: "col-6",
        disabled: true
      })
    ).addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskInput.digioSignStatus",
        label: "Digio Status",
        boundaryClass: "col-6",
        disabled: true
      })
    ).addField(
      new FSwitchMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskOutput.signAgreementRetry",
        label: "Retry Sign Agreement",
        mandatory: true,
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