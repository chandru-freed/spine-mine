import * as Snackbar from "node-snackbar";

const POSITION: any = 'bottom-center'
export default class FSnackbar {

  public static success(message: string) {
    Snackbar.show({
      text: message,
      pos: POSITION,
    });
  }

  public static warning(message: string) {
    Snackbar.show({
      text: message,
      pos: POSITION,
      backgroundColor: 'warning',
      textColor: 'white'
    });
  }

  public static error(message: string) {
    Snackbar.show({
      text: message,
      pos: POSITION,
      backgroundColor: 'error',
      textColor: 'white'
    });
  }

  public static info(message: string) {
    Snackbar.show({
      text: message,
      pos: POSITION,
      backgroundColor: 'info',
      textColor: 'white'
    });
  }

}
