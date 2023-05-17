import FBtnMDP from "@/components/generic/FBtnMDP";
import FBankFFormMDP from "@/components/generic/file/FBankFFormMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import FSnackbar from "@/fsnackbar";

export default class CFBankInfoFBankFFormMDP extends FBankFFormMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "cfBankInfoRef",
      disabled: false,
      readonly: false,
    });

    this.addAction(new FBtnMDP({
      label: "Save",
      onClick: this.validateAndSubmit()
    }))
  }
  getMyRef() {
    return this.parent.$refs[this.myRefName];
  }


  // new implement
  validateAndSubmit() {
    return () => {
      console.log(this.taskRoot)
      this.getMyRef().submitForm(() => {
        this.updateBankInfo();
      });
    };
  }

  updateBankInfo() {
    const input = Data.Spine.UpdateBankInfoInput.fromJson(
      this.taskRoot.bankInfoForm
    );
    input.clientFileId =
      this.taskRoot.clientFileId;
    // input.taskId = this.taskRoot.taskId;
    Action.Spine.UpdateBankInfo.execute(input, (output: any) => {
      FSnackbar.success("Successfully saved");
    });
  }
}
