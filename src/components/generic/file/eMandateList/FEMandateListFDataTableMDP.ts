
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellBooleanMDP from "@/components/generic/table/cell/FCellBooleanMDP";
import FSnackbar from "@/fsnackbar";
import FCellStatusMDP from "../../table/cell/FCellStatusMDP";
import FCellDateTimeEllipsisMDP from "../../table/cell/FCellDateTimeEllipsisMDP";
export default class FEMandateListFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor(props: { parent: any }) {
    super({ myRefName: "fAgreementListFDataTableMDP", title: "EMandate List", disabled: props.parent.disabled , enableShowHideColumns: true, itemKey:"eMandateId"});
    this.parent = props.parent;
    this.addColumn({
      label: "Nupay Cust Id",
      dataSelectorKey: "remoteEMandateId",
    })
      .addCurrencyColumn({
        dataSelectorKey: "amount",
        label: "Amount"
      })
      .addColumn({
        label: "Status",
        dataSelectorKey: "status.name",
        columnCellMDP: new FCellStatusMDP({
          colorCodeData: Data.Color.EMANDATE_STATUS,
          outlined:true
        }),
        align:"center"
      }).addColumn({
        label: "Provider",
        dataSelectorKey: "provider.name",
        hidden: true
      }).addNumberColumn({
        label: "Account Number",
        dataSelectorKey: "accountNumber",

      }).addColumn({
        label: "Created On",
        dataSelectorKey: "createdOn",
        columnCellMDP: new FCellDateMDP()
      }).addAction({
        label: "Initiate EMandate",
        onClick: this.handleInitiateClick(),
        type: ActionType.ADD
      }).addAction({
        label: "Refresh",
        onClick: this.handleRefreshClick(),
        type: ActionType.OTHERS,
        noSelect: true
      }).addAction({
        label: "Info",
        onClick: this.handleInfoClick(),
        type: ActionType.INFO,
        noSelect: true
      }).addAction({
        label: "Resend Mail",
        onClick: this.handleResendClick(),
        type: ActionType.OTHERS,
        confirmation:true
      })
  }

  handleInitiateClick() {
    return () => {
      return new Promise(res => {
        this.parent.showInitiateForm = true;
        res(true)
      })
    }
  }
  handleRefreshClick() {
    return () => {
      return new Promise(res => {
        Action.ClientFile.GetAllEMandateList.execute1(this.parent.clientFileId, output => {

        });
      }
      )
    }
  }
  handleInfoClick() {
    return (item: any) => {
      return new Promise(res => {
        this.parent.handleInfoClick(item)
      })
    }
  }
  handleResendClick() {
    return (item: any) => {
      return new Promise(res => {
        const input: Data.ClientFile.SendEmandateInput = new Data.ClientFile.SendEmandateInput();
        input.fiEMandateId = item.eMandateId;
        input.byEmail = true;
        input.bySMS = false;
        input.byWhatsapp = false;
        Action.ClientFile.SendEmandate.execute(input, output => {
          FSnackbar.success("Succesfully resend the agreement")
          res(true);
        });
      })
    }
  }
}