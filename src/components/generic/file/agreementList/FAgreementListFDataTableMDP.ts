
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellBooleanMDP from "@/components/generic/table/cell/FCellBooleanMDP";
import FSnackbar from "@/fsnackbar";
import FCellLinkMDP from "../../table/cell/FCellLinkMDP";
import FCellCopyMDP from "../../table/cell/FCellCopyMDP";
import FCellStandardDateTimeMDP from "../../table/cell/FCellStandardDateTimeMDP";
import FCellDateTimeMDP from "../../table/cell/FCellDateTimeMDP";
import FCellStatusMDP from "../../table/cell/FCellStatusMDP";
export default class FAgreementListFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor(props:{parent: any;taskRoot: any}) {
        super({myRefName:"fAgreementListFDataTableMDP", title: "Agreement List",disabled:props.taskRoot.taskStateTerminated,
      itemKey:"ssaToken",
      });
        this.parent = props.parent;
        this.addColumn({
            label: "SSA Token",
            dataSelectorKey: "ssaToken",
            columnCellMDP: new FCellCopyMDP({
              dataSelectorKeyToCopy: "agreementUrl",
              tooltipText: "Click here to copy the agreement link"
            })
          })
          .addColumn({
            label: "Generated On",
            dataSelectorKey: "generatedOn",
            columnCellMDP: new FCellDateTimeMDP()
          }).addColumn({
            label: "Status",
            dataSelectorKey: "status.name",
            columnCellMDP:new  FCellStatusMDP({
              colorCodeData: Data.Color.AGREEMENT_STATUS,
              outlined: true
            })
          })
          // .addColumn({
          //   label: "Signed",
          //   dataSelectorKey: "signed",
          //   columnCellMDP: new FCellBooleanMDP({})
          // })
          .addColumn({
            label: "Signed On",
            dataSelectorKey: "signedOn",
            columnCellMDP: new FCellDateTimeMDP()
          }).

          addColumn({
            label: "IP Address",
            dataSelectorKey: "ipAddr",
          }).addAction({
            label: "Generate Agreement",
            onClick: this.handleGenerateLink(),
            type: ActionType.ADD
          })   .addAction({
            label: "Refresh",
            onClick: this.handleRefreshClick(),
            type: ActionType.REFRESH,
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
          });
          res(true)
        })
      }
    }

    handleRefreshClick(){
      return () => {
        
        return new Promise(res => {
          Action.ClientFile.GetAllSignAgreementList.execute1(this.parent.clientFileId, output => {
          });
          this.parent.getClientFileBasicInfo();
          res(true)
        })
      }
    }

    openAgreementLink() {
      return (item: any) => {
        console.log(item)
        if(item.agreementUrl) {
        window.open(item.agreementUrl)
        }
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