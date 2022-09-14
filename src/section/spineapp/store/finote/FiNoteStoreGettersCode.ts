
import * as Data from '@/../src-gen/data';
import {FiNoteStoreGetters} from '@/../src-gen/store/finote-store-support';

export class FiNoteStoreInit {
    public static initState(): Data.FiNote.FiNoteStore  { return new Data.FiNote.FiNoteStore(); }
}

export class FiNoteStoreGettersCode implements FiNoteStoreGetters {


   public fiNoteList(state: Data.FiNote.FiNoteStore): Data.FiNote.FiNote[] {
     return state.fiNoteList
   }

}
