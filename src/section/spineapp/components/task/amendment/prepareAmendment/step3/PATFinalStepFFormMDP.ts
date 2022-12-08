
import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";





export default class PATFinalStepFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: any;
    parent: any;
    constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
        super({
            myRefName: "prepareAmendmentFinalFormRef",
            disabled: taskRoot.taskDisabled,
        });
        this.taskRoot = taskRoot;
        this.parent = parent;

        this.addAction(
            new FBtnMDP({
                label: "Mark Complete",
                onClick: this.saveAndMarkCompleteTask(),
                btnType: BtnType.FILLED
            })
        );
    }

    saveAndMarkCompleteTask() {
        return () => {
          this.taskRoot.saveAndMarkCompleteTask();
        };
      }
}
