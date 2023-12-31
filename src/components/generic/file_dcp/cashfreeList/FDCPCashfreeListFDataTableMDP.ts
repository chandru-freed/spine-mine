import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import FDataTableMDP, {
  ActionType,
} from "@/components/generic/table/FDataTableMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellBooleanMDP from "@/components/generic/table/cell/FCellBooleanMDP";
import FSnackbar from "@/fsnackbar";
import FCellLinkMDP from "../../table/cell/FCellLinkMDP";
import FCellCopyMDP from "../../table/cell/FCellCopyMDP";
import FCellStandardDateTimeMDP from "../../table/cell/FCellStandardDateTimeMDP";
import FCellDateTimeMDP from "../../table/cell/FCellDateTimeMDP";
import FCellStatusMDP from "../../table/cell/FCellStatusMDP";
import FCellRouterLinkMDP from "../../table/cell/FCellRouterLinkMDP";
export default class FDCPCashfreeListFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor(props: { parent: any; taskRoot: any }) {
    super({
      myRefName: "dcpFCashfreeListFDataTableMDP",
      title: "Cashfree List",
      disabled: props.taskRoot.taskStateTerminated,
      itemKey: "ssaToken",
    });
    this.parent = props.parent;
    this.addColumn({
      label: "Payment Link",
      dataSelectorKey: "paymentId",
      columnCellMDP: new FCellCopyMDP({
        dataSelectorKeyToCopy: "selfEnrolPaymentLink",
        tooltipText: "Click here to copy the Cashfree link",
      }),
    })
      .addColumn({
        label: "Link",
        dataSelectorKey: "clientFileNumber",
        columnCellMDP: new FCellRouterLinkMDP({
          routerName: "Root.CFile.CFPayment.CFPaymentDetails.CFPaymentDetails",
          paramsList: [
            { paramName: "clientFileNumber", paramKey: "clientFileNumber" },
            { paramName: "paymentId", paramKey: "paymentId" },
          ],
        }),
      })
      .addCurrencyColumn({
        label: "Fee Amount",
        dataSelectorKey: "dcpFeeAmount",
      })
      .addPaymentStatusColumn({
        label: "Status",
        dataSelectorKey: "status.name",
        // colorCodeData: Data.Color.PAYMENT_STATUS,
        // outlined: true,
      })
      .addColumn({
        label: "Payment Provider",
        dataSelectorKey: "paymentProvider.name",
      })
      .addAction({
        label: "Generate Cashfree",
        onClick: this.handleGenerateLink(),
        type: ActionType.ADD,
      })
      .addAction({
        label: "Refresh",
        onClick: this.handleRefreshClick(),
        type: ActionType.REFRESH,
        noSelect: true,
      })
      .addAction({
        label: "Details",
        onClick: this.handleDetailsClick(),
        type: ActionType.INFO,
      });
  }

  handleGenerateLink() {
    return () => {
      return new Promise((res) => {
        const draftDCPFeePaymentInput: Data.DCPClientFile.DraftAndPresentDCPFeeThroughCashfreeInput =
          new Data.DCPClientFile.DraftAndPresentDCPFeeThroughCashfreeInput();
        draftDCPFeePaymentInput.clientFileId = this.parent.clientFileId;
        Action.DCPClientFile.DraftAndPresentDCPFeeThroughCashfree.execute(
          draftDCPFeePaymentInput,
          (output) => {
            setTimeout(() => {
              this.getMSFCashfreeLinkPaymentList();
            }, 1000);
            FSnackbar.success("Successfully generated the Cashfree");
          }
        );
        res(true);
      });
    };
  }

  handleDetailsClick() {
    return (item: any) => {
      return new Promise((res) => {
        this.parent.handleInfoClick(item);
      });
    };
  }

  handleRefreshClick() {
    return () => {
      return new Promise((res) => {
        this.getMSFCashfreeLinkPaymentList();
        this.parent.getClientFileBasicInfo();
        res(true);
      });
    };
  }

  getMSFCashfreeLinkPaymentList() {
    Action.DCPClientFile.GetDCPFeeCashfreeLinkPaymentList.execute1(
      this.parent.clientFileId,
      (output) => {}
    );
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
