import { FColumnLinkMDP } from "@/components/generic/table/cell/FColumnLinkMDP";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";

export default class MTDocumentListFTableMDP extends FDataTableMDP {
    root: any;
    constructor({ root }: { root: any }) {
        super();
        this.root = root;
        this.addColumn({ dataSelectorKey: "documentType", label: "Document Type", })
            .addColumn(
                {
                    dataSelectorKey: "documentPath",
                    label: "Doc Path",
                    columnCellMDP:
                        new FColumnLinkMDP({
                            onClick: (item) => this.handleDocPathClick(item),
                            dataSelectorKey: "documentPath"
                        })
                })
            .addColumn({ dataSelectorKey: "documentDetails", label: "Details", })
            .addAction({ type: ActionType.ADD, label: "Attach Document", onClick: this.handleAddClick() })
    }


    handleAddClick() {
        return () => this.root.handleAddClick();
    }
    handleDocPathClick(item: any) {
        console.log(item)
        this.root.openUploadedFile(item.documentPath)
    }

}