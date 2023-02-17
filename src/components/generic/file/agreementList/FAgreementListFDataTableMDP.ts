
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellBooleanMDP from "@/components/generic/table/cell/FCellBooleanMDP";
import FSnackbar from "@/fsnackbar";
export default class FAgreementListFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor(props:{parent: any}) {
        super({myRefName:"fAgreementListFDataTableMDP", title: "Agreement List",disabled:props.parent.disabled,
      itemKey:"ssaToken"
      });
        this.parent = props.parent;
        this.addColumn({
            label: "SSA Token",
            dataSelectorKey: "ssaToken",
          })
          .addColumn({
            label: "Generated On",
            dataSelectorKey: "generatedOn",
            columnCellMDP: new FCellDateMDP()
          }).addColumn({
            label: "Signed",
            dataSelectorKey: "signed",
            columnCellMDP: new FCellBooleanMDP({})
          }).addColumn({
            label: "IP Address",
            dataSelectorKey: "ipAddr",
          }).addColumn({
            label: "Signed On",
            dataSelectorKey: "signedOn",
          }).addAction({
            label: "Generate Agreement",
            onClick: this.handleGenerateLink(),
            type: ActionType.ADD
          })   .addAction({
            label: "Refresh",
            onClick: this.handleRefreshClick(),
            type: ActionType.OTHERS,
            noSelect: true
          }).addAction({
            label: "Resend Mail",
            onClick: this.handleResendClick(),
            type: ActionType.OTHERS,
            confirmation: true
          })
    }

    handleGenerateLink() {
      return () => {
        return new Promise(res => {
          Action.ClientFile.GenerateAgreement.execute1(this.parent.clientFileId, output => {
            FSnackbar.success("Successfully generated the agreement")
          })
          res(true)
        })
      }
    }
    handleRefreshClick(){
      return () => {
        return new Promise(res => {
          Action.ClientFile.GetAllSignAgreementList.execute1(this.parent.clientFileId, output => {
          })
          res(true)
        })
      }
    }

    handleResendClick() {
      return (item: any) => {
        return new Promise(res => {
          const sendAgreementInput = new Data.ClientFile.SendAgreementInput();
          sendAgreementInput.byEmail = true;
          sendAgreementInput.bySMS = false;
          sendAgreementInput.byWhatsapp = false;
          sendAgreementInput.token = item.ssaToken;
          Action.ClientFile.SendAgreement.execute(sendAgreementInput, output => {
            FSnackbar.success("Succesfully resend the agreement")
            res(true);
          })
        })
      }
    }
}