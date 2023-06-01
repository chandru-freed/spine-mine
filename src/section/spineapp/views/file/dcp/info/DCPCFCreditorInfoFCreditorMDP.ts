import FBtnMDP from "@/components/generic/FBtnMDP";
import FCreditorMDP from '@/section/spineapp/views/file/drp/info/creditor/FCreditorMDP';

export default class DCPCFCreditorInfoFCreditorMDP extends FCreditorMDP {
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      taskRoot: taskRoot,
      parent: parent,
      myRefName :"dcpCFCreditorInfoRef",
      disabled: true,
    });

  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName];
  }
}
