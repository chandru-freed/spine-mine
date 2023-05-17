import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FClientLanguageSelectFieldMDP from "@/components/generic/form/field/FClientLanguageSelectFieldMDP";
import FPasswordFieldMDP from "@/components/generic/form/field/FPasswordFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import * as Data from "@/../src-gen/data";
import FBtnMDP from "@/components/generic/FBtnMDP";
import FPhoneFieldMDP from "@/components/generic/form/field/FPhoneFieldMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import FSnackbar from "@/fsnackbar";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";

export default class ExceptionOnMSFAmountFFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  parent: any;

  constructor({ parent }: { parent: any }) {
    super({
      myRefName: "exceptionOnMSFAmountFFormRef",
    });
    this.parent = parent;

    this.addField(
      new FSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "newMsfAmount",
        label: "New Msf Amount",
        mandatory: true,
        boundaryClass: "col-6",
        options: [
          { id: "649", name: "649" },
          { id: "899", name: "899" },
          { id: "999", name: "999" },
          { id: "1249", name: "1249" },
          { id: "1499", name: "1499" },
          { id: "1799", name: "1799" },
          { id: "1999", name: "1999" },
          { id: "2499", name: "2499" },
          { id: "2999", name: "2999" },
        ],
        optionLabel: "name",
        optionValue: "id",
      })
    )
      .addField(
        new FGompaUserRemoteAutoCompleteFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "approvedBy",
          mandatory: true,
          label: "Approved By",
          boundaryClass: "col-6",
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Exception On MSF",
          onClick: this.createExceptionOnMSF(),
        })
      );
  }
  getMyRef(): any {
    return this.parent.$refs[this.myRefName];
  }
  createExceptionOnMSF() {
    return () => {
      this.getMyRef().submitForm(() => {
        this.parent.takeExceptionOnMSFAmountInput.clientFileId =
          this.parent.clientFileId;
        Action.ClientFile.TakeExceptionOnMSFAmount.execute(
          this.parent.takeExceptionOnMSFAmountInput,
          (output) => {
            this.parent.gotoCFPayment();
            FSnackbar.success("Successfully recorded the msf payment");
          }
        );
      });
    };
  }
}
