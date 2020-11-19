import Vue from 'vue'
import axios from 'axios'
import VueKonva from 'vue-konva'
import Base from './Base.vue'

Vue.use(VueKonva);
Vue.prototype.$axios = axios;


new Vue({
  render: h => h(Base),
}).$mount('#App');