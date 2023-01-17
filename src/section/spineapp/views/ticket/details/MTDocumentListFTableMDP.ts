import FCellLinkMDP from "@/components/generic/table/cell/FCellLinkMDP";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";

export default class MTDocumentListFTableMDP extends FDataTableMDP {
    root: any;
    constructor({ root }: { root: any }) {
        super({myRefName: "mtDocumentListFTableMDP"});
        this.root = root;
        this.addColumn({ dataSelectorKey: "documentType", label: "Document Type", })
            .addColumn(
                {
                    dataSelectorKey: "documentPath",
                    label: "Document Name",
                    columnCellMDP:
                        new FCellLinkMDP({
                            onClick: (item) => this.handleDocPathClick(item),
                        })
                })
            .addColumn({ dataSelectorKey: "documentDetails", label: "Details", })
            .addAction({ type: ActionType.ADD, label: "Attach Document", onClick: this.handleAddClick() })
    }


    handleAddClick() {
        return () => this.root.handleAddClick();
    }
    handleDocPathClick(item: any) {
        this.root.openUploadedFile(item.documentPath)
    }

}