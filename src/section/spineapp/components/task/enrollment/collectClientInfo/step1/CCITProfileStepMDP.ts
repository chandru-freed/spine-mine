import CLProfileMDP from "@/components/generic/clientProfile/CLProfileMDP";
import FProfileFFormMDP from "@/components/generic/file/FProfileFFormMDP";
import FRegistrationDetailsMDP from "@/components/generic/file/FRegistrationDetailsMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";

export default class CCITProfileStepMDP extends CLProfileMDP {
  profileFFormRef = "profileFFormRef";

  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "personalInfoProfileRef",
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

  rescueTask() {
    return () => {
      this.taskRoot.rescueTask();
    };
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName];
  }

  getProfileFormRef() {
    return this.getMyRef()[0].$refs[this.profileFFormRef][0];
  }

  // new implement
  validateAndSubmit() {
    return (successCallBack: any) => {
      this.getProfileFormRef().submitForm(() => {
        this.saveTask(() => successCallBack());
      });
    };
  }

  saveTask(successCallBack: any) {
    this.updateClPersonalInfo(() => successCallBack());
  }

  updateClPersonalInfo(callback?: () => void) {
    const input = Data.Spine.UpdateClPersonalInfoInput.fromJson(
      this.taskRoot.taskFormData.taskOutput.personalInfo
    );
    input.clientId = (
      this.taskRoot as any
    ).clientFileBasicInfo.clientBasicInfo.clientId;
    input.taskId = this.taskRoot.taskId;
    console.log(this.taskRoot.taskId);
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
