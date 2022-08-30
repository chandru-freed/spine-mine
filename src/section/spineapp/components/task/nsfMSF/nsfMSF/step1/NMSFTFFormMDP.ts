import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import DispositionFMiniFormMDP, { DispositionType } from "@/components/generic/form/field/DispositionFMiniFormMDP";
import FMiniFormMDP from "@/components/generic/form/field/FMiniFormMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FSelectFooFieldMDP from "@/components/generic/form/field/FSelectFooFieldMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import { GenericTaskIntf } from "@/section/spineapp/util/GenericTaskIntf";


export default class NMSFTFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  selectedOption: string;
  constructor({
    taskRoot,
    parent,
  }: {
    taskRoot: GenericTaskIntf;
    parent: any;
  }) {
    super({
      myRefName: "nMSFTFormRef",
      disabled: taskRoot.taskDisabled,
      colWidth: 12
    });
    this.taskRoot = taskRoot;
    this.parent = parent;
    this.addField(
      new FSelectFooFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskOutput.selectedNMSFTaskOption",
        label: "Select Option",
        items: Object.values(NsfMSFOptions),
        mandatory: true
      })
    )
      .addField(
        new FNumberFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.clientDeferredTime",
          label: "Client Deferred Time",
          condition: this.isClientDeffered(),
          mandatory: true
        })
      )
      .addField(
        new FNumberFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.systemDeferredTime",
          label: "System Deferred Time",
          condition: this.isSystemDeffered()
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
          condition: this.isReceivePayment()
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.upiId",
          label: "UPI Id",
          condition: this.isReceivePayment()
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.intent",
          label: "Intent",
          condition: this.isReceivePayment()
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.msfScheduledDraftDate",
          label: "Msf Scheduled Draft Date",
          condition: this.isDraftRescheduled()
        })
      ).addField(new DispositionFMiniFormMDP({
        taskRoot,
        parent,
        dataSelectorKey: "taskOutput.disposition",
        condition: this.isSystemDeffered(),
        dispositionTypeList: [
          new DispositionType({
            label: "Not Answered",
            value: "NotAnswered"
          }),
        ]
      }))
      .addField(new DispositionFMiniFormMDP({
        taskRoot,
        parent,
        dataSelectorKey: "taskOutput.disposition",
        condition: this.isClientDeffered(),
        dispositionTypeList: [
          new DispositionType({
            label: "Client Busy",
            value: "ClientBusy"
          }),
          new DispositionType({
            label: "No Enough Funds",
            value: "NoEnoughFunds"
          }),
        ]
      }))
      .addAction(
        new FBtnMDP({
          label: "Save",
          onClick: this.validateAndSubmit(),
        })
      )
  }

  getSelectedOption() {
    return () => {
      this.selectedOption = this.taskRoot.taskFormData.taskOutput.selectedNMSFTaskOption;
    }

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

  isClientDeffered(): boolean {
    return this.taskRoot.selectedNMSFTaskOption() === NsfMSFOptions.ClientDeferred
  }

  isSystemDeffered(): boolean {
    return this.taskRoot.selectedNMSFTaskOption() === NsfMSFOptions.SystemDeferred
  }

  isReceivePayment(): boolean {
    return this.taskRoot.selectedNMSFTaskOption() === NsfMSFOptions.ReceivePayment
  }
  isDraftRescheduled(): boolean {
    return this.taskRoot.selectedNMSFTaskOption() === NsfMSFOptions.DraftRescheduled
  }
}

export enum NsfMSFOptions {
  ClientDeferred = "Client Deferred",
  SystemDeferred = "System Deferred",
  ReceivePayment = "Receive Payment",
  DraftRescheduled = "Draft Rescheduled",
}
