
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import ErrorResponse from "@/error-response";
import axios from "axios";
import FSnackbar from "@/fsnackbar";

export default class ParsePDF {
    parent: any;
    taskRoot: any;
    updateCreditScoreForm: Data.ClientFile.UpdateCreditInfoInput =
        new Data.ClientFile.UpdateCreditInfoInput();

    uploadedDocument: Data.Spine.FileDocument = new Data.Spine.FileDocument();
    parseCreditReportOutput: any;

    presignedUrl: string;
    constructor({ parent, taskRoot }: { parent: any; taskRoot: any }) {
        this.parent = parent;
        this.taskRoot = taskRoot;
    }


    handleUploadCreditReportPDF() {
        this.parent.showLoader = true;
        this.parent.parseCreditReportInput.clientFileId = this.parent.clientFileId;
        Action.Spine.ParseCreditReport.execute(
            this.parent.parseCreditReportInput,
            (output) => {
                this.parseCreditReportOutput = output;
                this.updateCreditScore(output.experianPersonalInfo.creditScore);
                this.updateClPersonalInfo(output.experianPersonalInfo);
                this.getPresignedURLAndUpload();
               
            },
            (error) => {
                ErrorResponse.handle(error);
                this.parent.showLoader = false;
            }
        );
    }


    addCreditorFromCreditorList() {
        let creditorList: Data.Spine.CreditorFromPdfParse[] = this.parseCreditReportOutput.fiCreditorInfo.creditorList.map((creditor: any) => {
            return Data.Spine.CreditorFromPdfParse.fromJson(creditor);
        })
        
        Action.Spine.AddExperianCreditorListFromPDFParsed.execute2(this.parent.clientFileId, creditorList, output => {
            this.parent.closeAndClearAllForms();
            FSnackbar.success("Successfully added creditors")
        },
        error => {
            ErrorResponse.handle(error);
        })
        // this.parseCreditReportOutput.fiCreditorInfo.creditorList.map((creditor: any, index: number) => {
        //     this.addCreditor(creditor);
        //     if (index === this.parseCreditReportOutput.fiCreditorInfo.creditorList.length - 1) {
        //         this.parent.closeAndClearAllForms();
        //     }
        // });
        // if (this.parseCreditReportOutput.fiCreditorInfo.creditorList.length === 0) {
        //     this.parent.closeAndClearAllForms();
        // }
    }

    // Codes for updation via credit report pdf

    addCreditor(item: any) {
        const input = new Data.Spine.AddCreditorInput();
        input.accountNumber = item.accountNumber;
        input.clientFileId = this.parent.clientFileId;
        input.clientFileNumber = this.parent.clientFileBasicInfo.clientFileNumber;
        input.creditorBalance = item.creditorBalance;
        input.creditorName = item.creditorName;
        input.debtType = item.debtType;
        input.lastDateOfPayment = item.lastDateOfPayment;

        Action.Spine.AddCreditor.execute(
            input,
            (output) => { },
            (error) => { }
        );
    }

    updateClPersonalInfo(experianPersonalInfo: any) {
        const input = Data.Spine.UpdateClPersonalInfoInput.fromJson(
            this.taskRoot.taskFormData.taskOutput.personalInfo
        );
        input.clientId = (
            this.taskRoot as any
        ).clientFileBasicInfo.clientBasicInfo.clientId;

        input.dob = experianPersonalInfo.dob;
        input.gender =
            experianPersonalInfo.gender == "Male"
                ? Data.ClientFile.GENDER.MALE.id
                : Data.ClientFile.GENDER.FEMALE.id;
        input.residentialAddress.addressLine1 = experianPersonalInfo.address;
        input.pan = experianPersonalInfo.pan;
        console.log(input);
        Action.Spine.UpdateClPersonalInfo.execute(input, (output: any) => { });
    }

    updateCreditScore(creditScore: any) {
        this.updateCreditScoreForm.clientFileId = this.parent.clientFileId;
        this.updateCreditScoreForm.creditBureau =
            Data.ClientFile.CreditBureau.EXPERIAN.id;
        this.updateCreditScoreForm.creditScore = creditScore;
        Action.ClientFile.UpdateCreditInfo.execute(
            this.updateCreditScoreForm,
            (output) => {
                
            }
        );
    }



    getPresignedURLAndUpload() {
        const fileName = this.generateRandomUrl(this.parent.parseCreditReportInput.creditReport);
        Action.Spine.GetFiPresignedURLForUpload.execute2(
            this.parent.clientFileBasicInfo.clientFileNumber,
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
                "Content-Type": this.parent.parseCreditReportInput.creditReport?.type,
            },
        };
        const axiosResponse = await axios.put(
            this.presignedUrl,
            this.parent.parseCreditReportInput.creditReport,
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
        input.clientFileId = this.taskRoot.clientFileBasicInfo.clientFileId;
        input.taskId = this.taskRoot.taskId;
        Action.Spine.AttachDocument.execute(input, (output) => {
            
            this.addCreditorFromCreditorList();
        });
    }

    generateRandomUrl(file: File | null) {
        if (file) {
            const dateValue = new Date().valueOf();
            return dateValue + file.name;
        }
        return "";
    }
    // Codes for updation via credit report pdf

}