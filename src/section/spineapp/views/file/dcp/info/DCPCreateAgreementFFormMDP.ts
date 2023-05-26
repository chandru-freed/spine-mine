import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";

import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FCFAWSUploadFileFieldMDP from "@/components/generic/form/field/FCFAWSUploadFileFieldMDP";
import FFileFieldMDP from "@/components/generic/form/field/FFileFieldMDP";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import FBtnMDP from "@/components/generic/FBtnMDP";

export default class DCPCreateAgreementFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  parent: any;
  constructor({ parent }: { parent: any }) {
    super({ myRefName: "DCPCreateAgreementRef" });
    this.parent = parent;
    this.addField(
      new FFileFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "dcpExcel",
        label: "Dcp Excel",
      })
    )
      .addAction(
        new FBtnMDP({
          label: "Cancel",
          onClick: this.handleCancelClick(),
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Generate Agreement",
          onClick: this.handleGenerateClick(),
        })
      );
  }

  handleGenerateClick() {
    return () => {
      const input: Data.DCPClientFile.GenerateAgreementFromExcelInput =
        Data.DCPClientFile.GenerateAgreementFromExcelInput.fromJson(
          this.parent.generateAgreementFromExcelInput
        );
      input.clientFileId = this.parent.clientFileId;
      Action.DCPClientFile.GenerateAgreementFromExcel.execute(
        input,
        (output) => {
          setTimeout(() => {
            this.parent.getAllAgreementList();
          }, 1000);
          this.parent.resetFormAndDialog();
        }
      );
      // this.parent.resetFormAndDialog();
    };
  }

  handleCancelClick() {
    return () => {
      this.parent.resetFormAndDialog();
    };
  }
}
