import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";

export default class MyCFFileFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor(props: {parent: any}) {
        
        super({myRefName: "myCFFileFDataTableRef",enableSearch: true,title:"My Client files"});
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
            label: "Client File Status",
            dataSelectorKey: "clientFileStatus",
            columnCellMDP: new FCellStatusMDP()
        })
        
        
        .addColumn({
            label: "City",
            dataSelectorKey: "city"
        }).addColumn({
            label: "State",
            dataSelectorKey: "state"
        }).addAction({
            type: ActionType.ADD,
            label:"Add My Client File",
            onClick: (item) => this.addMyClientFile(item)
        })
    }


    handleClientFileClick(item: any) {
        this.parent.gotoFile(item.clientFileNumber);
    }

    addMyClientFile(item: any) {
        return new Promise(res=> {
            this.parent.showRegisterMyCFForm = true;
        });
    }


    handleClientClick(item: any) {
        this.parent.gotoClient(item.clientId);
    }
}