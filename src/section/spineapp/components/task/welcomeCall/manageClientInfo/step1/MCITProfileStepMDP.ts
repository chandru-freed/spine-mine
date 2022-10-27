import CLProfileMDP from "@/components/generic/clientProfile/CLProfileMDP";
import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FProfileFFormMDP from "@/components/generic/file/FProfileFFormMDP";
import FRegistrationDetailsMDP from "@/components/generic/file/FRegistrationDetailsMDP";
import MDP from "@/components/generic/MDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";

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
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName];
  }

  getProfileFormRef() {
    return this.getMyRef()[0].$refs[this.profileFFormRef][0];
  }

  // new implement
  validateAndSubmit() {
    return (nextCallback?: () => void) => {
      this.getProfileFormRef().submitForm(() => {
        this.updateClPersonalInfo(nextCallback);
      });
    };
  }

  updateClPersonalInfo(callback?: () => void) {
    const input = Data.Spine.UpdateClPersonalInfoInput.fromJson(
      this.taskRoot.taskFormData.taskOutput.personalInfo
    );
    input.clientId = (
      this.taskRoot as any
    ).clientFileBasicInfo.clientBasicInfo.clientId;
    input.taskId = this.taskRoot.taskId;

    Action.Spine.UpdateClPersonalInfo.execute(input, (output: any) => {
      Snackbar.show({
        text: "Succesfully saved",
        pos: "bottom-center",
      });
      if (callback) {
        callback();
      }
    });
  }
}
