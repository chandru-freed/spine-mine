import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";

import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FCFAWSUploadFileFieldMDP from "@/components/generic/form/field/FCFAWSUploadFileFieldMDP";
import FFileFieldMDP from "@/components/generic/form/field/FFileFieldMDP";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";

export default class DCPAgreementDetailsFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  parent: any;
  constructor({ parent }: { parent: any }) {
    super({ myRefName: "DCPAgreementDetailsRef", readonly: true });
    this.parent = parent;
    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "dcpClientName",
        label: "Client Name",
        boundaryClass: "col-3",
        mandatory: true,
      })
    )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "agreementStatus.name",
          label: "Agreement Status",
          boundaryClass: "col-3",
          mandatory: true,
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "dcpPlatformFee",
          label: "Fee Amount",
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
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "newMontlhyEmi",
          label: "New Montlhy Emi",
          boundaryClass: "col-3",
          mandatory: true,
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "tenure",
          label: "Tenure",
          boundaryClass: "col-3",
          mandatory: true,
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "roi",
          label: "Rate of interest",
          boundaryClass: "col-3",
          mandatory: true,
        })
      );

    // .addAction(
    //   new FBtnMDP({
    //     label: "Cancel",
    //     onClick: () => {
    //       this.parent.resetDCPAgreementForm();
    //     },
    //     btnType: BtnType.TEXT,
    //   })
    // );
  }

  getMyRef() {
    return this.parent.$refs[this.myRefName];
  }
}
