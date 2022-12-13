import { Vue } from "vue-property-decorator";

declare const ameyo: any;
export default class AmeyoService {
  public static login(userId: string, password: string) {
    ameyo.integration.doLogin(userId, password);
  }
  public static logout() {
    ameyo.integration.doLogout();
  }
  public static dial(phoneNumber: string) {
    ameyo.integration.doDial(phoneNumber);
  }

  static disposeCallByDisposition() {
    ameyo.integration.getDispositionCodes()
  }
}
