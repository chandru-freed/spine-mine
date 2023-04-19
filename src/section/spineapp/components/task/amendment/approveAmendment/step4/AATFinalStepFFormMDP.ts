
import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FSwitchMDP from "@/components/generic/form/field/FSwitchMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";
import Task from "@/section/spineapp/util/Task";





export default class AATFinalStepFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: any;
    parent: any;
    constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
        super({
            myRefName: "approveAmendmentFinalFormRef",
            disabled: taskRoot.taskDisabled,
        });
        this.taskRoot = taskRoot;
        this.parent = parent;
        this.addAction(
            new FBtnMDP({
                label: "Mark Complete",
                onClick: this.saveAndMarkCompleteTask(),
                btnType: BtnType.FILLED,
                condition: Task.isMarkCompleteEnabled(this.taskRoot.taskDetails)
            })
        );
    }

    saveAndMarkCompleteTask() {
        return () => {
          this.taskRoot.saveAndMarkCompleteTask();
        };
      }
}
