
import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
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
            .addField(new FSelectFieldMDP({
                label: "Reinstate option",
                dataSelectorKey: "reinstateOption",
                parentMDP: this.childMDP,
                boundaryClass: "col-6",
                options: reinstateOptionList,
                optionLabel: "name",
                optionValue: "id",
                mandatory: true
            }))
            .addAction(
                new FBtnMDP({
                    label: "Mark Complete",
                    onClick: this.saveAndMarkCompleteTask(),
                    btnType: BtnType.FILLED
                })
            );
    }

    getMyRef(): any {
        return this.parent.getMyRef().$refs[this.myRefName][0];
      }
    saveAndMarkCompleteTask() {
        return () => {
            this.getMyRef().submitForm(() => 
            {
                this.taskRoot.saveAndMarkCompleteTask()
            }
            );
        };
    }
}

export const reinstateOptionList = [
    {
        name: "Reinstate without amendment",
        id: "reinstate"
    },
    {
        name: "Reinstate with amendment",
        id: "reinstateWithAmendment"
    },
    {
        name: "Cancel",
        id: "cancel"
    },
]
