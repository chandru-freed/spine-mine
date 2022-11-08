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
export default class CFCollectionFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "cfCollectionFFormRef",
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
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "msfAmount",
          label: "MSF Amount",
          boundaryClass: "col-4",
          mandatory: true,
        })
      ).addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "status.name",
          label: "Payment Status",
          boundaryClass: "col-4",
          returnObject: true,
          options: [
            { id: "DRAFT", name: "DRAFT" },
            { id: "NOT_REACHABLE", name: "NOT REACHABLE" },
            { id: "FAILED", name: "FAILED" },
            { id: "PRESENTED", name: "PRESENTED" },
            { id: "RECEIVED", name: "RECEIVED" },
            { id: "REJECTED", name: "REJECTED" },
            { id: "FUND_SPLIT_REQUESTED", name: "FUND SPLIT REQUESTED" },
            { id: "FUND_SPLIT_REJECTED", name: "FUND SPLIT REJECTED" },
            { id: "SETTLED", name: "SETTLED" },
          ],
          optionLabel: "name",
          optionValue: "id",
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
      // .addAction(
      //   new FBtnMDP({
      //     label: "Present Payment",
      //     onClick: this.validateAndSubmit(),
      //   })
      // );
  }

  validateAndSubmit() {
    return () => {
      this.getMyRef().submitForm(this.taskRoot.presentPayment());
    };
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }
}
