import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FMarkCompleteMDP from "@/components/generic/file/markcomplete/FMarkCompleteMDP";
import CCITMarkCompleteStepFFormMDP from "./CCITMarkCompleteStepFFormMDP";

export default class CCITFMarkCompleteMDP extends FMarkCompleteMDP {
    taskRoot: any;
    parent: any;
    constructor({
        taskRoot, parent
    }: { taskRoot: any; parent: any }) {
        super();
        this.taskRoot = taskRoot;
        this.parent = parent;

        this
            // .addAction(
            //     new FBtnMDP({
            //         label: "Previous",
            //         onClick: this.goToPrevStep(),
            //         condition: this.isStarted()
            //     })
            // ).addAction(
            //     new FBtnMDP({
            //         label: "Save",
            //         onClick: this.saveTask(),
            //         condition: this.isStarted()
            //     })
            // )
            .addAction(
                new FBtnMDP({
                    label: "Mark Complete",
                    onClick: this.saveAndMarkCompleteTask(),
                    btnType: BtnType.FILLED,
                    condition: this.isStarted()
                })
            ).addForm(new CCITMarkCompleteStepFFormMDP({ taskRoot, parent }))
    }
    isStarted() {
        return this.taskRoot.taskDetails.taskState === "STARTED" || this.taskRoot.taskDetails.taskState === "PARTIALLY_COMPLETED";
    }


    // saveTask() {
    //     return () => {
    //         this.taskRoot.saveTask();
    //     };
    // }

    saveAndMarkCompleteTask() {
        return () => {
            this.taskRoot.saveAndMarkCompleteTask();
        };
    }


    // goToPrevStep() {
    //     return () => {
    //         (this.taskRoot as any).goToStep(5);
    //     }
    // }

    submit() {
        return (successCallBack: any) => {
            this.saveTask(() => successCallBack())
        };
    }

    saveTask(successCallBack: any) {
        this.taskRoot.saveTask(() => successCallBack());
    }

}