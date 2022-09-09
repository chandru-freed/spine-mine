
import * as Data from '@/../src-gen/data';
import {ClientFileSearchStoreMutations} from '@/../src-gen/store/clientfile-store-support';

export class ClientFileSearchStoreMutationsCode implements ClientFileSearchStoreMutations   {


   public updateSearchCriteria(state: Data.ClientFile.ClientFileSearchStore, searchCriteria: Data.ClientFile.SearchClientFileInput  ): void  {
     state.searchCriteria = searchCriteria
   }


   public updateSearchResultList(state: Data.ClientFile.ClientFileSearchStore, searchResultList: Data.ClientFile.SearchClientFileOutput[]  ): void  {
     state.searchResultList = searchResultList
   }


}

