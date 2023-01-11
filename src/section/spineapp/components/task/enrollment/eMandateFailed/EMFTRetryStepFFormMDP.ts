import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FSwitchMDP from "@/components/generic/form/field/FSwitchMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import Task from "@/section/spineapp/util/Task";

import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";

export default class EMFTRetryStepFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: ManualTaskIntf;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: ManualTaskIntf; parent: any }) {
    super({
      myRefName: "eMandateFailedFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskInput.eMandateStatus",
        label: "Emandate Status",
        readonly: true,
        boundaryClass: "col-6",
      })
    )
      .addField(
        new FSwitchMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.eMandateRetry",
          label: "Retry Emandate",
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Save",
          onClick: this.validateAndSubmit(),
          condition: this.isStarted(),
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Mark Complete",
          onClick: this.validateAndMarkComplete(),
          btnType: BtnType.FILLED,
          condition: Task.isMarkCompleteEnabled(this.taskRoot.taskDetails)
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
}
