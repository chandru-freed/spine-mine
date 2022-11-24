import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";

export default class MTSubscriberListFTableMDP extends FDataTableMDP {
    root: any;
    constructor({ root }: { root: any }) {
        super();
        this.root = root;
        this.addColumn({ dataSelectorKey: "userName", label: "User Name", })
            .addColumn({ dataSelectorKey: "fullName", label: "Full Name", })
            .addColumn({ dataSelectorKey: "emailId", label: "Email Id", })
            .addColumn({ dataSelectorKey: "mobile", label: "Mobile", })
            .addAction({ type: ActionType.ADD, label: "Add Subscriber", onClick: this.handleAddSubscriberClick() })
    }


    handleAddSubscriberClick() {
        return () => this.root.handleAddClick();
    }

}