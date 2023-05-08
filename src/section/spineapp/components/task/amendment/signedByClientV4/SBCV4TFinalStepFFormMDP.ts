
import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";





export default class SBCV4TFinalStepFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: any;
    parent: any;
    constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
        super({
            myRefName: "signedByClientFinalFormRef",
            disabled: taskRoot.taskDisabled,
        });
        this.taskRoot = taskRoot;
        this.parent = parent;

        this
        .addField(new FTextFieldMDP({
            parentMDP: this.childMDP,
            dataSelectorKey:"taskOutput.amendmentLink",
            label:"Amendment Link",
            readonly: true
        }));
        // .addAction(
        //     new FBtnMDP({
        //         label: "Mark Complete",
        //         onClick: this.saveAndMarkCompleteTask(),
        //         btnType: BtnType.FILLED
        //     })
        // );
    }

    saveAndMarkCompleteTask() {
        return () => {
          this.taskRoot.saveAndMarkCompleteTask();
        };
      }
}
