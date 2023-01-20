
import FBtnMDP from "@/components/generic/FBtnMDP";
import FProfileFFormMDP from "@/components/generic/file/FProfileFFormMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import FSnackbar from "@/fsnackbar";


export default class CFAPersonalInfoFProfileFFormMDP extends FProfileFFormMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "cfPersonalInfoFProfileRef",
      disabled: false,
      readonly: false
    });

    this.addAction(new FBtnMDP({
      label:"Save",
      onClick: this.validateAndSubmit()
    }))

  }


  getMyRef() {
    return this.parent.$refs[this.myRefName];
  }

  

  // new implement
  validateAndSubmit() {
    return (nextCallback?: () => void) => {
      console.log(this.getMyRef(),"this.getMyRef()");
      this.getMyRef().submitForm(() => {
        this.updateClPersonalInfo(nextCallback);
      });
    };
  }

  updateClPersonalInfo(callback?: () => void) {
    const input = Data.Spine.UpdateClPersonalInfoInput.fromJson(
      this.taskRoot.personalInfo
    );
    input.clientId = (
      this.taskRoot as any
    ).clientFileBasicInfo.clientBasicInfo.clientId;
    Action.Spine.UpdateClPersonalInfo.execute(input, (output: any) => {
      FSnackbar.success("Succesfully saved");
      if (callback) {
        callback();
      }
    });
  }
}
