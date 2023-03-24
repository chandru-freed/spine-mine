import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FEMandateSelectFieldMDP from "@/components/generic/form/field/FEMandateSelectFieldMDP";

export default class AddEPsEntryFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  parent: any;
  constructor({
    parent,
  }: {
    parent: any;
  }) {
    super({
      myRefName: "addPsEntryFFormRef",
    });
    this.parent = parent;

    // this.addField(
    //   new FSelectFieldMDP({
    //     parentMDP: this.childMDP,
    //     dataSelectorKey: "paymentProvider",
    //     label: "Payment Provider",
    //     mandatory: true,
    //     options: Data.ClientFile.PAYMENT_PROVIDER.list(),
    //     boundaryClass: "col-4",
    //     optionLabel: "name",
    //     optionValue: "id"
    //   })
    // ).addField(
    //   new FSelectFieldMDP({
    //     parentMDP: this.childMDP,
    //     dataSelectorKey: "paymentMode",
    //     label: "Payment Mode",
    //     mandatory: true,
    //     options: Data.ClientFile.PAYMENT_MODE.list(),
    //     boundaryClass: "col-4",
    //     optionLabel: "name",
    //     optionValue: "id"
    //   })
    // )
    this.addField(
      new FEMandateSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "eMandateId",
        label: "E-Mandate",
        boundaryClass: "col-4",
      })
    ).addField(
      new FSelectDateFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "draftDate",
        label: "Draft Date",
        mandatory: true,
        boundaryClass: "col-4",
        pastDaysDisabled: true
      })
    ).addField(new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "spaAmount",
        label: "SPA Amount",
        boundaryClass: "col-4",
    }))
    // .addField(new FCurrencyFieldMDP({
    //     parentMDP: this.childMDP,
    //     dataSelectorKey: "feeAmount",
    //     boundaryClass: "col-4",
    //     label: "Fee Amount"
    // }))
    .addAction(
      new FBtnMDP({
        label: "Cancel",
        onClick: this.cancel(),
      })
    ).addAction(
      new FBtnMDP({
        label: "Add Entry",
        onClick: this.validateAndAddEntry(),
      })
    );
  }

  getMyRef() {
    return this.parent.$refs[this.myRefName];
  }

  validateAndAddEntry() {
    return () => {
      this.getMyRef().submitForm(() => {
        this.addEntry();
      });
    };
  }
  addEntry() {
    this.parent.addPsEntryInput.paymentProvider = 'NUPAY';
    this.parent.addPsEntryInput.paymentMode = 'ENACH';
    this.parent.addPsEntryInput.clientFileId = this.parent.clientFileId;
    this.parent.addPsEntryInput.psPlanId = this.parent.modelValue.paymentPlan.psPlanId;
    Action.ClientFile.AddPSEntry.execute(this.parent.addPsEntryInput, output => {
      this.parent.resetFormsTableAndData();
      Snackbar.show({
        text: "Succesfully added an entry",
        pos: "bottom-center",
      });
    });
  }

  cancel() {
    return () => {
      this.parent.resetFormsTableAndData();
    }
    
  }
}
