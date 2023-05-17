import MyRouter from "./MyRouter";
import moment from "moment";
import FSnackbar from "@/fsnackbar";

export default class Helper  {
    static Router = MyRouter;

    static DATE_FORMAT = "YYYY-MM-DD"

    static downloadFile(url: string, fileName: string) {
        fetch(url, { method: 'get', mode: 'no-cors', referrerPolicy: 'no-referrer' })
        .then(res => res.blob())
        .then(res => {
          const aElement = document.createElement('a');
          aElement.setAttribute('download', fileName);
          const href = URL.createObjectURL(res);
          aElement.href = href;
          aElement.setAttribute('target', '_blank');
          aElement.click();
          URL.revokeObjectURL(href);
        });
    }


    static copyToClipBoard(textToCopy: string) {
      navigator.clipboard.writeText(textToCopy).then(
        function () {
          console.log("Async: Copying to clipboard was successful!");
          FSnackbar.success("Succesfully copied")
        },
        function (err) {
          FSnackbar.error("Error copying")
        }
      );
    }

    static generateRandomUrl(file: File | null) {
      if (file) {
        const dateValue: string = new Date().valueOf().toString();
        return dateValue.slice(-4) + file.name;
      }
      return "";
    }
    
}