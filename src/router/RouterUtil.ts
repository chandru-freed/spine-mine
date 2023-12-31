import smileRouter from "@/../src-gen/smile-router";
import store, * as Store from '@/../src-gen/store';

export default class RouterUtil {
  static getRouteDetails(routeList: any, routeName: string) {
    for (let route of routeList) {
      if (route.name == routeName) {
        return route
      }
      else if (Array.isArray(route.children)) {
        let item: any = this.getRouteDetails(route.children, routeName);
        if (item?.name == routeName) {
          return item;
        }
      }
    }
  }

  static flattenRouterList(routeList: any,): any[] {
    return routeList.reduce((acc: any, curr: any) => {
      if (Array.isArray(curr.children)) {
        acc = acc.concat(this.flattenRouterList(curr.children));
      } else {
        acc.push(curr)
      }
      return acc;
    }, []);
  }
  // static setFlattenedRouterList() {
  //   const flatenedSmileRouterList = this.flattenRouterList(smileRouter);
  //   // Muatate - State and variable
  // }
  // static getRouterDetails(routeName: string) {
  //   // Getter to get the flattenList @Store
  //   // id Store is empty call the setFlattenedRouterList
  //   // .find(flatenedSmileRouter => flatenedSmileRouter.name === routeName);
  // }

  static getUserRolesForRoute(routeName: string) {
    const state = store.state as any;
    const flatenedSmileRouterList = state.Spine.RouterStore.flattenedRouterList;
    const routeDetails = flatenedSmileRouterList.find((flatenedSmileRouter: any) => flatenedSmileRouter.name === routeName);
    return routeDetails?.meta?.roles || []
  }

  static isAuthorizedRouter(routerName: string, roleList: any[]): boolean {
    const roleForRouteList = this.getUserRolesForRoute(routerName);
    if (roleForRouteList.length === 0) {
      return true;
    }
    return roleList.some((role: any) => {
      return roleForRouteList.includes(role);
    });
    return true
  }
}