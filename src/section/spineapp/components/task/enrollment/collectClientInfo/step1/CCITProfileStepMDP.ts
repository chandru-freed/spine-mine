import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FProfileFFormMDP from "@/components/generic/file/FProfileFFormMDP";
import FRegistrationDetailsMDP from "@/components/generic/file/FRegistrationDetailsMDP";
import MDP from "@/components/generic/MDP";
import CCITProfileMDP from "./CCITProfileMDP";

export default class CCITProfileStepMDP extends CCITProfileMDP {
    profileFFormRef = "profileFFormRef"

    constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
        super({
            taskRoot: taskRoot,
            parent: parent,
            myRefName: "personalInfoProfileRef",
            disabled: taskRoot.taskDisabled,
        });

        this.addForm(new FRegistrationDetailsMDP({
            taskRoot: taskRoot,
            parent: parent,
            myRefName: "clRegistrationDetailsFFormRef",
            dataSelectorKey: "taskInput.clRegistrationDetails",
            disabled: true
        })).addForm(new FProfileFFormMDP({
            taskRoot: taskRoot,
            parent: parent,
            myRefName: this.profileFFormRef,
            dataSelectorKey: "taskOutput.personalInfo",
            disabled: taskRoot.taskDisabled
        }))

        this.addAction(
            new FBtnMDP({
                label: "Save",
                onClick: this.validateAndSave(),
                condition: this.isStarted()
            })
        ).addAction(
            new FBtnMDP({
                label: "Rescue",
                onClick: this.rescueTask(),
                condition: this.isException()
            })
        );;
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
    getMyRef() {
        return this.parent.getMyRef().$refs[this.myRefName];
    }

    getProfileFormRef() {
        return this.getMyRef()[0].$refs[this.profileFFormRef][0]
    }

    validateAndSave() {
        return () => {
            this.getProfileFormRef().submitForm(() => {
                console.log("client profile");
                console.log("task rook", this.taskRoot);
                this.taskRoot.saveTask();
            });
        }
    }

}