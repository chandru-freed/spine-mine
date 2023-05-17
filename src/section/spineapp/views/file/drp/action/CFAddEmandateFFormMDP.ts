import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FClientLanguageSelectFieldMDP from "@/components/generic/form/field/FClientLanguageSelectFieldMDP";
import FPasswordFieldMDP from "@/components/generic/form/field/FPasswordFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import * as Data from '@/../src-gen/data';
import FBtnMDP from "@/components/generic/FBtnMDP";
import FPhoneFieldMDP from "@/components/generic/form/field/FPhoneFieldMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from '@/../src-gen/action';
import FSnackbar from "@/fsnackbar";
import FAccountFieldMDP from "@/components/generic/form/field/FAccountFieldMDP";
import FIFSCCodeFieldMDP from "@/components/generic/form/field/FIFSCCodeFieldMDP";
import AddressFMiniFormMDP from "@/components/generic/form/field/AddressFMiniFormMDP";
import FNupayBankSelectFieldMDP from "@/components/generic/form/field/FNupayBankSelectFieldMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FDateFieldMDP from "@/components/generic/form/field/FDateFieldMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";

export default class CFAddEmandateFFormMDP extends FFormMDP {

  childMDP = new FFormChildMDP();
  parent: any;

  constructor({ parent }: { parent: any }) {
    super({
      myRefName: "cfAddEmandateFFormRef",
    });
    this.parent = parent;

    this.addField(
      new FSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "eMandateProvider",
        label: "EMandate Provider",
        mandatory: true,
        boundaryClass: "col-6",
        options: Data.ClientFile.EMANDATE_PROVIDER.list(),
        optionLabel: "name",
        optionValue: 'id'
      })
    ).addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "remoteEMandateId",
        label: "Remote EMandate Id",
        boundaryClass: "col-6",
      })
    )
    .addField(
      new FAccountFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "accountNumber",
        label: "Account Number",
        boundaryClass: "col-6",
      })
    )

    .addField(
      new FIFSCCodeFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "ifscCode",
        label: "IFSC",
        boundaryClass: "col-6",
        onSelect: (details) => {
          this.populateBankDetails(details);
        },
      })
    )
    .addField(
      new FSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "accountType",
        label: "Account Type",
        boundaryClass: "col-4",
        mandatory: true,
        options: [
          { id: "SAVINGS", name: "Savings" },
          { id: "CURRENT", name: "Current" },
        ],
        optionLabel: "name",
        optionValue: "id",
      })
    ).addField(new FTextFieldMDP({
      label:"Account Holder Name",
      dataSelectorKey:"accountHolderName",
      parentMDP: this.childMDP,
      boundaryClass: "col-4",
      mandatory: true
    })).addField(
      new AddressFMiniFormMDP({
        taskRoot: this.parent,
        parent: this,
        dataSelectorKey: "bankAddress",
        disabled: false,
        label: "Bank Address",
      })
    )  .addField(
      new FNupayBankSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "nupayBankMasterId",
        label: "Bank Name",
        boundaryClass: "col-4",
        mandatory: true,
      })
    ) .addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "amount",
        label: "Amount",
        boundaryClass: "col-4",
        mandatory: true,
      })
    ).addField(new FSelectDateFieldMDP({
      parentMDP: this.childMDP,
      dataSelectorKey:"draftDate",
      label: "Draft Date",
      boundaryClass: "col-4",
      mandatory: true
    })).addField(new FTextFieldMDP({
      label:"EMandate Link",
      dataSelectorKey:"eMandateLink",
      parentMDP: this.childMDP,
      boundaryClass: "col-6",
      mandatory: true
    })).addField(new FTextFieldMDP({
      label:"UMRN",
      dataSelectorKey:"umrn",
      boundaryClass: "col-6",
      parentMDP: this.childMDP
    })).addField(new FSelectFieldMDP({
      label:"EMandate Status",
      dataSelectorKey:"status",
      parentMDP: this.childMDP,
      options: Data.ClientFile.EMANDATE_STATUS.list(),
      boundaryClass: "col-6",
      optionLabel: "name",
      optionValue: "id",
      mandatory: true
    })).addField(new FTextFieldMDP({
      label:"Npci_ref",
      dataSelectorKey:"npci_ref",
      parentMDP: this.childMDP,
      boundaryClass: "col-6",
    }))
    .addField(new FTextareaMDP({
      label:"Reason Desc",
      dataSelectorKey:"reason_desc",
      parentMDP: this.childMDP,
      boundaryClass: "col-6",
    })).addField(new FTextFieldMDP({
      label:"Reason Code",
      dataSelectorKey:"reason_code",
      parentMDP: this.childMDP,
      boundaryClass: "col-6",
    })).addField(new FTextFieldMDP({
      label:"Reject By",
      dataSelectorKey:"reject_by",
      parentMDP: this.childMDP,
      boundaryClass: "col-6",
    }))

    
    
    .addAction(new FBtnMDP({
      label: "Record EMandate",
      onClick: this.recordEMandate()
    }))
  }
  getMyRef(): any {
    return this.parent.$refs[this.myRefName];
  }


  populateBankDetails(details: any) {
    this.parent.populateBankDetails(details);
  }


  recordEMandate() {
    return () => {
      this.getMyRef().submitForm(() => {
        this.parent.addEmandateInput.clientFileId = this.parent.clientFileId;
        Action.ClientFile.AddEMandate.execute(this.parent.addEmandateInput, (output) => {
          this.parent.gotoCFEMandate();
          FSnackbar.success("Successfully recorded the E Mandate");
        });
      })
    }
  }

}