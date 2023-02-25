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

export default class InitiateEMandateFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  parent: any;
  constructor({ parent }: { parent: any }) {
    super({
      myRefName: "eMandateFormRef",
    });
    this.parent = parent;

    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "clientBankInfo.accountHolderName",
        label: "Account Holder Name",
        mandatory: true,
        boundaryClass: "col-4",
      })
    )
      .addField(
        new FAccountFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "clientBankInfo.accountNumber",
          label: "Account Number",
          mandatory: true,
          boundaryClass: "col-4",
        })
      )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "clientBankInfo.accountType",
          label: "Account Type",
          boundaryClass: "col-4",
          mandatory: true,
          options: Data.ClientFile.ACCOUNT_TYPE.list(),
          optionLabel: "name",
          optionValue: "id",
          returnObject: true
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "collectionAmount",
          label: "Collection Amount",
          boundaryClass: "col-4",
          mandatory: true,
        })
      )
      .addField(
        new FNupayBankSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "clientBankInfo.nupayBankId",
          label: "Bank Name",
          boundaryClass: "col-4",
          mandatory: true,
          optionValue: "nupayBankId"
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "clientBankInfo.ifscCode",
          label: "IFSC Code",
          mandatory: true,
          boundaryClass: "col-4",
          
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Cancel",
          onClick: this.handleCancelClick(),
          btnType: BtnType.TEXT
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Initiate EMandate",
          onClick: this.validateAndSubmit(),
          disabled: this.parent.isAgreementNotSigned()
        })
      );
      
  }
  

  getMyRef(): any {
    return this.parent.$refs[this.myRefName];
  }

  handleCancelClick() {
    return () => {
      this.parent.showInitiateForm = false;
    }
  }
  validateAndSubmit() {
    return () => {
      this.getMyRef().submitForm(this.initiateEMandate());
    };
  }

  initiateEMandate() {
    return () => {
      this.parent.initiateEMandate();
    };
  }

  populateBankDetails(details: any) {
    this.parent.populateBankDetails(details);
  }
}
