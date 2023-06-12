
import FProfileFFormMDP from "@/components/generic/file/FProfileFFormMDP";
import FRegistrationDetailsMDP from "@/components/generic/file/FRegistrationDetailsMDP";

export default class CFPersonalInfoFProfileFFormMDP extends FRegistrationDetailsMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName: "cfRegistrationDetails",
      disabled: true,
      dataSelectorKey: "clientBasicInfo"
    });

  }


  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName];
  }
}
