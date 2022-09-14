import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './../src-gen/store'
import vuetify from './plugins/vuetify'

import 'node-snackbar/dist/snackbar.min.css';
import 'node-snackbar/dist/snackbar.min.js';

import CustomFilters from './custom-filters';
import Validator from './validator';
import * as RemoteApiPoint from './remote-api-point';
import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);


Vue.config.productionTip = false
RemoteApiPoint.default.setup();
CustomFilters.setup();
Validator.setup();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
