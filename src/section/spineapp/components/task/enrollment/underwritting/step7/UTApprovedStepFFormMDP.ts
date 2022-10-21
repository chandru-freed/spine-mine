import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
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

    this.addField(
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
        label: "Reason for Rejection",
        mandatory: false,
        disabled: this.taskRoot.taskFormData.taskOutput.underwrittingApproved
      })
    )
      // .addAction(
      //   new FBtnMDP({
      //     label: "Save",
      //     onClick: this.validateAndSubmit(),
      //     condition: this.isStarted()
      //   })
      // )
      .addAction(
        new FBtnMDP({
          label: "Mark Completed",
          onClick: this.validateAndMarkComplete(),
          btnType: BtnType.FILLED,
          condition: this.isStarted()
        })
      ).addAction(
        new FBtnMDP({
          label: "Rescue",
          onClick: this.rescueTask(),
          condition: this.isException()
        })
      )
  }

  getMyRef(): any {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }

  // validateAndSubmit() {
  //   return () => {
  //     console.log( this.getMyRef());
  //     this.getMyRef().submitForm(this.saveTask());
  //   };
  // }

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

  // saveTask() {
  //   return () => {
  //     this.taskRoot.saveTask();
  //   };
  // }

  rescueTask() {
    return () => {
      this.taskRoot.rescueTask();
    };
  }

  isStarted() {
    return this.taskRoot.taskDetails.taskState === "STARTED" || this.taskRoot.taskDetails.taskState === "PARTIALLY_COMPLETED";
  }

  isException() {
    return this.taskRoot.taskDetails.taskState === "EXCEPTION_Q" || this.taskRoot.taskDetails.taskState === "EXIT_Q";
  }


  // new implement

  validateAndSubmit() {
    return (successCallBack: any) => {
      this.getMyRef().submitForm(() => {
        this.saveTask(() => successCallBack())
      }
      );
    };
  }

  saveTask(successCallBack: any) {
    this.taskRoot.saveTask(() => successCallBack());
  }

}