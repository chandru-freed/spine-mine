import FBtnMDP from "@/components/generic/FBtnMDP";
import FAdminCreditorMDP from '@/section/spineapp/views/file/admin/creditor/FAdminCreditorMDP';

export default class CFCreditorInfoFCreditorMDP extends FAdminCreditorMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName :"cfCreditorInfoRef",
      disabled: false,
    });

  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName];
  }
}
