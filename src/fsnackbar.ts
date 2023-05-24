import * as Snackbar from "node-snackbar";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";

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


  static confirm(props: {message?: string;onConfirm: () => void}) {
    this.hide();
    const confirmationInfo = Data.Spine.ConfirmationAlertInfo.fromJson(props);
    confirmationInfo.show = true;
    confirmationInfo.message = confirmationInfo.message || "Are you sure want to proceed?"
    Store.Mutation.Spine.GenericStore.SHOW_CONFIRMATION(confirmationInfo)
  }

  static hide() {
    Store.Mutation.Spine.GenericStore.HIDE_CONFIRMATION();
  }


}
