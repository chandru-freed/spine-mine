import FDataTableMDP, {
  ActionType,
} from "@/components/generic/table/FDataTableMDP";
import FCellUrlLinkMDP from "@/components/generic/table/cell/FCellUrlLinkMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import FSnackbar from "@/fsnackbar";
import FCellCopyMDP from "@/components/generic/table/cell/FCellCopyMDP";
import FCellBtnPreviewMDP from "@/components/generic/table/cell/FCellBtnPreviewMDP";

export default class DCPAgreementListFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor({ parent }: { parent: any }) {
    super({ title: "DCP Agreement List", myRefName: "DCPAgreementListRef" });
    this.parent = parent;
    // this.addColumn({
    //   label: "Ssa  Token",
    //   dataSelectorKey: "ssaToken",
    //   enableCopy: true,
    // })
    this.addColumn({
      label: "SSA Token",
      dataSelectorKey: "ssaToken",
      columnCellMDP: new FCellCopyMDP({
        dataSelectorKeyToCopy: "agreementUrl",
        tooltipText: "Click here to copy the agreement link",
      }),
    })
      .addDateColumn({
        label: "Generated  On",
        dataSelectorKey: "generatedOn",
      })
      .addStatusColumn({
        label: "Status",
        dataSelectorKey: "status.name",
        colorCodeData: Data.Color.AGREEMENT_STATUS,
        outlined: true,
      })
      .addDateColumn({
        label: "Signed  On",
        dataSelectorKey: "signedOn",
      })
      .addColumn({
        label: "Ip  Addr",
        dataSelectorKey: "ipAddr",
      })
      .addBooleanColumn({
        label: "Signed",
        dataSelectorKey: "signed",
      })
      // .addColumn({
      //   label: "Agreement  Url",
      //   dataSelectorKey: "agreementUrl",
      //   columnCellMDP: new FCellUrlLinkMDP({
      //     placeholder: "Url",
      //   }),
      //   enableCopy: true,
      // })
      // .addColumn({
      //   label: "Preview  Url",
      //   dataSelectorKey: "previewUrl",
      //   columnCellMDP: new FCellUrlLinkMDP({
      //     placeholder: "Preview Url",
      //   }),
      //   enableCopy: true,
      // })
      .addColumn({
        label: "Preview",
        dataSelectorKey: "previewUrl",
        columnCellMDP: new FCellBtnPreviewMDP({
          color: "primary",
          onClick: (item) => {
            this.previewLinkNewTab(item);
          },
        }),
      })
      .addAction({
        label: "Generate Agreement",
        onClick: this.handleGenerateAgreementClick(),
        type: ActionType.ADD,
      })
      .addAction({
        label: "Refresh",
        onClick: this.handleRefreshClick(),
        type: ActionType.REFRESH,
        noSelect: true,
      })
      .addAction({
        label: "Resend Mail",
        onClick: this.handleResendClick(),
        type: ActionType.OTHERS,
        confirmation: true,
      })
      .addAction({
        label: "Details",
        onClick: this.handleDetailsClick(),
        type: ActionType.INFO,
      });
  }
  handleGenerateAgreementClick() {
    return () => {
      return new Promise((res) => {
        this.parent.showGenerateform = true;
      });
    };
  }

  handleResendClick() {
    return (item: any) => {
      return new Promise((res) => {
        const sendAgreementInput = new Data.DCPClientFile.SendAgreementInput();
        sendAgreementInput.byEmail = true;
        sendAgreementInput.bySMS = false;
        sendAgreementInput.byWhatsapp = false;
        sendAgreementInput.token = item.ssaToken;
        Action.DCPClientFile.SendAgreement.execute(
          sendAgreementInput,
          (output) => {
            FSnackbar.success("Succesfully resend the agreement");
            res(true);
          }
        );
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
        this.parent.getAllAgreementList();
        res(true);
      });
    };
  }
  previewLinkNewTab(item: any) {
    if (item.previewUrl) {
      window.open(item.previewUrl);
    }
  }
}
