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
      backgroundColor: '#FFB74D',
      actionTextColor: 'white',
      textColor: 'white',
    });
  }

  public static error(message: string) {
    Snackbar.show({
      text: message,
      pos: POSITION,
      backgroundColor: '#EF5350',
      actionTextColor: 'white',
      textColor: 'white'
    });
  }

  public static info(message: string) {
    Snackbar.show({
      text: message,
      pos: POSITION,
      backgroundColor: '#1E88E5',
      actionTextColor: 'white',
      textColor: 'white'
    });
  }

}
