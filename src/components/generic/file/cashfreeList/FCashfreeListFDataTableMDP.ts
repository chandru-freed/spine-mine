import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import FDataTableMDP, {
  ActionType,
} from "@/components/generic/table/FDataTableMDP";
import FSnackbar from "@/fsnackbar";
import CFPaymentListFDataTableMDP from "@/section/spineapp/views/file/drp/payment/CFPaymentListFDataTableMDP";
export default class FCashfreeListFDataTableMDP extends CFPaymentListFDataTableMDP {
  parent: any;
  constructor(props: { parent: any; taskRoot: any }) {
    super({
      
      parent: props.parent,
    });
    this.parent = props.parent;
    this.addAction({
        label: "Generate Cashfree",
        onClick: this.handleGenerateLink(),
        type: ActionType.ADD,
      })
      .addAction({
        label: "Generate Cashfree with discount(20%)",
        onClick: this.handleGenerateWithDiscount(),
        type: ActionType.OTHERS,
        noSelect: true,
        disabled: !this.parent.isAdmin()
      })
      .addAction({
        label: "Refresh",
        onClick: this.handleRefreshClick(),
        type: ActionType.REFRESH,
        noSelect: true,
      });
  }

  handleGenerateLink() {
    return () => {
      return new Promise((res) => {
        const draftFirstMSFPaymentInput: Data.ClientFile.DraftFirstMSFThroughCashfreeInput =
          new Data.ClientFile.DraftFirstMSFThroughCashfreeInput();
        draftFirstMSFPaymentInput.clientFileId =
          this.parent.clientFileId;
        // receiveFirstMSFPaymentInput.taskId = this.parent.taskId;
        Action.ClientFile.DraftAndPresentFirstMSFThroughCashfree.execute(
          draftFirstMSFPaymentInput,
          (output) => {
            FSnackbar.success("Successfully generated the Cashfree");
          }
        );
        res(true);
      });
    };
  }

  handleGenerateWithDiscount() {
    return () => {
      return new Promise((res) => {
        const { msfDraftAmount = 0 } = this.parent.fiPaymentPlanInfoStore.ppCalculator;
        const discount = msfDraftAmount * 20 / 100;
        const msfDraftAmountAfterDiscount = Math.ceil(msfDraftAmount - discount);
        FSnackbar.confirm({
          message: `Msf amount will be ${msfDraftAmountAfterDiscount} after applying 20% discount.Are you sure want to continue?`, onConfirm: () => {
            const draftFirstMSFPaymentInput: Data.ClientFile.DraftFirstMSFThroughCashfreeInput =
              new Data.ClientFile.DraftFirstMSFThroughCashfreeInput();
            draftFirstMSFPaymentInput.clientFileId =
              this.parent.clientFileId;
            draftFirstMSFPaymentInput.msfAmount = msfDraftAmountAfterDiscount;
            Action.ClientFile.DraftAndPresentFirstMSFThroughCashfree.execute(
              draftFirstMSFPaymentInput,
              (output) => {
                FSnackbar.success("Successfully generated the Cashfree");
              }
            );
            res(true);
          }
        })
      });
    }
  }


  handleDetailsClick() {
    return (item: any) => {
      return new Promise(res => {
        this.parent.handleInfoClick(item);
      });
    }
  }

  handleRefreshClick() {
    return () => {
      return new Promise((res) => {
        this.getFiPaymentList()
        this.parent.getClientFileBasicInfo();
        res(true);
      });
    };
  }

  getFiPaymentList() {
    Action.ClientFile.GetFiPaymentList.execute1(this.parent.clientFileId, (output) => {
      
    });
  }

  openAgreementLink() {
    return (item: any) => {
      console.log(item);
      if (item.agreementUrl) {
        window.open(item.agreementUrl);
      }
    };

  }

  // handleResendClick() {
  //   return (item: any) => {
  //     return new Promise((res) => {
  //       const sendAgreementInput = new Data.ClientFile.SendAgreementInput();
  //       sendAgreementInput.byEmail = true;
  //       sendAgreementInput.bySMS = false;
  //       sendAgreementInput.byWhatsapp = false;
  //       sendAgreementInput.token = item.ssaToken;
  //       Action.ClientFile.SendAgreement.execute(
  //         sendAgreementInput,
  //         (output) => {
  //           FSnackbar.success("Succesfully resend the agreement");
  //           res(true);
  //         }
  //       );
  //     });
  //   };
  // }
}
