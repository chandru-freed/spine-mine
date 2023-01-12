import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP from "@/components/generic/table/FDataTableMDP"


export default class AllClientFileListFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor(props: { parent?: any }) {
        super({ title: "Client File List",enableSearch: true, myRefName:"allClientFileListFDataTableRef" });
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
        }).addColumn({
            label: "Assigned RM",
            dataSelectorKey: "assignedRM"
        })
        .addColumn({
            label: "Client File Status",
            dataSelectorKey: "clientFileStatus.name",
            columnCellMDP: new FCellStatusMDP({})
        })
        
        
        .addColumn({
            label: "City",
            dataSelectorKey: "city"
        }).addColumn({
            label: "State",
            dataSelectorKey: "state"
        })
        
    }

    handleClientFileClick(item: any) {
        this.parent.gotoFile(item.clientFileNumber);
    }


    handleClientClick(item: any) {
        this.parent.gotoClient(item.clientId);
    }
}
