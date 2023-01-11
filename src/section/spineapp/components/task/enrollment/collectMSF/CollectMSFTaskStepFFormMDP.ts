import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import Task from "@/section/spineapp/util/Task";
import * as Data from "@/../src-gen/data";

export default class CollectMSFTaskStepFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      myRefName: "receiveMSFPaymentFFormRef",
      disabled: taskRoot.taskDisabled,
      readonly: true,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;


    this.addField(
      new FSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskOutput.firstMSFPaymentDetails.paymentProvider",
        label: "Payment Provider",
        boundaryClass: "col-4",
        returnObject: true,
        options: Data.ClientFile.PAYMENT_PROVIDER.list(),
        optionLabel: "name",
        optionValue: "id",
      })
    )
    // .addField(
    //   new FCurrencyFieldMDP({
    //     parentMDP: this.childMDP,
    //     dataSelectorKey: "taskOutput.firstMSFPaymentDetails.feeAmount",
    //     label: "Fee Amount",
    //     boundaryClass: "col-3",
    //   })
    // )
    .addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskOutput.firstMSFPaymentDetails.msfAmount",
        label: "MSF Amount",
        boundaryClass: "col-4",
      })
    )
    // .addField(
    //   new FCurrencyFieldMDP({
    //     parentMDP: this.childMDP,
    //     dataSelectorKey: "taskOutput.firstMSFPaymentDetails.totalAmount",
    //     label: "Total Amount",
    //     boundaryClass: "col-3",
    //   })
    // )      
    .addField(
      new FSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskOutput.firstMSFPaymentDetails.status",
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
    ).addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey:
          "taskOutput.firstMSFPaymentDetails.remoteTxnRefDetails.paymentLink",
        label: "Remote Payment Link",
        boundaryClass: "col-12",
      })
    )
    .addAction(
        new FBtnMDP({
          label: "Receive MSF Payment",
          onClick: this.receiveMSFPayment(),
          disabled: this.taskRoot.taskFormData.taskOutput.firstMSFPaymentDetails.status  === 'SETTLED'
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Check Payment Status",
          onClick: this.checkPaymentStatus(),
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Mark Complete",
          onClick: this.saveAndMarkCompleteTask(),
          btnType: BtnType.FILLED,
          condition: Task.isMarkCompleteEnabled(this.taskRoot.taskDetails)
        })
      );
  }

  getMyRef(): any {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }

  receiveMSFPayment() {
    return () => {
      this.taskRoot.receiveMSFPayment();
    };
  }

  checkPaymentStatus() {
    return () => {
      this.taskRoot.checkPaymentStatus();
    };
  }

  saveAndMarkCompleteTask() {
    return () => {
      this.taskRoot.saveAndMarkCompleteTask();
    };
  }
}
