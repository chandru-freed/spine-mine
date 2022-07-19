import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import SmileRouter from '@/../src-gen/smile-router'
import store, * as Store from '@/../src-gen/store';
import * as Data from '@/../src-gen/data';
import * as Action from '@/../src-gen/action';
import * as RemoteApiPoint from "@/remote-api-point";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [ ...SmileRouter ]

// const routes: Array<RouteConfig> = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//   }
// ]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})


//  for Gompa Integration using Login ADS   -- uncomment this
router.beforeEach((to, from, next) => {
  console.log("ROUTER ------------ beforeEach --------")
  console.log(to.matched)
  if (to.matched.some(record => record.meta.authenticated)) {

    const userLocal = new UserLocal();

    if (userLocal.absent()) {
      console.log("ROUTER ------------ beforeEach -------- user NOT logged in")
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      console.log("ROUTER ------------ beforeEach -------- user logged in")
      Store.Mutation.Login.LoginDetails.SET_USER_NAME(new Data.Login.LoginForm(userLocal.userName!));
      if (!!to && !!to.meta && to.meta.roles) {

        userLocal.matchOnRoleList( backendRoleList => {

         const matched = !!to && !!to.meta  && (to.meta.roles as string[]).some(role => backendRoleList.includes(role));
         if (matched) {
           next();
         } else {
          UserLocal.showError('Forbidden : You are not authorized');
          next({
            path: '/login',
            query: { redirect: to.fullPath }
           });
          // next(false);
         }
        });

      } else {
        next();
      }

    }
  } else {
    next();
  }
  console.log("ROUTER ------------ beforeEach -------- END")
});

class UserLocal  {
  public static showError(message: string) {
    // Snackbar.show({
    //     text: message,
    //     pos: 'bottom-center',
    //     backgroundColor: '#ff5252',
    //     actionTextColor: '#ffffff'
    //   });
  }
  public userName: string|null;


  constructor() {
   this.userName =  window.localStorage.getItem('userName');
  }
  public absent(): boolean {
   return this.userName === null;
  }
  public matchOnRoleList(f: (roleList: string[]) => void): void  {

    const state = store.state as any;

    if (state.Login &&
      state.Login.LoginDetails &&
      state.Login.LoginDetails.roleList > 0) {
      const roleList =  state.Login.LoginDetails.roleList;
      f(roleList);
    } else {
      Action.Login.GetRoleListForUser.execute(new Data.Login.MyAppId(), (output: any) => {
          f(output.roleList);
      }, (err) => console.error(err), RemoteApiPoint.GompaApi);
    }
  }
}

export default router
