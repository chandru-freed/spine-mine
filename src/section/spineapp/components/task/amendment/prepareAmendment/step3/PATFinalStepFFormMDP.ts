
import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import Task from "@/section/spineapp/util/Task";





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
        this.addField(
            new FTextareaMDP({
              parentMDP: this.childMDP,
              dataSelectorKey: "taskOutput.reviewNote",
              label: "Note",
              mandatory: true,
              boundaryClass: "col-12",
            })
          )
          .addAction(
            new FBtnMDP({
                label: "Mark Complete",
                onClick: this.saveAndMarkCompleteTask(),
                btnType: BtnType.FILLED,
                condition: Task.isMarkCompleteEnabled(this.taskRoot.taskDetails)
            })
        );
    }

    saveAndMarkCompleteTask() {
        console.log(this.taskRoot.taskDetails);
        return () => {
          this.taskRoot.saveAndMarkCompleteTask();
        };
      }
}
