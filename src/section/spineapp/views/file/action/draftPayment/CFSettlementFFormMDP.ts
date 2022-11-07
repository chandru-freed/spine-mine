import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FAccountFieldMDP from "@/components/generic/form/field/FAccountFieldMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";
import FIFSCCodeFieldMDP from "@/components/generic/form/field/FIFSCCodeFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";

/* 
paymentProvider - NUPAY default 
paymentMode  - drop down
accountNumber
accountHolderName
accountType
ifscCode
eMandateId
totalAmount
spaAmount
feeAmount
msfAmount? = 0 set
*/
export default class CFSettlementFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "cfSettlementFFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;

    this.addField(
      new FSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "paymentProvider",
        label: "Payment Provider",
        boundaryClass: "col-4",
        mandatory: true,
        returnObject: true,
        options: [
          { id: "NUPAY", name: "NUPAY" },
          { id: "ESCROWPAY", name: "ESCROWPAY" },
          { id: "CASHFREE", name: "CASHFREE" },
        ],
        optionLabel: "name",
        optionValue: "id",
        disabled: true,
      })
    )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "paymentMode",
          label: "Payment Mode",
          boundaryClass: "col-4",
          mandatory: true,
          returnObject: true,
          options: [
            { id: "UPI", name: "UPI" },
            { id: "NET_BANKING", name: "NET BANKING" },
            { id: "ENACH", name: "ENACH" },
            { id: "CREDIT_CARD", name: "CREDIT CARD" },
            { id: "DEBIT_CARD", name: "DEBIT CARD" },
          ],
          optionLabel: "name",
          optionValue: "id",
        })
      )
      .addField(
        new FAccountFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "accountNumber",
          label: "Account Number",
          mandatory: true,
          boundaryClass: "col-4",
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "accountHolderName",
          label: "Account Holder Name",
          mandatory: true,
          boundaryClass: "col-4",
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
            { id: "SAVINGS", name: "SAVINGS" },
            { id: "CURRENT", name: "CURRENT" },
          ],
          optionLabel: "name",
          optionValue: "id",
          returnObject: true
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "ifscCode",
          label: "IFSC Code",
          mandatory: true,
          boundaryClass: "col-4",
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "totalAmount",
          label: "Total Amount",
          boundaryClass: "col-4",
          mandatory: true,
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "spaAmount",
          label: "SPA Amount",
          boundaryClass: "col-4",
          mandatory: true,
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "feeAmount",
          label: "Fee Amount",
          boundaryClass: "col-4",
          mandatory: true,
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "eMandateId",
          label: "EMandate Id",
          mandatory: true,
          boundaryClass: "col-4",
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Draft Payment",
          onClick: this.validateAndSubmit(),
        })
      );
  }

  validateAndSubmit() {
    return () => {
      this.getMyRef().submitForm(this.taskRoot.draftPayment());
    };
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }
}
