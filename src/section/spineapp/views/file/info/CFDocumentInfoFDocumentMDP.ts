import FDocumentMDP from "@/components/generic/file/documentUpload/FDocumentMDP";

export default class CFDocumentInfoFDocumentMDP extends FDocumentMDP {
    constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
        super({
            taskRoot: taskRoot,
            parent: parent,
            myRefName: "cfDocumentInfoRef",
            disabled: true,
        });

    }

    getMyRef() {
        return this.parent.getMyRef().$refs[this.myRefName];
    }
}