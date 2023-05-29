import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";

import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FCFAWSUploadFileFieldMDP from "@/components/generic/form/field/FCFAWSUploadFileFieldMDP";
import FFileFieldMDP from "@/components/generic/form/field/FFileFieldMDP";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import FBtnMDP from "@/components/generic/FBtnMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";

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
        boundaryClass: "col-4",
      })
    ).addField(
      new FNumberFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "loanNumber",
        label: "Loan Number",
        boundaryClass: "col-4",
      })
    ).addField(
      new FNumberFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "tenure",
        label: "Tenure",
        boundaryClass: "col-4",
      })
    ).addField(
      new FNumberFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "roi",
        label: "ROI",
        boundaryClass: "col-4",
      })
    ).addField(
      new FNumberFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "newMontlhyEmi",
        label: "New Montlhy Emi",
        boundaryClass: "col-4",
      })
    ).addField(
      new FSelectDateFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "loanApprovedOn",
        label: "Loan Approved On",
        boundaryClass: "col-4",
      })
    ).addField(
      new FSelectDateFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "emiStartDate",
        label: "Emi Start Date",
        boundaryClass: "col-4",
      })
    ).addField(
      new FNumberFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "existingCashBalance",
        label: "Existing Cash Balance",
        boundaryClass: "col-4",
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
