
import * as Data from '@/../src-gen/data';
import {RouterStoreGetters} from '@/../src-gen/store/spine-store-support';

export class RouterStoreInit {
    public static initState(): Data.Spine.RouterStore  { return new Data.Spine.RouterStore(); }
}

export class RouterStoreGettersCode implements RouterStoreGetters {


   public flattenedRouterList(state: Data.Spine.RouterStore): object[] {
     throw new Error('Not implemented YET');
   }

}
