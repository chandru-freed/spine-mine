import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FMiniFormMDP from "@/components/generic/form/field/FMiniFormMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FSelectFooFieldMDP from "@/components/generic/form/field/FSelectFooFieldMDP";
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
    });
    this.taskRoot = taskRoot;
    this.parent = parent;
    this.addField(
      new FSelectFooFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskOutput.selectedNMSFTaskOption",
        label: "Select Option",
        boundaryClass: "col-4",
        items: Object.values(NsfMSFOptions),
        mandatory: true
      })
    ) 
    .addField(
      new FNumberFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskOutput.clientDeferredTime",
        label: "Client Deferred Time",
        boundaryClass: "col-4",
        disabled: this.isDisabled(NsfMSFOptions.ClientDeferred),
        mandatory:true
      })
    ) 
    .addField(
      new FNumberFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskOutput.systemDeferredTime",
        label: "System Deferred Time",
        boundaryClass: "col-4",
        disabled: this.isDisabled(NsfMSFOptions.SystemDeferred)
      })
    )
    .addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskOutput.manualPayment",
        label: "Disposition",
        boundaryClass: "col-4",
        disabled: this.isDisabled(NsfMSFOptions.ReceivePayment)
      })
    ) 

    .addField(
      new FNumberFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskOutput.amountToBeReceived",
        label: "Disposition",
        boundaryClass: "col-4",
        disabled: this.isDisabled(NsfMSFOptions.ReceivePayment)
      })
    ) 
    .addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskOutput.upiId",
        label: "UPI Id",
        boundaryClass: "col-4",
        disabled: this.isDisabled(NsfMSFOptions.ReceivePayment)
      })
    ) 
    .addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskOutput.intent",
        label: "Intent",
        boundaryClass: "col-4",
        disabled: this.isDisabled(NsfMSFOptions.ReceivePayment)
      })
    )
    .addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskOutput.disposition",
        label: "Disposition",
        boundaryClass: "col-4",
        disabled: this.isDisabled(NsfMSFOptions.ReceivePayment)
      })
    )

    .addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskOutput.msfScheduledDraftDate",
        label: "Msf Scheduled Draft Date",
        boundaryClass: "col-4",
        disabled: this.isDisabled(NsfMSFOptions.DraftRescheduled)
      })
    )
      .addAction(
        new FBtnMDP({
          label: "Save",
          onClick: this.validateAndSubmit(),
        })
      )
    
  }

  getSelectedOption() {
    return () => {
      this.selectedOption =  this.taskRoot.taskFormData.taskOutput.selectedNMSFTaskOption;
    }
    
  }

  isDisabled(status: string) {
    return this.taskRoot.selectedNMSFTaskOption() !== status || this.taskRoot.selectedNMSFTaskOption()===''
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
}

export enum NsfMSFOptions {
  ClientDeferred = "Client Deferred",
  SystemDeferred = "System Deferred",
  ReceivePayment = "Receive Payment",
  DraftRescheduled = "Draft Rescheduled",
}
