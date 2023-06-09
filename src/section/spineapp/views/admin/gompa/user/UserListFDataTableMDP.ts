import FCellBooleanMDP from "@/components/generic/table/cell/FCellBooleanMDP";
import FCellEmailMDP from "@/components/generic/table/cell/FCellEmailMDP";
import FCellListMDP from "@/components/generic/table/cell/FCellListMDP";
import FCellPhoneMDP from "@/components/generic/table/cell/FCellPhoneMDP";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from "@/../src-gen/action";
import FCellLinkMDP from "@/components/generic/table/cell/FCellLinkMDP";

export default class SalesRepListFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor(props: {
        parent: any,
    }) {
        super({
            dataSelectorKey: '',
            myRefName: 'salesRepListFDataTableRef',
            itemKey: 'userName'
        });
        this.parent = props.parent;

        this.addColumn({
            label: "User Name",
            dataSelectorKey: "userName",
            columnCellMDP: new FCellLinkMDP({ onClick: this.handleUserNameLinkClick() })
        }).addColumn({
            label: "Email Id",
            dataSelectorKey: "emailId",
            columnCellMDP: new FCellEmailMDP()
        }).addColumn({
            label: "Mobile",
            dataSelectorKey: "mobile",
            columnCellMDP: new FCellPhoneMDP()
        })
            .addColumn({
                label: "Title",
                dataSelectorKey: "title",
            }).addColumn({
                label: "First Name",
                dataSelectorKey: "firstName",
                hidden: true
            })
            .addColumn({
                label: "Last Name",
                dataSelectorKey: "lastName",
                hidden: true
            })
            .addColumn({
                label: "Full Name",
                dataSelectorKey: "fullName",
            }).addColumn({
                label: "LeadSquared UserId",
                dataSelectorKey: "leadSquaredUserId",
            })

            // .addColumn({
            //     label: "Language List",
            //     dataSelectorKey: "languageList",
            //     columnCellMDP: new FCellListMDP({
            //     })
            // })
            .addColumn({
                label: "userGroupList",
                dataSelectorKey: "userGroupList",
                columnCellMDP: new FCellListMDP({

                }),
            })
            .addBooleanColumn({
                label: "Active",
                dataSelectorKey: "active",
            })
            .addAction({
                label: "Create User",
                type: ActionType.ADD,
                onClick: this.handleCreateUserClick()
            })
            .addAction({
                label: "Activate",
                type: ActionType.OTHERS,
                onClick: this.handleActivateUserClick(),
                singleSelect: true,
                confirmation: true,
            })
            .addAction({
                label: "DeActivate",
                type: ActionType.OTHERS,
                onClick: this.handleDeActivateUserClick(),
                singleSelect: true,
                confirmation: true,
            })
            .addAction({
                label: "Change Details",
                type: ActionType.OTHERS,
                onClick: this.handleChangeDetailsClick(),
                singleSelect: true,
            })
            .addAction({
                label: "Reset Password",
                type: ActionType.OTHERS,
                onClick: this.handleResetPasswordClick(),
                singleSelect: true,
            })

    }
    handleCreateUserClick() {
        return (item: any) => {
            return new Promise(res => {
                this.parent.showCreateUserForm = true;
            })
        }
    }

    handleActivateUserClick() {
        return (item: any) => {
            return new Promise(res => {
                Action.Spine.ActivateUser.execute1(item.userName, output => {
                    res(true);
                });
            })
        }
    }

    handleDeActivateUserClick() {
        return (item: any) => {
            return new Promise(res => {
                Action.Spine.DeActivateUser.execute1(item.userName, output => {
                    res(true);
                });
            })
        }
    }

    handleChangeDetailsClick() {
        return (item: any) => {
            return new Promise(res => {
                this.parent.handleChangeDetailsClick(item);
            });
        }
    }

    handleResetPasswordClick() {
        return (item: any) => {
            return new Promise(res => {
                this.parent.handleResetPasswordClick(item)
            });
        }
    }

    handleUserNameLinkClick() {
        return (item: any) => {
            this.parent.gotoDetailsPage(item.userName);
        }
    }
}