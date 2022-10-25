
import * as Data from '@/../src-gen/data';
import { FiNoteStoreMutations } from '@/../src-gen/store/finote-store-support';

export class FiNoteStoreMutationsCode implements FiNoteStoreMutations {


  public updateFiNoteList(state: Data.FiNote.FiNoteStore, fiNoteList: Data.FiNote.FiNote[]): void {
    state.fiNoteList = fiNoteList;
  }

  public updateFiHighlightedNoteList(state: Data.FiNote.FiNoteStore, fiNoteList: Data.FiNote.FiNote[]): void {
    const fiHighlightedNoteList = fiNoteList.filter(fiNote => fiNote.tagList.findIndex(tag => tag.tagKey === "highlight") !== -1);
    state.fiHighlightedNoteList = fiHighlightedNoteList;
  }


}

