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
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";

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
        boundaryClass: "col-3",
        mandatory: true,
      })
    )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "loanNumber",
          label: "Loan Number",
          boundaryClass: "col-3",
          mandatory: true,
        })
      )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "tenure",
          label: "Tenure",
          mandatory: true,
          boundaryClass: "col-3",
          options: this.parent.tenureList,
        })
      )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "roi",
          label: "Rate of interest",
          mandatory: true,
          boundaryClass: "col-3",
          options: this.parent.roiList,
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "newMontlhyEmi",
          label: "New Montlhy Emi",
          boundaryClass: "col-3",
          mandatory: true,
        })
      )
      .addField(
        new FSelectDateFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "loanApprovedOn",
          label: "Loan Approved On",
          boundaryClass: "col-3",
          mandatory: true,
          futureDaysDisabled: true,
        })
      )
      .addField(
        new FSelectDateFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "emiStartDate",
          label: "Emi Start Date",
          boundaryClass: "col-3",
          mandatory: true,
          pastDaysDisabled: true,
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "existingCashBalance",
          label: "Pre-Consolidation Cash Balance",
          boundaryClass: "col-3",
          mandatory: true,
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

  getMyRef() {
    return this.parent.$refs[this.myRefName];
  }

  handleGenerateClick() {
    return () => {
      this.getMyRef().submitForm(() => {
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
      });
      // this.parent.resetFormAndDialog();
    };
  }

  handleCancelClick() {
    return () => {
      this.parent.resetFormAndDialog();
    };
  }
}
