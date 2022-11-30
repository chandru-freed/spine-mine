import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import DispositionFMiniFormMDP, {
  DispositionType,
} from "@/components/generic/form/field/DispositionFMiniFormMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";

export default class NSPATFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  selectedOption: string;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      myRefName: "nSPATFormRef",
      disabled: taskRoot.taskDisabled,
      colWidth: 12,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;
    this.addField(
      new FSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskOutput.selectedNSPATaskOption",
        label: "Select Option",
        options: Object.values(NsfSPAOptions),
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
          dataSelectorKey: "taskOutput.spaScheduledDraftDate",
          label: "NsfSPA Scheduled Draft Date",
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
      );
    // .addAction(
    //   new FBtnMDP({
    //     label: "Save",
    //     onClick: this.validateAndSubmit(),
    //   })
    // );
  }

  getSelectedOption() {
    return () => {
      this.selectedOption =
        this.taskRoot.taskFormData.taskOutput.selectedNSPATaskOption;
    };
  }

  getMyRef(): any {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }

  // validateAndSubmit() {
  //   return () => {
  //     this.getMyRef().submitForm(this.saveTask());
  //   };
  // }

  // saveTask() {
  //   return () => {
  //     this.taskRoot.saveTask();
  //   };
  // }

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

  isClientDeffered(): boolean {
    return (
      this.taskRoot.selectedNSPATaskOption() === NsfSPAOptions.ClientDeferred
    );
  }

  isSystemDeffered(): boolean {
    return (
      this.taskRoot.selectedNSPATaskOption() === NsfSPAOptions.SystemDeferred
    );
  }

  isReceivePayment(): boolean {
    return (
      this.taskRoot.selectedNSPATaskOption() === NsfSPAOptions.ReceivePayment
    );
  }
  isDraftRescheduled(): boolean {
    return (
      this.taskRoot.selectedNSPATaskOption() === NsfSPAOptions.DraftRescheduled
    );
  }
}

export enum NsfSPAOptions {
  ClientDeferred = "Call Back Requested",
  SystemDeferred = "Follow Up Required",
  ReceivePayment = "Receive Payment",
  DraftRescheduled = "Draft Rescheduled",
}
