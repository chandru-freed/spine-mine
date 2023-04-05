import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FRemoteAutoCompleteFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import * as Data from "@/../src-gen/data";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";

export default class ReassignTicketFFormMDP extends FFormMDP {
  root: any;
  constructor(prop: { root: any }) {
    super({ myRefName: "reassignTicketFFormRef" });
    this.root = prop.root;
    this.addField(
      new FGompaUserRemoteAutoCompleteFieldMDP({
        dataSelectorKey: "assignTo",
        label: "Assign To",
        parentMDP: new FFormChildMDP(),
        boundaryClass: "col-12",
      })
    )
      .addField(
        new FTextareaMDP({
          dataSelectorKey: "comment",
          label: "Comment",
          parentMDP: new FFormChildMDP(),
          boundaryClass: "col-12",
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Cancel",
          btnType: BtnType.TEXT,
          onClick: this.handleCancelClick(),
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Assign",
          onClick: this.submitReassignClick(),
        })
      );
  }
  getMyRef() {
    return this.root.$refs[this.myRefName];
  }

  submitReassignClick() {
    return () => {
      this.getMyRef().submitForm(() => {
        this.handleReassignClick();
      });
    };
  }

  handleReassignClick() {
    this.root.reassignTask();
  }

  handleCancelClick() {
    return () => {
      this.root.showReassignForm = false;
    };
  }
}
