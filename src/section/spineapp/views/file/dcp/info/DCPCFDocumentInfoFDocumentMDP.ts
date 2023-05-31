import FDocumentMDP from "@/components/generic/file/documentUpload/FDocumentMDP";

export default class DCPCFDocumentInfoFDocumentMDP extends FDocumentMDP {
    constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
        super({
            taskRoot: taskRoot,
            parent: parent,
            myRefName: "dcpCFDocumentInfoRef",
            disabled: false,
        });

    }

    getMyRef() {
        return this.parent.$refs[this.myRefName];
    }
}