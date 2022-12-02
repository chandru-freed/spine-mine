import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import DispositionFMiniFormMDP, {
  DispositionType,
} from "@/components/generic/form/field/DispositionFMiniFormMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";

export default class NMSFTFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  selectedOption: string;
  constructor({ taskRoot, parent }: { taskRoot: ManualTaskIntf; parent: any }) {
    super({
      myRefName: "nMSFTFormRef",
      disabled: taskRoot.taskDisabled,
      colWidth: 12,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;
    this.addField(
      new FSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskOutput.selectedNMSFTaskOption",
        label: "Select Option",
        options: Object.values(NsfMSFOptions),
        mandatory: true,
      })
    )
      .addField(
        new FNumberFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.clientDeferredTime",
          label: "Client Deferred Time",
          condition: this.isClientDeffered(),
          mandatory: true,
        })
      )
      .addField(
        new FNumberFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.systemDeferredTime",
          label: "System Deferred Time",
          condition: this.isSystemDeffered(),
        })
      )
      // .addField(
      //   new FTextFieldMDP({
      //     parentMDP: this.childMDP,
      //     dataSelectorKey: "taskOutput.manualPayment",
      //     label: "Manual Payment",
      //     boundaryClass: "col-4",
      //     disabled: this.isDisabled(NsfMSFOptions.ReceivePayment)
      //   })
      // )

      .addField(
        new FNumberFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.amountToBeReceived",
          label: "Amount To Be Received",
          condition: this.isReceivePayment(),
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.upiId",
          label: "UPI Id",
          condition: this.isReceivePayment(),
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.intent",
          label: "Intent",
          condition: this.isReceivePayment(),
        })
      )
      .addField(
        new FSelectDateFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.msfScheduledDraftDate",
          label: "Msf Scheduled Draft Date",
          mandatory: true,
          pastDaysDisabled: true,
          condition: this.isDraftRescheduled(),
        })
      )
      .addField(
        new DispositionFMiniFormMDP({
          taskRoot,
          parent,
          dataSelectorKey: "taskOutput.disposition",
          condition: this.isSystemDeffered(),
          dispositionTypeList: [
            new DispositionType({
              label: "Not Answered",
              value: "NotAnswered",
            }),
          ],
        })
      )
      .addField(
        new DispositionFMiniFormMDP({
          taskRoot,
          parent,
          dataSelectorKey: "taskOutput.disposition",
          condition: this.isClientDeffered(),
          dispositionTypeList: [
            new DispositionType({
              label: "Client Busy",
              value: "ClientBusy",
            }),
            new DispositionType({
              label: "No Enough Funds",
              value: "NoEnoughFunds",
            }),
          ],
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Rescue",
          onClick: this.rescueTask(),
          condition: this.isException(),
        })
      );
  }

  getSelectedOption() {
    return () => {
      this.selectedOption =
        this.taskRoot.taskFormData.taskOutput.selectedNMSFTaskOption;
    };
  }

  getMyRef(): any {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }

  // new implement
  validateAndSubmit() {
    return (successCallBack: any) => {
      this.getMyRef().submitForm(() => {
        this.saveTask(() => successCallBack());
      });
    };
  }

  saveTask(successCallBack: any) {
    this.taskRoot.saveTask(() => successCallBack());
  }

  rescueTask() {
    return () => {
      this.taskRoot.rescueTask();
    };
  }

  isClientDeffered(): boolean {
    return (
      this.taskRoot.selectedNMSFTaskOption() === NsfMSFOptions.ClientDeferred
    );
  }

  isSystemDeffered(): boolean {
    return (
      this.taskRoot.selectedNMSFTaskOption() === NsfMSFOptions.SystemDeferred
    );
  }

  isReceivePayment(): boolean {
    return (
      this.taskRoot.selectedNMSFTaskOption() === NsfMSFOptions.ReceivePayment
    );
  }
  isDraftRescheduled(): boolean {
    return (
      this.taskRoot.selectedNMSFTaskOption() === NsfMSFOptions.DraftRescheduled
    );
  }

  isStarted() {
    return (
      this.taskRoot.taskDetails.taskState === "STARTED" ||
      this.taskRoot.taskDetails.taskState === "PARTIALLY_COMPLETED"
    );
  }

  isException() {
    return (
      this.taskRoot.taskDetails.taskState === "EXCEPTION_Q" ||
      this.taskRoot.taskDetails.taskState === "EXIT_Q"
    );
  }
}

export enum NsfMSFOptions {
  ClientDeferred = "Call Back Requested",
  SystemDeferred = "Follow Up Required",
  ReceivePayment = "Receive Payment",
  DraftRescheduled = "Draft Rescheduled",
}
