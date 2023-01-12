import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP"
import * as Data from "@/../src-gen/data";

export default class UnAssignedCFListFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor(props: { parent?: any }) {
        super({
            title: "Client File List", itemKey: "clientFileId", multiSelect: true, myRefName: "unAssignedCFListFDataTableRef",
            enableSearch: true
        });
        this.parent = props.parent;
        this.addColumn({
            label: "Client File Number",
            dataSelectorKey: "clientFileNumber",
            columnCellMDP: new FCellBtnMDP({
                color: "secondary",
                onClick: (item) => { this.handleClientFileClick(item) }
            })
        }).addColumn({
            label: "Client File Status",
            dataSelectorKey: "clientFileStatus.name",
            columnCellMDP: new FCellStatusMDP({}),
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
                onClick: (item) => this.handleAssignRMClick(item),
                type: ActionType.OTHERS,
            }).addFilter({
                dataSelectorKey: "clientFileStatus.name",
                filterItems: Data.ClientFile.CLIENT_FILE_STATUS.list(),
                label: "Client file Status"
            });

    }

    handleClientFileClick(item: any) {
        this.parent.gotoFile(item.clientFileNumber);
    }

    handleAssignRMClick(itemList: any): Promise<any> {
        return new Promise(resolve => {
            this.parent.handleAssignRMClick(itemList);
        })

    }

    handleClientClick(item: any) {
        this.parent.gotoClient(item.clientId);
    }
}
