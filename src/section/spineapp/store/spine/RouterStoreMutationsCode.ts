
import * as Data from '@/../src-gen/data';
import {RouterStoreMutations} from '@/../src-gen/store/spine-store-support';
import smileRouter from "@/../src-gen/smile-router";
export class RouterStoreMutationsCode implements RouterStoreMutations   {

   public updateFlattenedRouterList(state: Data.Spine.RouterStore ): void  {
     state.flattenedRouterList = this.flattenRouterList(smileRouter)
   }

   flattenRouterList(routeList: any,): any[] {
    return routeList.reduce((acc: any, curr: any) => {
      if (Array.isArray(curr.children)) {
        acc = acc.concat(this.flattenRouterList(curr.children));
      } else {
        acc.push(curr)
      }
      return acc;
    }, []);
  }

}

