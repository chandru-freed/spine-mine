
import * as Data from '@/../src-gen/data';
import {DCPClientFileSummaryMutations} from '@/../src-gen/store/dcpclientfile-store-support';

export class DCPClientFileSummaryMutationsCode implements DCPClientFileSummaryMutations   {


   public updateAllAgreementList(state: Data.DCPClientFile.DCPClientFileSummary, allAgreementList: Data.DCPClientFile.FiSSASummaryForDCP[]  ): void  {
     state.allAgreementList = allAgreementList;
   }


}
