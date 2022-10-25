
import * as Data from '@/../src-gen/data';
import {ClientSearchStoreMutations} from '@/../src-gen/store/client-store-support';

export class ClientSearchStoreMutationsCode implements ClientSearchStoreMutations   {


   public updateSearchCriteria(state: Data.Client.ClientSearchStore, searchCriteria: Data.Client.SearchClientInput  ): void  {
     state.searchCriteria = searchCriteria
   }


   public updateSearchResultList(state: Data.Client.ClientSearchStore, searchResultList: Data.Client.SearchClientOutput[]  ): void  {
     state.searchResultList = searchResultList
   }


}

