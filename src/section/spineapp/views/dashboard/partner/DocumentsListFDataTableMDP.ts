import FCellBooleanMDP from "@/components/generic/table/cell/FCellBooleanMDP";
import FCellLinkMDP from "@/components/generic/table/cell/FCellLinkMDP";
import FDataTableMDP from "@/components/generic/table/FDataTableMDP";
import * as Action from "@/../src-gen/action";
import FCellDateTimeMDP from "@/components/generic/table/cell/FCellDateTimeMDP";
import FExpansionFDataTableMDP from "@/components/generic/table/expansion/FExpansionFDataTableMDP";

export default class DocumentsListFDataTableMDP extends FExpansionFDataTableMDP {
  constructor(props: { dataSelectorKey: string }) {
    super({
      myRefName: "documentsListFDataTableRef",
      dataSelectorKey: props.dataSelectorKey,
      hideDefaultFooter: true,
      outlined: false,
      enableSearch: false,
    });

    this.addColumn({
      label: "Document Type",
      dataSelectorKey: "documentType.name",
    }).addColumn({
      label: "Document Url",
      dataSelectorKey: "documentPath",
      columnCellMDP: new FCellLinkMDP({
        onClick: (item) => this.openUploadedFile(item.documentPath),
      }),
    }).addColumn({
      label: "Uploaded On",
      dataSelectorKey: "uploadedOn",
      columnCellMDP: new FCellDateTimeMDP()
    });
  }


  openUploadedFile(docPath: string) {
    Action.Spine.GetUploadedUrl.execute1(docPath, (output) => {
      window.open(output.uploadedUrl);
    });
  }
}
