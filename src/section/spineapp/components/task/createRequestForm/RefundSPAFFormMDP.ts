import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import AccountFMiniFormMDP from "@/components/generic/form/field/AccountFMiniFormMDP";
import AddressFMiniFormMDP from "@/components/generic/form/field/AddressFMiniFormMDP";
import FAccountFieldMDP from "@/components/generic/form/field/FAccountFieldMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FEMandateSelectFieldMDP from "@/components/generic/form/field/FEMandateSelectFieldMDP";
import FIFSCCodeFieldMDP from "@/components/generic/form/field/FIFSCCodeFieldMDP";
import FNupayBankSelectFieldMDP from "@/components/generic/form/field/FNupayBankSelectFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import * as Data from "@/../src-gen/data";

export default class RefundSPAFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      myRefName: "refundSPAFFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this
    . addField(new FCurrencyFieldMDP(
      {
        parentMDP: this.childMDP,
        dataSelectorKey: "createRefundSPAInput.spaAmount",
        label: "SPA Amount",
        mandatory: true,
        boundaryClass: "col-4",
        disabled: this.disabled,
        rules:"positive"
      },
    ))
    .addField(new FSelectFieldMDP({
      dataSelectorKey:"createRefundSPAInput.paymentMode",
      disabled:this.disabled,
      label: "Payment Mode",
      options: Data.Spine.PAYMENT_MODE.list(),
      parentMDP: this.childMDP,
      boundaryClass: "col-4",
      optionLabel: "name",
      optionValue: "value",
    }))
    .addField(new FEMandateSelectFieldMDP({
      dataSelectorKey:"selectedEMandate",
      label: "Emandate",
      parentMDP:this.childMDP,
      boundaryClass:"col-4",
      returnObject: true,
      onSelect: (details: any) => {this.handleSelectedEmandate(details)}
  }))
    .addField(new AccountFMiniFormMDP({
      dataSelectorKey:"createRefundSPAInput.accountDetails",
      disabled:this.disabled,
      label: "Account Details",
      parent:this.parent,
      taskRoot: this.taskRoot,

    }))
    .
    
   
    addAction(
        new FBtnMDP({
          label: "CREATE REQUEST",
          onClick: this.validateAndSubmit(),
        })
      );
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }

  validateAndSubmit() {
    return () => {
      this.getMyRef().submitForm(this.createRefundSPAFlow());
    };
  }

  handleSelectedEmandate(details: any) {
    this.taskRoot.populateAccountDetailsRefundSPA(details);
  }

  createRefundSPAFlow() {
    return () => {
      this.taskRoot.createRefundSPAFlow();
    };
  }
}
