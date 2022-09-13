import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FlowTaskIntf from "@/section/spineapp/util/task_intf/FlowTaskIntf";

export default class SSATStepFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: FlowTaskIntf;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: FlowTaskIntf; parent: any }) {
    super({
      myRefName: "sSATDigiSignStatusFFormRef",
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
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskOutput.digioSignStatus",
        label: "Digio Sign Status",
        mandatory: true,
      })
    ).addAction(
      new FBtnMDP({
        label: "Rescue",
        onClick: this.validateAndSubmit(),
        condition: this.isException()
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

  isStarted() {
    return this.taskRoot.taskDetails.taskState === "STARTED" || this.taskRoot.taskDetails.taskState === "PARTIALLY_COMPLETED";
  }

  isException() {
    return this.taskRoot.taskDetails.taskState === "EXCEPTION_Q" || this.taskRoot.taskDetails.taskState === "EXIT_Q";
  }



}