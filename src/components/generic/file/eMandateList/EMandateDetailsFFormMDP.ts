import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import AddressFMiniFormMDP from "@/components/generic/form/field/AddressFMiniFormMDP";
import FDateFieldMDP from "@/components/generic/form/field/FDateFieldMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FAccountFieldMDP from "@/components/generic/form/field/FAccountFieldMDP";
import FNupayBankSelectFieldMDP from "@/components/generic/form/field/FNupayBankSelectFieldMDP";
import * as Data from "@/../src-gen/data";

export default class EMandateDetailsFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  parent: any;
  constructor({ parent }: { parent: any }) {
    super({
      myRefName: "eMandateFormRef",
      readonly: true,
    });
    this.parent = parent;

    this
    .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "label",
          label: "Bank",
          mandatory: true,
          boundaryClass: "col-4",
        })
      )
    .addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "remoteEMandateId",
        label: "Nupay Cust Id",
        mandatory: true,
        boundaryClass: "col-4",
      })
    )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "status.name",
          label: "Status",
          mandatory: true,
          boundaryClass: "col-4",
          
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "amount",
          label: "Amount",
          boundaryClass: "col-4",
          mandatory: true,
        })
      )
      .addField(
        new FAccountFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "accountNumber",
          label: "Account Number",
          boundaryClass: "col-4",
          mandatory: true,
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "selfEnrolEMandateLink",
          label: "EMandate Link",
          mandatory: true,
          boundaryClass: "col-4",
          
        })
      )  .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "umrn",
          label: "UMRN",
          mandatory: true,
          boundaryClass: "col-4",
          condition: this.parent.isActive()
        })
      )  .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "npciRefNumber",
          label: "NPCI Ref Number",
          mandatory: true,
          boundaryClass: "col-4",
          condition: this.parent.isActive()
          
        })
      )
      
      .addAction(
        new FBtnMDP({
          label: "Close",
          onClick: this.handleCloseClick(),
          btnType: BtnType.TEXT
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Check Emandate Status",
          onClick: this.checkAndUpdateEMandate(),
        })
      );
      
  }
  

  getMyRef(): any {
    return this.parent.$refs[this.myRefName];
  }

  handleCloseClick() {
    return () => {
      this.parent.showViewEMandateForm = false;
    }
  }
  checkAndUpdateEMandate() {
    return () => {
        this.parent.checkAndUpdateEMandate();
    };
  }
}
