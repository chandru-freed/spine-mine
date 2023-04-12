import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";

/*
paymentProvider
paymentMode  - drop down
eMandateId? if(paymentMode == ENACH)
totalAmount
spaAmount
feeAmount
msfAmount
*/
export default class FMsfPaymentDetailsFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "cfCollectionFeeFFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;

    this.addField(
      new FSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "paymentProvider",
        label: "Payment Provider",
        boundaryClass: "col-12",
        mandatory: true,
        returnObject: true,
        options: [
          { id: "NUPAY", name: "NUPAY" },
          { id: "CASHFREE", name: "CASHFREE",},
        ],
        optionLabel: "name",
        optionValue: "id",
        disabled: true
      })
    )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "feeAmount",
          label: "Fee Amount",
          boundaryClass: "col-4",
          mandatory: true,
          disabled: true
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "msfAmount",
          label: "MSF Amount",
          boundaryClass: "col-4",
          mandatory: true,
          disabled: true
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
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "remoteTxnRefNumber",
          label: "Remote Txn Ref Number",
          boundaryClass: "col-6",
          disabled: true,
          mandatory: true,
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "selfEnrolPaymentLink",
          label: "Payment Link",
          boundaryClass: "col-6",
          disabled: true,
          mandatory: true,
          condition: this.taskRoot.isRemoteTxnRefDetailsAvailable() 
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
