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

export default class DCPCFCalculatorFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  parent: any;
  constructor({ parent }: { parent: any }) {
    super({ myRefName: "dcpCFCalculatorRef" });
    this.parent = parent;
    this
    // .addField(
    //   new FCurrencyFieldMDP({
    //     parentMDP: this.childMDP,
    //     dataSelectorKey: "existingTotalEMI",
    //     label: "Existing Total EMI",
    //     boundaryClass: "col-6",
    //     mandatory: true,
    //   })
    // )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "loanAmount",
          label: "Loan Amount",
          boundaryClass: "col-4",
          mandatory: true,
        })
      )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "tenure",
          label: "Tenure",
          mandatory: true,
          boundaryClass: "col-4",
          options: this.parent.tenureList,
        })
      )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "roi",
          label: "Rate of interest (per annum)",
          mandatory: true,
          boundaryClass: "col-4",
          options: this.parent.roiList,
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Calculate Loan EMI ",
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
        this.parent.calculateFlatRateMonthly();
      });
    };
  }
}
