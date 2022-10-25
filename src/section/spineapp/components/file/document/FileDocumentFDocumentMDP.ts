import FDocumentMDP from "@/components/generic/file/documentUpload/FDocumentMDP";

export default class FileDocumentFDocumentMDP extends FDocumentMDP {
    constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
        super({
            taskRoot: taskRoot,
            parent: parent,
            myRefName: "fileDocumentRef",
            disabled: true,
        });

    }

    getMyRef() {
        return this.parent.getMyRef().$refs[this.myRefName];
    }
}