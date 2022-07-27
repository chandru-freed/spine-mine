
import * as Data from '@/../src-gen/data';
import {UIGetters} from '@/../src-gen/store/login-store-support';

export class UIInit {
    public static initState(): Data.Login.UI  { return new Data.Login.UI(); }
}

export class UIGettersCode implements UIGetters {

   public drawer(state: Data.Login.UI): boolean {
     return state.drawer;
   }

}

