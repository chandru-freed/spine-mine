import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import CustomFilters from './custom-filters';
import Validator from './validator';

Vue.config.productionTip = false

CustomFilters.setup();
Validator.setup();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
