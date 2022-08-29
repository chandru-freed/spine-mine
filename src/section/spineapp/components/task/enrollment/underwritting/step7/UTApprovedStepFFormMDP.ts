import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FSwitchMDP from "@/components/generic/form/field/FSwitchMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import { GenericTaskIntf } from "@/section/spineapp/util/GenericTaskIntf";


export default class UTApprovedStepFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: GenericTaskIntf;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: GenericTaskIntf; parent: any }) {
    super({
      myRefName: "underwrittingApprovedFFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskInput.fileId",
        label: "File Id",
        mandatory: true,
        disabled: true
      })
    ).addField(
      new FSwitchMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskOutput.underwrittingApproved",
        label: "Underwritting Approved",
        mandatory: true,
        disabled: false
      })
    ).addField(
      new FTextareaMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskInput.reasonForUnderwrittingDecline",
        label: "Reason for Cancellation",
        mandatory: false,
        disabled: this.taskRoot.taskFormData.taskOutput.underwrittingApproved
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