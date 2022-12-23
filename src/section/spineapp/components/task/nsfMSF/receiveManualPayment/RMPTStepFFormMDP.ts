import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FSwitchMDP from "@/components/generic/form/field/FSwitchMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import Task from "@/section/spineapp/util/Task";
import FlowTaskIntf from "@/section/spineapp/util/task_intf/FlowTaskIntf";
import * as Data from "@/../src-gen/data";

export default class RMPTStepFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      myRefName: "receiveManualPaymentFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this
    // .addField(
    //   new FTextFieldMDP({
    //     parentMDP: this.childMDP,
    //     dataSelectorKey: "taskInput.amountToBeReceived",
    //     label: "Amount To Be Received",
    //     mandatory: true,
    //     boundaryClass: "col-6",
    //     disabled: true,
    //   })
    // )
    //   .addField(
    //     new FTextFieldMDP({
    //       parentMDP: this.childMDP,
    //       dataSelectorKey: "taskInput.upiId",
    //       label: "UPI Id",
    //       mandatory: true,
    //       boundaryClass: "col-6",
    //       disabled: true,
    //     })
    //   )
    //   .addField(
    //     new FTextFieldMDP({
    //       parentMDP: this.childMDP,
    //       dataSelectorKey: "taskInput.intent",
    //       label: "Intent",
    //       mandatory: true,
    //       boundaryClass: "col-6",
    //       disabled: true,
    //     })
    //   )
    //   .addField(
    //     new FSwitchMDP({
    //       parentMDP: this.childMDP,
    //       dataSelectorKey: "taskOutput.paymentSuccessfull",
    //       label: "Payment Successfull",
    //       mandatory: true,
    //       disabled: true,
    //     })
    //   )
    //   .addField(
    //     new FTextFieldMDP({
    //       parentMDP: this.childMDP,
    //       dataSelectorKey: "taskOutput.failureCode",
    //       label: "Failure Code",
    //       mandatory: true,
    //       boundaryClass: "col-6",
    //       disabled: true,
    //       condition: !this.taskRoot.taskFormData.taskOutput.paymentSuccessfull,
    //     })
    //   )
    //   .addField(
    //     new FTextareaMDP({
    //       parentMDP: this.childMDP,
    //       dataSelectorKey: "taskOutput.failureReason",
    //       label: "Failure Reason",
    //       mandatory: true,
    //       boundaryClass: "col-6",
    //       disabled: true,
    //       condition: !this.taskRoot.taskFormData.taskOutput.paymentSuccessfull,
    //     })
    //   )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.msfPaymentDetails.paymentProvider",
          label: "Payment Provider",
          boundaryClass: "col-4",
          returnObject: true,
          disabled: true,
          options: Data.ClientFile.PAYMENT_PROVIDER.list(),
          optionLabel: "name",
          optionValue: "id",
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.msfPaymentDetails.msfAmount",
          label: "MSF Amount",
          boundaryClass: "col-4",
          disabled: true,
        })
      )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.msfPaymentDetails.status",
          label: "Payment Status",
          boundaryClass: "col-4",
          returnObject: true,
          disabled: true,
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
          disabled: true,
          dataSelectorKey:
            "taskOutput.msfPaymentDetails.remoteTxnRefDetails.paymentLink",
          label: "Remote Payment Link",
          boundaryClass: "col-12",
          condition: !!this.taskRoot.taskFormData.taskOutput.msfPaymentDetails.remoteTxnRefDetails
        })
      ).addAction(
        new FBtnMDP({
          label: "Receive MSF Payment",
          onClick: this.receiveMSFPayment(),
          disabled: this.taskRoot.taskFormData.taskOutput.msfPaymentDetails.status  === 'SETTLED'
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

  validateAndSubmit() {
    return () => {
      this.getMyRef().submitForm(this.rescueTask());
    };
  }

  rescueTask() {
    return () => {
      this.taskRoot.rescueTask();
    };
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
