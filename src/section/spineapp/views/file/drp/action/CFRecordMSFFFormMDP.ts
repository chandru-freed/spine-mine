import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FClientLanguageSelectFieldMDP from "@/components/generic/form/field/FClientLanguageSelectFieldMDP";
import FPasswordFieldMDP from "@/components/generic/form/field/FPasswordFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import * as Data from '@/../src-gen/data';
import FBtnMDP from "@/components/generic/FBtnMDP";
import FPhoneFieldMDP from "@/components/generic/form/field/FPhoneFieldMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from '@/../src-gen/action';
import FSnackbar from "@/fsnackbar";

export default class CFRecordMSFFFormMDP extends FFormMDP {

  childMDP = new FFormChildMDP();
  parent: any;

  constructor({ parent }: { parent: any }) {
    super({
      myRefName: "CFRecordMSFFFormRef",
    });
    this.parent = parent;

    this.addField(
      new FSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "paymentProvider",
        label: "Payment Provider",
        mandatory: true,
        boundaryClass: "col-6",
        options: Data.ClientFile.PAYMENT_PROVIDER.list(),
        optionLabel: "name",
        optionValue: 'id'
      })
    ).addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "remoteTxnRefNumber",
        label: "Remote Txn Ref Number",
        mandatory: true,
        boundaryClass: "col-6",
      })
    ).addAction(new FBtnMDP({
      label: "Record MSF Payment",
      onClick: this.createUser()
    }))
  }
  getMyRef(): any {
    return this.parent.$refs[this.myRefName];
  }
  createUser() {
    return () => {
      this.getMyRef().submitForm(() => {
        this.parent.recordMSFPaymentInput.clientFileId = this.parent.clientFileId;
        Action.ClientFile.RecordMSFPayment.execute(this.parent.recordMSFPaymentInput, (output) => {
          this.parent.gotoCFPayment();
          FSnackbar.success("Successfully recorded the msf payment");
        });
      })
    }
  }

}