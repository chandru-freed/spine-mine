import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";

import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FFileFieldMDP from "@/components/generic/form/field/FFileFieldMDP";

export default class UploadExcelFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  parent: any;
  constructor({
    parent,
  }: {
    parent: any;
  }) {
    super({
      myRefName: "uploadCFPsEntryFFormRef",
    });
    this.parent = parent;

    this.addField(new FFileFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "paymentPlanExcel",
        label: "Payment Plan Excel",
        mandatory: true
    }))
    .addAction(
      new FBtnMDP({
        label: "Cancel",
        onClick: this.cancel(),
      })
    ).addAction(
      new FBtnMDP({
        label: "Upload",
        onClick: this.validateAndUploadExcel(),
      })
    );
  }

  getMyRef() {
    return this.parent.$refs[this.myRefName];
  }

  validateAndUploadExcel() {
    return () => {
      this.getMyRef().submitForm(() => {
        this.parent.uploadExcel();
      });
    };
  }

  cancel() {
    return () => {
      this.parent.resetFormsTableAndData();
    }
    
  }
}
