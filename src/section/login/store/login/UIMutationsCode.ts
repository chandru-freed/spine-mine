
import * as Data from '@/../src-gen/data';
import {UIMutations} from '@/../src-gen/store/login-store-support';

export class UIMutationsCode implements UIMutations   {


   public toggleDrawer(state: Data.Login.UI  ): void  {
    state.drawer = !state.drawer;
  }


}

