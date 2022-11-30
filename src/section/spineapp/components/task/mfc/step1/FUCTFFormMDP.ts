import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import DispositionFMiniFormMDP, {
  DispositionType,
} from "@/components/generic/form/field/DispositionFMiniFormMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FMiniFormMDP from "@/components/generic/form/field/FMiniFormMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";

export default class FUCTFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  selectedOption: string;
  constructor({ taskRoot, parent }: { taskRoot: ManualTaskIntf; parent: any }) {
    super({
      myRefName: "fUCTFFormRef",
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
        options: Object.values(MFCFOptions),
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
          futureDaysDisabled: true,
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
          label: "Save",
          onClick: this.validateAndSubmit(),
          condition: this.isStarted(),
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

  validateAndSubmit() {
    return () => {
      this.getMyRef().submitForm(this.saveTask());
    };
  }

  saveTask() {
    return () => {
      this.taskRoot.saveTask();
    };
  }

  rescueTask() {
    return () => {
      this.taskRoot.rescueTask();
    };
  }

  isClientDeffered(): boolean {
    return (
      this.taskRoot.selectedNMSFTaskOption() === MFCFOptions.ClientDeferred
    );
  }

  isSystemDeffered(): boolean {
    return (
      this.taskRoot.selectedNMSFTaskOption() === MFCFOptions.SystemDeferred
    );
  }

  isReceivePayment(): boolean {
    return (
      this.taskRoot.selectedNMSFTaskOption() === MFCFOptions.ReceivePayment
    );
  }
  isDraftRescheduled(): boolean {
    return (
      this.taskRoot.selectedNMSFTaskOption() === MFCFOptions.DraftRescheduled
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

export enum MFCFOptions {
  ClientDeferred = "Call Back Requested",
  SystemDeferred = "Follow Up Required",
  ReceivePayment = "Receive Payment",
  DraftRescheduled = "Draft Rescheduled",
}
