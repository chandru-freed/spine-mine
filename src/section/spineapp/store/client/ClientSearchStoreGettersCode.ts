
import * as Data from '@/../src-gen/data';
import {ClientSearchStoreGetters} from '@/../src-gen/store/client-store-support';

export class ClientSearchStoreInit {
    public static initState(): Data.Client.ClientSearchStore  { return new Data.Client.ClientSearchStore(); }
}

export class ClientSearchStoreGettersCode implements ClientSearchStoreGetters {


   public searchCriteria(state: Data.Client.ClientSearchStore): Data.Client.SearchClientInput {
     return state.searchCriteria
   }


   public searchResultList(state: Data.Client.ClientSearchStore): Data.Client.SearchClientOutput[] {
     return state.searchResultList
   }

}
