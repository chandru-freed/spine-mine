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

export default class DCPCFEMISavingsPercentageFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  parent: any;
  constructor({ parent }: { parent: any }) {
    super({ myRefName: "dcpCFSavingsPercentageRef" });
    this.parent = parent;
    this.addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "existingTotalEMI",
        label: "Existing Total EMI",
        boundaryClass: "col-4",
        mandatory: true,
      })
    )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "emiSavings",
          label: "EMI Savings",
          boundaryClass: "col-4",
          mandatory: true,
          readonly: true,
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "percentageReduction",
          label: "Percentage Reduction from Current(%)",
          boundaryClass: "col-4",
          mandatory: true,
          readonly: true,
        })
      );
  }

  getMyRef() {
    return this.parent.$refs[this.myRefName];
  }
}
