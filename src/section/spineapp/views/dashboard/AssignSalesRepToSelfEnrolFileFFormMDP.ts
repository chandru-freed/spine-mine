import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FDateTimeSelectFieldMDP from "@/components/generic/form/field/FDateTimeSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import FAutoCompleteFieldMDP from "@/components/generic/form/field/FAutoCompleteFieldMDP";
import { DispositionType } from "@/components/generic/form/field/DispositionFMiniFormMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";

export default class AssignSalesRepToSelfEnrolFileFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  root: any;
  constructor({ root }: { root: any }) {
    super({ myRefName: "assignSalesRepToSelfEnrolFileFFormRef" });
    this.root = root;
    this.addField(
      new FGompaUserRemoteAutoCompleteFieldMDP({
        dataSelectorKey: "assignedSalesRep",
        label: "User Name",
        parentMDP: new FFormChildMDP(),
        boundaryClass: "col-12",
        smallChips: true,
        clearable: false,
      })
    ).addAction(
      new FBtnMDP({
        label: "Cancel",
        btnType: BtnType.TEXT,
        onClick: this.handleCancelClick(),
      })
    ).addAction(
      new FBtnMDP({
        label: "Assign",
        onClick: this.submitAssignClick(),
      })
    );
    // this.root = props.root;
  }

  getMyRef() {
    return this.root.$refs[this.myRefName];
  }

  submitAssignClick() {
    return () => {
      this.getMyRef().submitForm(() => {
        this.handleAssignClick();
      });
    };
  }

  handleAssignClick() {
    this.root.assignSalesRep();
  }

  handleCancelClick(){
    return (() => {
      this.root.showAssignForm = false;
    });
  }
}
