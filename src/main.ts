import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './../src-gen/store'
import vuetify from './plugins/vuetify'

import CustomFilters from './custom-filters';
import Validator from './validator';
import * as RemoteApiPoint from './remote-api-point';

Vue.config.productionTip = false
// console.log("main ------------");
// console.log(RemoteApiPoint.GompaApi);
RemoteApiPoint.default.setup();
CustomFilters.setup();
Validator.setup();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
