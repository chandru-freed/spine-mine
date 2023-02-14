
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellBooleanMDP from "@/components/generic/table/cell/FCellBooleanMDP";
import FSnackbar from "@/fsnackbar";
export default class FEMandateListFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor(props:{parent: any}) {
        super({myRefName:"fAgreementListFDataTableMDP", title: "EMandate List",disabled:props.parent.disabled});
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
            label: "IP Address",
            dataSelectorKey: "ipAddr",
          }).addColumn({
            label: "Signed",
            dataSelectorKey: "signed",
            columnCellMDP: new FCellBooleanMDP({})
          }).addColumn({
            label: "Signed On",
            dataSelectorKey: "signedOn",
          }).addAction({
            label: "Initiate EMandate",
            onClick: this.handleGenerateLink(),
            type: ActionType.ADD
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
}