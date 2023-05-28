
import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FSwitchMDP from "@/components/generic/form/field/FSwitchMDP";





export default class RPCFTFinalStepFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: any;
    parent: any;
    constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
        super({
            myRefName: "retainPendingCancelledFileFinalFormRef",
            disabled: taskRoot.taskDisabled,
            dataSelectorKey: "taskOutput"
        });
        this.taskRoot = taskRoot;
        this.parent = parent;

        this
        .addField(new FSwitchMDP({
            label:"Amendment needed",
            dataSelectorKey: "reinstateWithAmendment",
            parentMDP: this.childMDP,
            boundaryClass:"col-6"
        }))
        .addAction(
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
