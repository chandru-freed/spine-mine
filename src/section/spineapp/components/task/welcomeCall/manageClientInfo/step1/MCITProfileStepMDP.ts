import CLProfileMDP from "@/components/generic/clientProfile/CLProfileMDP";
import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FProfileFFormMDP from "@/components/generic/file/FProfileFFormMDP";
import FRegistrationDetailsMDP from "@/components/generic/file/FRegistrationDetailsMDP";
import MDP from "@/components/generic/MDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from 'node-snackbar';

export default class MCITProfileStepMDP extends CLProfileMDP {
  profileFFormRef = "profileFFormRef";

  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "welcomeCallClientInfoFormRef",
      disabled: taskRoot.taskDisabled,
    });

    this.addForm(
      new FRegistrationDetailsMDP({
        taskRoot: taskRoot,
        parent: parent,
        myRefName: "clRegistrationDetailsFFormRef",
        dataSelectorKey: "taskInput.clRegistrationDetails",
        disabled: true,
      })
    ).addForm(
      new FProfileFFormMDP({
        taskRoot: taskRoot,
        parent: parent,
        myRefName: this.profileFFormRef,
        dataSelectorKey: "taskOutput.personalInfo",
        disabled: taskRoot.taskDisabled,
      })
    );

    this.addAction(
      new FBtnMDP({
          label: "Previous",
          onClick: () => { },
          disabled: true
      })
  ).addAction(
      new FBtnMDP({
        label: "Save",
        onClick: this.validateAndSave(),
        condition: this.isStarted(),
      })
    ).addAction(
      new FBtnMDP({
        label: "Rescue",
        onClick: this.rescueTask(),
        condition: this.isException(),
      })
    ).addAction(
      new FBtnMDP({
        label: "Save And Next",
        onClick: this.validateSaveAndNext(),
      })
    );
  }

  rescueTask() {
    return () => {
      this.taskRoot.rescueTask();
    };
  }

  isStarted() {
    return (
      this.taskRoot.taskDetails.taskState === "STARTED" ||
      this.taskRoot.taskDetails.taskState === "PARTIALLY_COMPLETED"
    );
  }

  isException() {
    return (
      this.taskRoot.taskDetails.taskState === "EXCEPTION_Q" ||
      this.taskRoot.taskDetails.taskState === "EXIT_Q"
    );
  }
  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName];
  }

  getProfileFormRef() {
    return this.getMyRef()[0].$refs[this.profileFFormRef][0];
  }

  validateSaveAndNext() {
    return () => {
      this.getProfileFormRef().submitForm(() => {
        this.updateClPersonalInfo(true);
      });
    }
  }

  validateAndSave() {
    return () => {
      this.getProfileFormRef().submitForm(() => {
        console.log("client profile");
        console.log("task rook", this.taskRoot);
        this.updateClPersonalInfo();
      });
    };
  }

  updateClPersonalInfo(goToNextStep: boolean = false) {
    const input = Data.Spine.UpdateClPersonalInfoInput.fromJson(
      this.taskRoot.taskFormData.taskOutput.personalInfo
    );
    input.clientId = (
      this.taskRoot as any
    ).clientFileBasicInfo.clientBasicInfo.clientId;
    input.taskId = this.taskRoot.taskId;

    Action.Spine.UpdateClPersonalInfo.execute(input, (output: any) => {
      // this.taskRoot.saveTask();
      Snackbar.show({
        text: "Succesfully saved",
        pos: "bottom-center"
      })
      if (goToNextStep) {
        (this.taskRoot as any).goToStep(1);
      }
    });
  }
}