import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FSwitchMDP from "@/components/generic/form/field/FSwitchMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";

import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";

export default class UTApprovedStepFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      myRefName: "underwrittingApprovedFFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this
    .addField(new FTextFieldMDP({
      dataSelectorKey: "taskInput.exceptionTakenList",
      label: "Exception Taken",
      parentMDP: this.childMDP,
      boundaryClass: "col-6",
      disabled: true
    })).addField(new FTextFieldMDP({
      parentMDP: this.childMDP,
      dataSelectorKey: "taskInput.exceptionApprovedBy",
      label:"Exception ApprovedBy",
      boundaryClass: "col-6",
      disabled: true
    }))
    .addField(
      new FSwitchMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskOutput.underwrittingApproved",
        label: "Underwritting Approved",
        mandatory: true,
        disabled: false,
      })
    )
      .addField(
        new FTextareaMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskInput.reasonForUnderwrittingDecline",
          label: "Reason for Rejection",
          mandatory: false,
          disabled: this.taskRoot.taskFormData.taskOutput.underwrittingApproved,
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Mark Completed",
          onClick: this.validateAndMarkComplete(),
          btnType: BtnType.FILLED,
          condition: this.isStarted(),
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Rescue",
          onClick: this.rescueTask(),
          condition: this.isException(),
        })
      );
  }

  getMyRef(): any {
    return this.parent.getMyRef().$refs[this.myRefName][0];
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

  rescueTask() {
    return () => {
      this.taskRoot.rescueTask();
    };
  }

  isStarted() {
    return (
      this.taskRoot.taskDetails.taskState === "STARTED" ||
      this.taskRoot.taskDetails.taskState === "PARTIALLY_COMPLETED"
    );
  }

  isException() {
    return (
      this.taskRoot.taskDetails.taskState === "EXCEPTION_Q" ||
      this.taskRoot.taskDetails.taskState === "EXIT_Q"
    );
  }

  // new implement
  validateAndSubmit() {
    return (successCallBack: any) => {
      this.getMyRef().submitForm(() => {
        this.saveTask(() => successCallBack());
      });
    };
  }

  saveTask(successCallBack: any) {
    this.taskRoot.saveTask(() => successCallBack());
  }
}
