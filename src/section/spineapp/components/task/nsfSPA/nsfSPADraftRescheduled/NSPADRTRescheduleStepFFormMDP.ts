import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";

export default class NSPADRTRescheduleStepFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: SelfTaskIntf;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: SelfTaskIntf; parent: any }) {
    super({
      myRefName: "nsfSPADraftRescheduledFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskInput.spaScheduledDraftDate",
        label: "Draft Rescheduled Date",
        mandatory: true,
        boundaryClass: "col-6",
        disabled: true,
      })
    ).addAction(
      new FBtnMDP({
        label: "Rescue",
        onClick: this.validateAndSubmit(),
      })
    );
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
}
