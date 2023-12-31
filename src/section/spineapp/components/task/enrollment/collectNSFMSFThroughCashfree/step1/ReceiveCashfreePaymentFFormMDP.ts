import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import * as Data from "@/../src-gen/data";

export default class ReceiveCashfreePaymentFFormMDP extends FFormMDP {
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
        dataSelectorKey: "paymentProvider",
        label: "Payment Provider",
        boundaryClass: "col-6",
        returnObject: true,
        options: Data.ClientFile.PAYMENT_PROVIDER.list(),
        optionLabel: "name",
        optionValue: "id",
        disabled: true,
      })
    )
      .addField(
        new FCurrencyFieldMDP({
          dataSelectorKey: "msfAmount",
          label: "MSF Amount",
          parentMDP: this.childMDP,
          boundaryClass: "col-6",
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Receive Payment",
          onClick: this.validateAndSubmit(),
        })
      );
  }

  getMyRef(): any {
    return this.parent.$refs[this.myRefName];
  }

  validateAndSubmit() {
    return () => {
      this.getMyRef().submitForm(() => {
        this.parent.receiveCashfreePayment();
      });
    };
  }
}
