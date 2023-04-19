
import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FSwitchMDP from "@/components/generic/form/field/FSwitchMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";
import Task from "@/section/spineapp/util/Task";





export default class AATApproveStepFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: any;
    parent: any;
    constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
        super({
            myRefName: "approveAmendmentFormRef",
            disabled: taskRoot.taskDisabled,
        });
        this.taskRoot = taskRoot;
        this.parent = parent;
        this
        .addField(
          new FSwitchMDP({
            parentMDP: this.childMDP,
            dataSelectorKey: "taskOutput.amendmentApproved",
            label: "Approve",
            boundaryClass: "col-12",
            disabled: true
          })
        )
        .addField(
            new FTextareaMDP({
              parentMDP: this.childMDP,
              dataSelectorKey: "taskOutput.reviewNote",
              label: "Note",
              mandatory: true,
              boundaryClass: "col-12",
            })
          );
    }

    saveAndMarkCompleteTask() {
        return () => {
          this.taskRoot.saveAndMarkCompleteTask();
        };
      }
}
