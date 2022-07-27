
import * as Data from '@/../src-gen/data';
import {LoginDetailsGetters} from '@/../src-gen/store/login-store-support';

export class LoginDetailsInit {
  public static initState(): Data.Login.LoginDetails { return new Data.Login.LoginDetails(); }
}

export class LoginDetailsGettersCode implements LoginDetailsGetters {
  public loggedInUser(state: Data.Login.LoginDetails): Data.Login.LoggedInUser {
    return state.loggedInUser;
  }

  public userName(state: Data.Login.LoginDetails): string {
    return state.userName;
  }
  public rolList(state: Data.Login.LoginDetails): string[] {
    return state.roleList;
  }

}

