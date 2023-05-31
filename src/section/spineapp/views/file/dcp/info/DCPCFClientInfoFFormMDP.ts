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

export default class DCPCFClientInfoFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  parent: any;
  constructor({ parent }: { parent: any }) {
    super({ myRefName: "DCPCFClientInfoRef", readonly: true });
    this.parent = parent;
    this.addField(
      new FNumberFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "loanNumber",
        label: "Loan Number",
        boundaryClass: "col-6",
        mandatory: true,
      })
    )
      .addField(
        new FNumberFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "tenure",
          label: "Tenure",
          boundaryClass: "col-6",
          mandatory: true,
          readonly: true,
        })
      )
      .addField(
        new FNumberFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "roi",
          label: "ROI",
          boundaryClass: "col-6",
          mandatory: true,
        })
      )
      .addField(
        new FNumberFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "newMontlhyEmi",
          label: "Emi",
          boundaryClass: "col-6",
          mandatory: true,
        })
      );
  }
}
