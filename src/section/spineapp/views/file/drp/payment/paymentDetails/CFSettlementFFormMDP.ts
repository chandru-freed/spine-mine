import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FAccountFieldMDP from "@/components/generic/form/field/FAccountFieldMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import * as Data from "@/../src-gen/data";
import FEMandateSelectFieldMDP from "@/components/generic/form/field/FEMandateSelectFieldMDP";

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
        options: Data.ClientFile.PAYMENT_PROVIDER.list(),
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
            // { id: "UPI", name: "UPI" },
            // { id: "NET_BANKING", name: "NET BANKING" },
            //{ id: "ENACH", name: "ENACH" },
            // { id: "CREDIT_CARD", name: "CREDIT CARD" },
            // { id: "DEBIT_CARD", name: "DEBIT CARD" },
            { id: "NEFT", name: "NEFT" },
            { id: "IMPS", name: "IMPS" },
          ],
          optionLabel: "name",
          optionValue: "id",
        })
      )
      .addField(
        new FEMandateSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "eMandateId",
          label: "EMandate Id",
          boundaryClass: "col-4",
          mandatory: true,
          returnObject: true
        })
      )
      .addField(
        new FAccountFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "accountNumber",
          label: "Account Number",
          mandatory: true,
          boundaryClass: "col-3",
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "accountHolderName",
          label: "Account Holder Name",
          mandatory: true,
          boundaryClass: "col-3",
        })
      )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "accountType",
          label: "Account Type",
          boundaryClass: "col-3",
          mandatory: true,
          options: [
            { id: "SAVINGS", name: "SAVINGS" },
            { id: "CURRENT", name: "CURRENT" },
          ],
          optionLabel: "name",
          optionValue: "id",
          returnObject: true,
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "ifscCode",
          label: "IFSC Code",
          mandatory: true,
          boundaryClass: "col-3",
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
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "totalAmount",
          label: "Total Amount",
          boundaryClass: "col-4",
          disabled: true,
          mandatory: true,
        })
      )
      
      // .addAction(
      //   new FBtnMDP({
      //     label: "Draft Payment",
      //     onClick: this.validateAndSubmit(),
      //   })
      // );
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
