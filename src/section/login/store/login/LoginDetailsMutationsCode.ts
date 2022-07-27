
import * as Data from '@/../src-gen/data';
import {LoginDetailsMutations} from '@/../src-gen/store/login-store-support';

export class LoginDetailsMutationsCode implements LoginDetailsMutations {
  public mutateRoleList(state: Data.Login.LoginDetails, loginDetails: Data.Login.LoginDetails): void {
    state.roleList = loginDetails.roleList;
  }
  public mutateLoggedInUser(state: Data.Login.LoginDetails, loggedInUser: Data.Login.LoggedInUser): void {
    state.loggedInUser = loggedInUser;
  }

  public setUserName(state: Data.Login.LoginDetails, loginForm: Data.Login.LoginForm): void {
    state.userName = loginForm.userName;
  }
  
  public clear(state: Data.Login.LoginDetails): void {
    state.userName = '';
    state.roleList = [];
    state.loggedInUser = new Data.Login.LoggedInUser();
  }


}


