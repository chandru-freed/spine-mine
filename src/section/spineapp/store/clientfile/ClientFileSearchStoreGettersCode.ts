
import * as Data from '@/../src-gen/data';
import {ClientFileSearchStoreGetters} from '@/../src-gen/store/clientfile-store-support';

export class ClientFileSearchStoreInit {
    public static initState(): Data.ClientFile.ClientFileSearchStore  { return new Data.ClientFile.ClientFileSearchStore(); }
}

export class ClientFileSearchStoreGettersCode implements ClientFileSearchStoreGetters {


   public searchCriteria(state: Data.ClientFile.ClientFileSearchStore): Data.ClientFile.SearchClientFileInput {
     return state.searchCriteria
   }


   public searchResultList(state: Data.ClientFile.ClientFileSearchStore): Data.ClientFile.SearchClientFileOutput[] {
     return state.searchResultList
   }

}
