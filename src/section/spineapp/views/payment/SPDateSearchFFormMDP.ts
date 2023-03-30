import FBtnMDP from "@/components/generic/FBtnMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import * as Data from "@/../src-gen/data";

export default class SPDateSearchFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: any;
    constructor({ taskRoot }: { taskRoot: any }) {
        super({
            myRefName: "upcoumingPaymentsDateSearch",
        });
        this.taskRoot = taskRoot;

        this.addField(
            new FSelectDateFieldMDP({
                parentMDP: this.childMDP,
                dataSelectorKey: "fromPresentedDateFilter",
                label: "From Date",
                boundaryClass: "col-2",
                mandatory: true,
                futureDaysDisabled: false,
            })
        )
            .addField(
                new FSelectDateFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "toPresentedDateFilter",
                    label: "To Date",
                    boundaryClass: "col-2",
                    mandatory: true,
                    futureDaysDisabled: false,
                })
            )
            .addField(
                new FSelectFieldMDP({
                    parentMDP: this.childMDP,
                    dataSelectorKey: "statusFilter",
                    label: "Payment Status ",
                    boundaryClass: "col-2",
                    options: Data.Spine.PAYMENT_STATUS.list(),
                    optionLabel: "name",
                    optionValue: "id",
                    clearable: true
                })
            )
            .addAction(
                new FBtnMDP({
                    label: "Search",
                    onClick: this.searchPayment(),
                })
            );
    }

    searchPayment() {
        return () => {
            this.taskRoot.searchPaymentListScheduled();
        };
    }
}
