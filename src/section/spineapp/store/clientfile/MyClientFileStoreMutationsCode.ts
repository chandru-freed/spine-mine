
import * as Data from '@/../src-gen/data';
import {MyClientFileStoreMutations} from '@/../src-gen/store/clientfile-store-support';

export class MyClientFileStoreMutationsCode implements MyClientFileStoreMutations   {


   public updateMyClientFileList(state: Data.ClientFile.MyClientFileStore, myClientFileList: Data.ClientFile.MyClientFile[]  ): void  {
     state.myClientFileList = myClientFileList;
   }


}

