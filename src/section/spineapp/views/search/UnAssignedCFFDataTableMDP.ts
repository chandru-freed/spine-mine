import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP"


export default class unAssignedCFListFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor(props: { parent?: any }) {
        super({ title: "Client File List",itemKey:"clientFileId", multiSelect: true, myRefName: "unAssignedCFListFDataTableRef" });
        this.parent = props.parent;
        this.addColumn({
            label: "Client File Number",
            dataSelectorKey: "clientFileNumber",
            columnCellMDP: new FCellBtnMDP({
                color: "secondary",
                onClick: (item) => { this.handleClientFileClick(item) }
            })
        }).addColumn({
            label: "Client Name",
            dataSelectorKey: "fullName",
            columnCellMDP: new FCellBtnMDP({
                color: "green",
                onClick: (item) => { this.handleClientClick(item) }
            })
        }).addColumn({
            label: "Mobile",
            dataSelectorKey: "mobile"
        }).addColumn({
            label: "E-mail",
            dataSelectorKey: "emailId"
        })
            .addColumn({
                label: "City",
                dataSelectorKey: "city"
            }).addColumn({
                label: "State",
                dataSelectorKey: "state"
            }).addAction({
                label: "Assign RM",
                onClick:(item,callback) => {this.handleAssignRMClick(item,callback)},
                type: ActionType.OTHERS
            })

    }

    handleClientFileClick(item: any) {
        this.parent.gotoFile(item.clientFileNumber);
    }

    handleAssignRMClick(itemList: any,callback?: any) {
        this.parent.handleAssignRMClick(itemList,callback);
    }

    handleClientClick(item: any) {
        this.parent.gotoClient(item.clientId);
    }
}
