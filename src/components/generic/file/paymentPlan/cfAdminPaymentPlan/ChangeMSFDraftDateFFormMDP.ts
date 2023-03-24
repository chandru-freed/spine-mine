import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";

import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";

export default class ChangeMSFDraftDateFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  parent: any;
  constructor({
    parent,
  }: {
    parent: any;
  }) {
    super({
      myRefName: "changeMSFDraftDateFFormRef",
    });
    this.parent = parent;

    this.addField(new FSelectDateFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "newMsfDraftDate",
        label: "New Msf DraftDate",
        boundaryClass: "col-6",
        mandatory: true,

    })).addAction(
      new FBtnMDP({
        label: "Cancel",
        onClick: this.cancel(),
      })
    ).addAction(
      new FBtnMDP({
        label: "Save",
        onClick: this.validateAndChangeMSFDraftDate(),
      })
    );
  }

  getMyRef() {
    return this.parent.$refs[this.myRefName];
  }

  validateAndChangeMSFDraftDate() {
    return () => {
      this.getMyRef().submitForm(() => {
        this.changeMSFDraftDate();
      });
    };
  }
  changeMSFDraftDate() {
    Action.Spine.ChangeMSFEntryDraftDate.execute(this.parent.changeMSFDraftDateInput, output => {
      this.parent.resetFormsTableAndData();
      Snackbar.show({
        text: "Succesfully changed the msf draft date",
        pos: "bottom-center",
      });
    });
  }

  cancel() {
    return () => {
      this.parent.resetFormsTableAndData();
    }
    
  }
}
