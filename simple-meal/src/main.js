import Vue from 'vue'
import App from './App.vue'
import { Icon } from 'vant';
import Vant from 'vant';
import 'vant/lib/index.css';
import axios from 'axios';

Vue.config.productionTip = false
Vue.use(Vant);
Vue.use(Icon);
Vue.prototype.$axios= axios;
new Vue({
  render: h => h(App),
}).$mount('#app')
