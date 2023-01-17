import smileRouter from "@/../src-gen/smile-router";

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
      
      static getUserRolesForRoute(routeName: string) {
        const routeDetails = this.getRouteDetails(smileRouter, routeName)
        return routeDetails?.meta?.roles || []
      }
}