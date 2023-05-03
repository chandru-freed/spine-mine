
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import ErrorResponse from "@/error-response";
import axios from "axios";
import FSnackbar from "@/fsnackbar";

export default class ParseCRPDF {


    uploadedDocument: Data.Spine.FileDocument = new Data.Spine.FileDocument();

    addDetailsFromParsedCRInput: Data.Spine.AddDetailsFromParsedCreditReportInput =
        new Data.Spine.AddDetailsFromParsedCreditReportInput();
    parseCreditReportOutput: Data.Spine.ParseCreditReportOutput = new Data.Spine.ParseCreditReportOutput();
    presignedUrl: string;
    clientFileId: string;
    clientFileNumber: string;
    parseCreditReportInput: Data.Spine.ParseCreditReportInput = new Data.Spine.ParseCreditReportInput();
    constructor(props: {
        clientFileNumber: string;
        parseCreditReportInput: Data.Spine.ParseCreditReportInput;
        parseCreditReportOutput: Data.Spine.ParseCreditReportOutput;
    }) {
        this.clientFileNumber = props.clientFileNumber;
        this.parseCreditReportInput = props.parseCreditReportInput;
        this.parseCreditReportOutput = props.parseCreditReportOutput;
    }

    addDetailsFromParsedCR() {
        this.clientFileNumber = this.clientFileNumber;
        Action.ClientFile.GetClientFileBasicInfo.execute1(
            this.clientFileNumber,
            (output) => {
                this.parseCreditReportInput = this.parseCreditReportInput;
                this.clientFileId = output.clientFileId;
                this.addDetailsFromParsedCRInput.clientFileId = output.clientFileId;
                this.addDetailsFromParsedCRInput.creditorList =
                    this.parseCreditReportOutput.clCreditorCreditReportInfo.clCreditorCreditReportList.map((item) => {
                        return Data.Spine.CreditorFromPdfParse.fromJson(item.toJson());
                    });
                this.addDetailsFromParsedCRInput.personalInfo =
                    this.parseCreditReportOutput.personalInfo;
                Action.Spine.AddDetailsFromParsedCreditReport.execute(
                    this.addDetailsFromParsedCRInput,
                    (output) => {
                        // this.getPresignedURLAndUpload();
                    }
                );
            });
    }




    getPresignedURLAndUpload() {
        const fileName = this.generateRandomUrl(this.parseCreditReportInput.creditReport);
        Action.Spine.GetFiPresignedURLForUpload.execute2(
            this.clientFileNumber,
            fileName,
            (output) => {
                this.presignedUrl = output.url;
                this.uploadedDocument.documentPath = output.docUploadedPath;
                this.uploadFile();
            }
        );
    }

    async uploadFile() {
        const options: any = {
            headers: {
                "Content-Type": this.parseCreditReportInput.creditReport?.type,
            },
        };
        const axiosResponse = await axios.put(
            this.presignedUrl,
            this.parseCreditReportInput.creditReport,
            options
        );
        this.attachAndSaveUploadedFile();
    }

    attachAndSaveUploadedFile() {
        this.uploadedDocument.documentType = "Credit Report";
        this.uploadedDocument.uploadedOn = new Date();
        const input = Data.Spine.AttachDocumentInput.fromJson(
            this.uploadedDocument
        );
        input.documentDetails = "Credit report from experian";
        input.clientFileId = this.clientFileId;
        Action.Spine.AttachDocument.execute(input, (output) => {
        });
    }

    generateRandomUrl(file: File | undefined) {
        if (file) {
            const dateValue = new Date().valueOf();
            return dateValue + file.name;
        }
        return "";
    }
    // Codes for updation via credit report pdf

}