import FDocumentMDP from "@/components/generic/file/documentUpload/FDocumentMDP";

export default class CFDocumentInfoFDocumentMDP extends FDocumentMDP {
    constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
        super({
            taskRoot: taskRoot,
            parent: parent,
            myRefName: "cfDocumentInfoRef",
            disabled: false,
        });

    }

    getMyRef() {
        console.log(this.parent.$refs);
        return this.parent.$refs[this.myRefName];
    }
}