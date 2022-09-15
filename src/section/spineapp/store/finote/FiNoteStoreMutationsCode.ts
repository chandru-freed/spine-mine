
import * as Data from '@/../src-gen/data';
import {FiNoteStoreMutations} from '@/../src-gen/store/finote-store-support';

export class FiNoteStoreMutationsCode implements FiNoteStoreMutations   {


   public updateFiNoteList(state: Data.FiNote.FiNoteStore, fiNoteList: Data.FiNote.FiNote[]  ): void  {
     state.fiNoteList = fiNoteList;
   }


}

