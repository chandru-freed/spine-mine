import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";

export default class RecordPaymentFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  constructor({ taskRoot }: { taskRoot: any; }) {
    super({
      myRefName: "recordPaymentFFormRef",
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
    ).addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "remoteTxnRefNumber",
        label: "Remote Txn RefNumber",
        mandatory: true,
        boundaryClass: "col-4",
      })
    ).addField(
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
    ).addField(
      new FSelectDateFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "presentedDate",
        label: "Presented Date",
        boundaryClass: "col-4",
        mandatory: true,
        pastDaysDisabled: true,
        futureDaysDisabled: false,
      })
    ).addField(
      new FSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "paymentStatus",
        label: "Payment Status",
        boundaryClass: "col-4",
        mandatory: true,
        returnObject: true,
        options: [
          { id: "PRESENTED", name: "PRESENTED" },
          { id: "FUND_SPLIT_REJECTED", name: "FUND SPLIT REJECTED" },
          { id: "FUND_SPLIT_SETTLED", name: "FUND SPLIT SETTLED" },
        ],
        optionLabel: "name",
        optionValue: "id",
      })
    ).addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "totalAmount",
        label: "Total Amount",
        boundaryClass: "col-4",
        mandatory: true,
        disabled: true
      })
    ).addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "spaAmount",
        label: "SPA Amount",
        boundaryClass: "col-4",
        mandatory: true,
      })
    ).addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "feeAmount",
        label: "Fee Amount",
        boundaryClass: "col-4",
        mandatory: true,
      })
    ).addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "msfAmount",
        label: "MSF Amount",
        boundaryClass: "col-4",
        mandatory: true,
      })
    ).addAction(
      new FBtnMDP({
        label: "Cancel",
        onClick: this.gotoClientFile(),
        btnType: BtnType.TEXT,
      })
    ).addAction(
      new FBtnMDP({
        label: "Record Settled Payment",
        onClick: this.validateAndSubmit(),
      })
    );
  }

  validateAndSubmit() {
    return () => {
      this.getMyRef().submitForm(this.recordSettledPayment());
    };
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }
  recordSettledPayment() {
    return () => {
      this.taskRoot.recordSettledPayment();
    };
  }

  gotoClientFile() {
    return () => {
      this.taskRoot.gotoClientFile();
    }
  }


}
