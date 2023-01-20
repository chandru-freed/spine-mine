import FDocumentMDP from "@/components/generic/file/documentUpload/FDocumentMDP";

export default class CFADocumentInfoFDocumentMDP extends FDocumentMDP {
    constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
        super({
            taskRoot: taskRoot,
            parent: parent,
            myRefName: "cfDocumentInfoRef",
            disabled: false,
        });

    }

    getMyRef() {
        return this.parent.$refs[this.myRefName];
    }
}