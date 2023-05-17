import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FEMandateSelectFieldMDP from "@/components/generic/form/field/FEMandateSelectFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import * as Data from "@/../src-gen/data";
/*
paymentProvider
paymentMode  - drop down
eMandateId? if(paymentMode == ENACH)
totalAmount
spaAmount
feeAmount
msfAmount
*/
export default class CFCollectionFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "cfCollectionFFormRef",
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
        options: Data.ClientFile.PAYMENT_PROVIDER.list(),
        optionLabel: "name",
        optionValue: "id",
      })
    )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "paymentMode",
          label: "Payment Mode",
          boundaryClass: "col-4",
          mandatory: true,
          returnObject: true,
          options: Data.ClientFile.PAYMENT_MODE.list(),
          optionLabel: "name",
          optionValue: "id",
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "totalAmount",
          label: "Total Amount",
          boundaryClass: "col-4",
          disabled: true,
          mandatory: true,
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "spaAmount",
          label: "SPA Amount",
          boundaryClass: "col-4",
          mandatory: true,
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "feeAmount",
          label: "Fee Amount",
          boundaryClass: "col-4",
          mandatory: true,
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "msfAmount",
          label: "MSF Amount",
          boundaryClass: "col-4",
          mandatory: true,
        })
      ).addField(
        new FEMandateSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "eMandateId",
          label: "EMandate Id",
          boundaryClass: "col-4",
          mandatory: true,
        })
      )
      // .addAction(
      //   new FBtnMDP({
      //     label: "Draft Payment",
      //     onClick: this.validateAndSubmit(),
      //   })
      // );
  }

  validateAndSubmit() {
    return () => {
      this.getMyRef().submitForm(this.taskRoot.draftPayment());
    };
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }
}
