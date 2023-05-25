import FDataTableMDP, {
  ActionType,
} from "@/components/generic/table/FDataTableMDP";
import FCellUrlLinkMDP from "@/components/generic/table/cell/FCellUrlLinkMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import FSnackbar from "@/fsnackbar";

export default class DCPAgreementListFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor({ parent }: { parent: any }) {
    super({ title: "DCP Agreement List", myRefName: "DCPAgreementListRef" });
    this.parent = parent;
    this.addColumn({
      label: "Ssa  Token",
      dataSelectorKey: "ssaToken",
      enableCopy: true,
    })
      .addColumn({
        label: "Ip  Addr",
        dataSelectorKey: "ipAddr",
      })
      .addBooleanColumn({
        label: "Signed",
        dataSelectorKey: "signed",
      })
      .addDateColumn({
        label: "Signed  On",
        dataSelectorKey: "signedOn",
      })
      .addDateColumn({
        label: "Generated  On",
        dataSelectorKey: "generatedOn",
      })
      .addColumn({
        label: "Agreement  Url",
        dataSelectorKey: "agreementUrl",
        columnCellMDP: new FCellUrlLinkMDP({
          placeholder: "Url",
        }),
        enableCopy: true,
      })
      .addStatusColumn({
        label: "Status",
        dataSelectorKey: "status.name",
        colorCodeData: Data.Color.AGREEMENT_STATUS,
        outlined: true,
      })
      .addColumn({
        label: "Preview  Url",
        dataSelectorKey: "previewUrl",
        columnCellMDP: new FCellUrlLinkMDP({
          placeholder: "Preview Url",
        }),
        enableCopy: true,
      })
      .addAction({
        label: "Generate Agreement",
        onClick: this.handleGenerateAgreementClick(),
        type: ActionType.ADD,
      })
      .addAction({
        label: "Resend Mail",
        onClick: this.handleResendClick(),
        type: ActionType.OTHERS,
        confirmation: true,
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
}
